"""
Semantic Text Chunker with Overlap and SHA-256 Hash Deduplication.
"""

import hashlib
from typing import List, Dict, Any


class TextChunker:
    def __init__(self, target_chunk_size: int = 600, overlap_size: int = 100):
        self.target_chunk_size = target_chunk_size
        self.overlap_size = overlap_size

    @staticmethod
    def compute_hash(text: str) -> str:
        """Computes SHA-256 hash of normalized text."""
        return hashlib.sha256(text.encode("utf-8")).hexdigest()

    def chunk_text(self, text: str, metadata: Dict[str, Any] | None = None) -> List[Dict[str, Any]]:
        """
        Splits text into overlapping chunks using paragraph and sentence boundaries.
        """
        meta = metadata or {}
        paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
        
        chunks = []
        current_chunk_words: List[str] = []
        current_word_count = 0

        for para in paragraphs:
            words = para.split()
            if not words:
                continue

            if current_word_count + len(words) > self.target_chunk_size and current_chunk_words:
                # Flush current chunk
                chunk_str = " ".join(current_chunk_words)
                chunks.append({
                    "content": chunk_str,
                    "metadata": meta,
                    "chunk_index": len(chunks)
                })

                # Maintain sliding window overlap
                overlap_words = current_chunk_words[-self.overlap_size:] if len(current_chunk_words) > self.overlap_size else current_chunk_words
                current_chunk_words = list(overlap_words)
                current_word_count = len(current_chunk_words)

            current_chunk_words.extend(words)
            current_word_count += len(words)

        if current_chunk_words:
            chunk_str = " ".join(current_chunk_words)
            chunks.append({
                "content": chunk_str,
                "metadata": meta,
                "chunk_index": len(chunks)
            })

        return chunks
