"""
Database connection, session management, and PostgreSQL Row-Level Security (RLS) enforcement.
"""

from typing import AsyncGenerator
from contextlib import asynccontextmanager
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy import text
from .config import settings

_engine = None
_async_session_factory = None


def get_engine():
    global _engine
    if _engine is None:
        _engine = create_async_engine(
            settings.DATABASE_URL,
            echo=settings.DEBUG,
            pool_size=10,
            max_overflow=20,
            pool_pre_ping=True
        )
    return _engine


def get_session_factory():
    global _async_session_factory
    if _async_session_factory is None:
        _async_session_factory = async_sessionmaker(
            bind=get_engine(),
            class_=AsyncSession,
            expire_on_commit=False,
            autocommit=False,
            autoflush=False
        )
    return _async_session_factory


class SessionFactoryProxy:
    def __call__(self, *args, **kwargs):
        factory = get_session_factory()
        return factory(*args, **kwargs)


async_session_factory = SessionFactoryProxy()


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Base DB session dependency without tenant context (for admin/auth)."""
    async with get_session_factory()() as session:
        try:
            yield session
        finally:
            await session.close()


@asynccontextmanager
async def tenant_session(tenant_id: str) -> AsyncGenerator[AsyncSession, None]:
    """
    Context manager that scopes all database operations to a specific tenant
    by setting PostgreSQL's 'app.tenant_id' session variable.
    PostgreSQL Row-Level Security policies immediately enforce tenant isolation.
    """
    async with get_session_factory()() as session:
        try:
            # Set local tenant_id for the current transaction
            await session.execute(
                text("SET LOCAL app.tenant_id = :tenant_id"),
                {"tenant_id": str(tenant_id)}
            )
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
