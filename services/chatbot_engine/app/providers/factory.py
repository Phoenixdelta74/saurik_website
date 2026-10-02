"""
Provider Factory to obtain the active LLM/Embedding provider.
"""

from .base import BaseLLMProvider
from .openai_provider import OpenAIProvider
from .openrouter_provider import OpenRouterProvider
from ..config import settings


def get_llm_provider(provider_name: str | None = None) -> BaseLLMProvider:
    choice = (provider_name or settings.DEFAULT_LLM_PROVIDER).lower()
    
    if choice == "openrouter" and settings.OPENROUTER_API_KEY:
        return OpenRouterProvider()
    elif choice == "openai" and settings.OPENAI_API_KEY:
        return OpenAIProvider()
    
    # Graceful fallback to whichever key exists
    if settings.OPENAI_API_KEY:
        return OpenAIProvider()
    if settings.OPENROUTER_API_KEY:
        return OpenRouterProvider()
        
    # Return OpenAI as default (will raise error upon invocation if key is missing)
    return OpenAIProvider()
