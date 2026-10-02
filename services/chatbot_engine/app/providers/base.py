"""
Base interface and dataclasses for LLM and Embedding Providers.
"""

from abc import ABC, abstractmethod
from pydantic import BaseModel
from typing import List, Dict, Any, Optional


class ChatResponse(BaseModel):
    content: str
    tokens_in: int
    tokens_out: int
    model: str


class EmbeddingResponse(BaseModel):
    embedding: List[float]
    tokens: int
    model: str


class BaseLLMProvider(ABC):
    @abstractmethod
    async def chat(
        self,
        system_prompt: str,
        messages: List[Dict[str, str]],
        model: Optional[str] = None
    ) -> ChatResponse:
        """Execute chat completion against LLM."""
        pass

    @abstractmethod
    async def embed(
        self,
        text: str,
        model: Optional[str] = None
    ) -> EmbeddingResponse:
        """Generate vector embedding for text."""
        pass
