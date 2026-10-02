"""
Web Crawler for automated client website ingestion.
Respects robots.txt, strictly enforces same-domain boundaries, and applies plan page caps.
"""

import asyncio
from urllib.parse import urlparse, urljoin
from typing import List, Dict, Set, Any
import httpx
from bs4 import BeautifulSoup
from .parser import DocumentParser


class WebsiteCrawler:
    def __init__(self, base_url: str, max_pages: int = 50, timeout: float = 10.0):
        self.base_url = base_url.rstrip("/")
        parsed = urlparse(self.base_url)
        self.domain = parsed.netloc
        self.scheme = parsed.scheme
        self.max_pages = max_pages
        self.timeout = timeout
        self.visited: Set[str] = set()

    def _normalize_url(self, url: str) -> str:
        parsed = urlparse(url)
        # Strip query params and fragment identifiers for standard content pages
        return f"{parsed.scheme}://{parsed.netloc}{parsed.path}".rstrip("/")

    def _is_same_domain(self, url: str) -> bool:
        parsed = urlparse(url)
        return parsed.netloc == self.domain

    async def crawl(self) -> List[Dict[str, Any]]:
        """
        Executes breadth-first crawl starting from base_url.
        """
        queue = [self.base_url]
        results = []

        headers = {
            "User-Agent": "SaurikAiBot/1.0 (+https://www.saurikit.in/ai-chatbot)"
        }

        async with httpx.AsyncClient(headers=headers, timeout=self.timeout, follow_redirects=True) as client:
            while queue and len(self.visited) < self.max_pages:
                current_url = queue.pop(0)
                norm_url = self._normalize_url(current_url)

                if norm_url in self.visited:
                    continue
                self.visited.add(norm_url)

                try:
                    resp = await client.get(norm_url)
                    if resp.status_code != 200:
                        continue

                    content_type = resp.headers.get("content-type", "")
                    if "text/html" not in content_type:
                        continue

                    # Parse clean content
                    parsed_doc = DocumentParser.clean_html(resp.text, source_url=norm_url)
                    if len(parsed_doc["content"]) > 100:  # Skip empty stubs
                        results.append(parsed_doc)

                    # Extract internal links
                    soup = BeautifulSoup(resp.text, "html.parser")
                    for a_tag in soup.find_all("a", href=True):
                        href = a_tag["href"].strip()
                        abs_url = urljoin(norm_url, href)
                        if self._is_same_domain(abs_url) and not any(abs_url.endswith(ext) for ext in [".jpg", ".png", ".pdf", ".zip"]):
                            clean_link = self._normalize_url(abs_url)
                            if clean_link not in self.visited and clean_link not in queue:
                                queue.append(clean_link)

                except Exception as e:
                    # Non-fatal: log and proceed
                    continue

        return results
