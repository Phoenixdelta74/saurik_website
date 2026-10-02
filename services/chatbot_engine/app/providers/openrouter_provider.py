"""
OpenRouter Provider implementation (for Gemini Flash / DeepSeek / Claude via OpenRouter).
"""

from typing import List, Dict, Optional
from openai import AsyncOpenAI
from .base import BaseLLMProvider, ChatResponse, EmbeddingResponse
from ..config import settings


class OpenRouterProvider(BaseLLMProvider):
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.OPENROUTER_API_KEY
        self.client = AsyncOpenAI(
            api_key=self.api_key,
            base_url="https://openrouter.ai/api/v1",
            default_headers={
                "HTTP-Referer": "https://www.saurikit.in",
                "X-Title": "Saurik AI Chatbot"
            }
        )

    async def chat(
        self,
        system_prompt: str,
        messages: List[Dict[str, str]],
        model: Optional[str] = None
    ) -> ChatResponse:
        model_name = model or "google/gemini-2.5-flash"
        formatted_msgs = [{"role": "system", "content": system_prompt}] + messages
        
        response = await self.client.chat.completions.create(
            model=model_name,
            messages=formatted_msgs,
            temperature=0.2,
            max_tokens=1000
        )
        
        choice = response.choices[0]
        usage = response.usage
        
        return ChatResponse(
            content=choice.message.content or "",
            tokens_in=usage.prompt_tokens if usage else 0,
            tokens_out=usage.completion_tokens if usage else 0,
            model=model_name
        )

    async def embed(
        self,
        text: str,
        model: Optional[str] = None
    ) -> EmbeddingResponse:
        # Fall back to OpenAI or standard embedding endpoint
        model_name = model or "openai/text-embedding-3-small"
        cleaned_text = text.replace("\n", " ").strip() or "empty document"
        
        response = await self.client.embeddings.create(
            input=[cleaned_text],
            model=model_name
        )
        
        embedding_data = response.data[0].embedding
        usage = response.usage
        
        return EmbeddingResponse(
            embedding=embedding_data,
            tokens=usage.prompt_tokens if usage else 0,
            model=model_name
        )
