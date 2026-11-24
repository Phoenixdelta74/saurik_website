"""
Modal Serverless GPU Deployment for Maya 2 Native TTS
Model: maya-research/maya2-native (2.5B parameters)
Hardware: NVIDIA L4 (24GB VRAM) / A10G
Protocol: HTTP POST with Bearer Token Authorization
"""

import os
import modal
from fastapi import Header

# 1. Define Modal App & Persistent Volume for weights
app = modal.App("saurik-maya2-tts")
model_volume = modal.Volume.from_name("maya2-weights", create_if_missing=True)

# 2. Container image specification with CUDA 12.8 and Maya dependencies
maya_image = (
    modal.Image.debian_slim(python_version="3.11")
    .apt_install("git", "ffmpeg", "libsndfile1")
    .pip_install(
        "torch",
        "torchaudio",
        extra_index_url="https://download.pytorch.org/whl/cu128"
    )
    .pip_install(
        "huggingface_hub",
        "fastapi[standard]",
        "soundfile",
        "scipy",
        "maya3[server] @ git+https://github.com/MayaResearch/maya2-native"
    )
)

# 3. Secret configuration: create via `modal secret create maya-auth-secret MAYA_AUTH_TOKEN=<your-token>`
# or supply MAYA_AUTH_TOKEN in the deployment environment.
secret_kwargs = (
    {"secrets": [modal.Secret.from_dict({"MAYA_AUTH_TOKEN": os.environ["MAYA_AUTH_TOKEN"]})]}
    if "MAYA_AUTH_TOKEN" in os.environ
    else {"secrets": [modal.Secret.from_name("maya-auth-secret")]}
)

@app.function(
    image=maya_image,
    volumes={"/root/.cache/huggingface": model_volume},
    timeout=600
)
def preload_weights():
    """One-time utility to download and commit Maya 2 Native weights onto the persistent volume."""
    from huggingface_hub import snapshot_download
    print("--> [Preload] Downloading maya-research/maya2-native weights to persistent volume...")
    snapshot_download(repo_id="maya-research/maya2-native")
    model_volume.commit()
    print("--> [Preload] Successfully committed weights to volume.")

@app.cls(
    image=maya_image,
    gpu="L4",                      # NVIDIA L4 (24GB VRAM)
    volumes={"/root/.cache/huggingface": model_volume},
    scaledown_window=600,          # Keeps container warm for 10 minutes after request
    enable_memory_snapshot=True,   # CRIU RAM/VRAM Snapshotting for sub-3s cold starts
    experimental_options={"enable_gpu_snapshot": True},
    **secret_kwargs
)
class MayaTTSService:
    @modal.enter(snap=True)
    def load_model(self):
        """Loads Maya 2 Native model into GPU memory once; captured in memory snapshot"""
        import torch
        from maya3 import Maya3TTS

        print("--> [Modal Worker] Booting Maya 2 Native into GPU VRAM...")
        self.tts = Maya3TTS.from_pretrained("maya-research/maya2-native", max_seats=1)
        print("--> [Modal Worker] Maya 2 Native successfully loaded and snapshotted.")

    @modal.fastapi_endpoint(method="POST")
    def speech(self, request: dict, authorization: str = Header(default=None)):
        """
        Receives { input: string, voice?: string, lang?: string, health?: bool }
        Requires valid Bearer token matching MAYA_AUTH_TOKEN secret.
        Returns: audio/wav stream at 24kHz or JSON readiness on health check.
        """
        import io
        import re
        from fastapi import HTTPException
        from fastapi.responses import Response

        # Enforce Bearer token authorization
        expected_token = os.environ.get("MAYA_AUTH_TOKEN")
        if not expected_token:
            raise HTTPException(
                status_code=500,
                detail="Server configuration error: MAYA_AUTH_TOKEN secret not configured on container."
            )

        auth_header = authorization
        token = None
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header[7:].strip()

        if not token or token != expected_token:
            raise HTTPException(
                status_code=401,
                detail="Unauthorized: Invalid or missing Bearer token."
            )

        text = request.get("input", "").strip()
        is_health_check = request.get("health", False) or text in ["ping", "health"]

        # Fast lightweight health check without GPU inference
        if is_health_check:
            return Response(
                content=b'{"status":"ready","model":"maya2-native","sampling_rate":24000}',
                media_type="application/json",
                headers={
                    "Cache-Control": "no-store",
                    "X-Model-Source": "maya2-native",
                    "X-Status": "warm",
                }
            )

        if not text:
            raise HTTPException(status_code=400, detail="Missing required field: 'input'")

        import numpy as np
        import soundfile as sf

        requested_voice = request.get("voice", "Ahana")
        requested_lang = request.get("lang", "")

        # Detect language code if not provided
        if not requested_lang:
            if re.search(r"[\u0B80-\u0BFF]", text):
                lang = "ta"  # Tamil
            elif re.search(r"[\u0C00-\u0C7F]", text):
                lang = "te"  # Telugu
            elif re.search(r"[\u0A80-\u0AFF]", text):
                lang = "gu"  # Gujarati
            elif re.search(r"[ৰৱ]", text):
                lang = "as"  # Assamese
            elif re.search(r"[\u0980-\u09FF]", text):
                lang = "bn"  # Bengali
            elif re.search(r"[\u0900-\u097F]", text):
                lang = "hi"  # Hindi
            else:
                lang = "en"  # English default
        else:
            lang = requested_lang.lower().split("-")[0]

        # Use Ahana as the high-naturalness default voice, or requested voice
        voice = requested_voice if requested_voice and requested_voice.lower() not in ["default", "nova", "alloy"] else "Ahana"

        try:
            # Maya 2 Native speech generation
            audio = self.tts.generate(text, lang=lang, voice=voice, normalize=True)

            if isinstance(audio, (list, tuple)):
                audio = np.array(audio, dtype=np.float32)
            elif hasattr(audio, "cpu"):
                audio = audio.cpu().numpy()

            # Export to in-memory 24kHz WAV buffer
            buffer = io.BytesIO()
            sf.write(buffer, audio, 24000, format="WAV")
            buffer.seek(0)

            return Response(
                content=buffer.read(),
                media_type="audio/wav",
                headers={
                    "Cache-Control": "public, max-age=86400",
                    "X-Model-Source": "maya2-native",
                    "X-Detected-Lang": lang,
                    "X-Voice-Used": voice,
                    "X-Sampling-Rate": "24000",
                }
            )
        except Exception as e:
            print(f"[Error in synthesis]: {e}")
            raise HTTPException(status_code=500, detail=f"Synthesis error: {str(e)}")
