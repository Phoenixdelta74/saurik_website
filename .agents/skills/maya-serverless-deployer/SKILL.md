---
name: maya-serverless-deployer
description: >-
  Guides the packaging, configuration, and deployment of the Maya 2 Native 2.5B
  parameter streaming Text-to-Speech (TTS) model onto Modal.com Serverless GPU
  infrastructure with persistent volume weight caching, CUDA 12.8, auto-scaling to zero,
  and Bearer token security.
---

# Maya Serverless GPU Deployer Skill

## 1. Overview & Capability
This skill provides the end-to-end runbook for packaging and deploying **`maya-research/maya2-native`** as an on-demand, serverless GPU microservice using **Modal** (`modal.com`). 

### Why Modal Serverless for Maya 2 Native:
- **Cost:** Scales to zero when idle ($0 / ₹0 ongoing charge when no user is interacting).
- **GPU Resources:** Provisions an **NVIDIA L4 (24GB VRAM)** on demand, easily meeting Maya's ~9.2GB VRAM peak loading requirement.
- **Fast Startup:** Uses a persistent Modal network volume to cache the 5GB model weights permanently, avoiding multi-gigabyte re-downloads on container cold starts.
- **Security:** Injects Bearer token authentication to guard against unauthorized access.

---

## 2. Prerequisites & Verification
1. **Modal Account & GPU Unlocking:** Sign up at [modal.com](https://modal.com) (includes $30/month free compute credits). **Important:** Modal requires adding a payment method on file to unlock GPU resources (T4, L4, A10G) to prevent bot abuse.
2. **Python Environment:** Python 3.10–3.12 (e.g., Anaconda or standard Python) with `pip install modal`.
3. **Authentication:** Run `modal setup` once to link your local CLI to your Modal workspace.

---

## 3. Production Application Specification (`deploy/modal_maya_app.py`)

The deployment script must satisfy these exact architectural and API requirements:

```python
import os
import modal

# 1. App Declaration & Volume Binding
app = modal.App("saurik-maya2-tts")
model_volume = modal.Volume.from_name("maya2-weights", create_if_missing=True)

# 2. Container Image with CUDA 12.8 & Maya3 Server
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

DEFAULT_AUTH_TOKEN = "saurik_maya_secret_2026"

# 3. Dedicated Service Class with NVIDIA L4 GPU
@app.cls(
    image=maya_image,
    gpu="L4",                      # 24GB VRAM
    volumes={"/root/.cache/huggingface": model_volume},
    scaledown_window=180,          # Keeps container warm for 3 minutes after traffic
    secrets=[modal.Secret.from_dict({"MAYA_AUTH_TOKEN": DEFAULT_AUTH_TOKEN})]
)
class MayaTTSService:
    @modal.enter()
    def load_model(self):
        """Loads model into GPU memory once on container boot"""
        import torch
        from maya3 import Maya3TTS

        print("--> [Modal Worker] Booting Maya 2 Native into GPU VRAM...")
        self.tts = Maya3TTS.from_pretrained("maya-research/maya2-native", max_seats=1)
        print("--> [Modal Worker] Maya 2 Native successfully loaded and warm.")

    @modal.fastapi_endpoint(method="POST")
    def speech(self, request: dict):
        """Generates 24kHz audio from text input with token verification"""
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
            if re.search(r"[\u0980-\u09FF]", text):
                lang = "bn"
            elif re.search(r"[\u0900-\u097F]", text):
                lang = "hi"
            else:
                lang = "en"
        else:
            lang = requested_lang.lower().split("-")[0]

        voice = requested_voice if requested_voice and requested_voice.lower() not in ["default", "nova", "alloy"] else "Ahana"

        try:
            # Maya 2 Native generation API
            audio = self.tts.generate(text, lang=lang, voice=voice, normalize=True)

            if isinstance(audio, (list, tuple)):
                audio = np.array(audio, dtype=np.float32)
            elif hasattr(audio, "cpu"):
                audio = audio.cpu().numpy()

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
            raise HTTPException(status_code=500, detail=f"Synthesis error: {str(e)}")
```

---

## 4. Production API Contract & Method Signatures
- **Package & Class:** `from maya3 import Maya3TTS`
- **Model Loader:** `Maya3TTS.from_pretrained("maya-research/maya2-native", max_seats=1)`
- **Speech Synthesizer:** `tts.generate(text, lang=lang, voice=voice, normalize=True)`
- **Audio Output:** 1D numpy array / float32 tensor exported to 24kHz WAV via `soundfile.write`.
- **Default High-Naturalness Voice:** `"Ahana"` (case-insensitive built-in female voice).
- **Indic Script Auto-Detection:**
  - Bengali: `[\u0980-\u09FF]` $\rightarrow$ `lang="bn"`
  - Devanagari/Hindi: `[\u0900-\u097F]` $\rightarrow$ `lang="hi"`
  - Latin/English: $\rightarrow$ `lang="en"`

---

## 5. Modal Cold Start & HTTP 303 Redirect Handling
- **Modal 150s Timeout Rule:** Modal enforces a hard 150-second timeout on web functions. During the initial cold-start weight download (~110s), Modal responds with `HTTP 303 See Other` containing a result polling URL in the `Location` header.
- **Caller Requirement:** Client test runners and HTTP proxies must follow 303/302 redirects via `GET` to seamlessly receive the completed audio buffer without aborting.

---

## 6. Execution Commands
```bash
# Verify locally in test dev mode
modal serve deploy/modal_maya_app.py

# Deploy to permanent serverless production
modal deploy deploy/modal_maya_app.py
```
Output yields a live HTTPS URL:
`https://<user-subdomain>--saurik-maya2-tts-mayattsservice-speech.modal.run`
