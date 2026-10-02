import os
try:
    from pydantic_settings import BaseSettings
except ImportError:
    from pydantic import BaseModel
    class BaseSettings(BaseModel):
        def __init__(self, **data):
            super().__init__(**data)
            for field_name in self.model_fields.keys():
                env_val = os.getenv(field_name)
                if env_val is not None:
                    setattr(self, field_name, env_val)

from pydantic import Field


class Settings(BaseSettings):
    # App
    APP_NAME: str = "Saurik AI Chatbot Engine"
    API_V1_STR: str = "/v1"
    DEBUG: bool = False

    # Database
    DATABASE_URL: str = Field(
        default="postgresql+asyncpg://postgres:postgres@localhost:5432/saurik_chatbot",
        description="Async PostgreSQL connection string with pgvector support"
    )

    # LLM Providers & Keys
    OPENAI_API_KEY: str | None = Field(default=None)
    OPENROUTER_API_KEY: str | None = Field(default=None)
    ANTHROPIC_API_KEY: str | None = Field(default=None)
    
    DEFAULT_LLM_PROVIDER: str = "openai"  # openai, openrouter, anthropic
    DEFAULT_CHAT_MODEL: str = "gpt-4o-mini"
    DEFAULT_EMBEDDING_MODEL: str = "text-embedding-3-small"
    EMBEDDING_DIMENSION: int = 1536

    # Security & RAG
    SIMILARITY_THRESHOLD_DEFAULT: float = 0.65
    MAX_RETRIEVAL_CHUNKS: int = 4
    MAX_CRAWL_PAGES_DEFAULT: int = 50
    SESSION_TOKEN_SECRET: str = Field(
        default="dev-insecure-secret-key-change-in-production-2026",
        description="HMAC secret for visitor session tokens"
    )

    # Lead notifications
    ALERT_EMAIL: str = "contact@saurikit.in"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
