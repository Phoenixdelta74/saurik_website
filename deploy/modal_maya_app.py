"""
Modal Serverless GPU Deployment for Maya 2 Native TTS
Model: maya-research/maya2-native (2.5B parameters)
Hardware: NVIDIA L4 (24GB VRAM) / A10G
Protocol: HTTP POST with Bearer Token Authorization
"""

import os
import modal

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

# Shared auth secret - replace or override via environment variable if desired
DEFAULT_AUTH_TOKEN = "saurik_maya_secret_2026"

@app.cls(
    image=maya_image,
    gpu="L4",                      # NVIDIA L4 (24GB VRAM)
    volumes={"/root/.cache/huggingface": model_volume},
    scaledown_window=600,          # Keeps container warm for 10 minutes after request
    secrets=[modal.Secret.from_dict({"MAYA_AUTH_TOKEN": DEFAULT_AUTH_TOKEN})]
)
class MayaTTSService:
    @modal.enter()
    def load_model(self):
        """Loads Maya 2 Native model into GPU memory once on container start"""
        import torch
        from maya3 import Maya3TTS

        print("--> [Modal Worker] Booting Maya 2 Native into GPU VRAM...")
        self.tts = Maya3TTS.from_pretrained("maya-research/maya2-native", max_seats=1)
        print("--> [Modal Worker] Maya 2 Native successfully loaded and warm.")

    @modal.fastapi_endpoint(method="POST")
    def speech(self, request: dict):
        """
        Receives { input: string, voice?: string, lang?: string }
        Returns: audio/wav stream at 24kHz
        """
        import io
        import re
        import numpy as np
        import soundfile as sf
        from fastapi import HTTPException
        from fastapi.responses import Response

        text = request.get("input", "").strip()
        requested_voice = request.get("voice", "Ahana")
        requested_lang = request.get("lang", "")

        if not text:
            raise HTTPException(status_code=400, detail="Missing required field: 'input'")

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

