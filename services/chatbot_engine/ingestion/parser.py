"""
Document parser for HTML, Text, and PDF.
Strips boilerplate, navigation elements, hidden HTML comments, and injection vectors.
"""

import re
from typing import Dict, Any, List
from bs4 import BeautifulSoup, Comment


class DocumentParser:
    @staticmethod
    def clean_html(html_content: str, source_url: str = "") -> Dict[str, Any]:
        """
        Parses HTML, removes scripts/styles/nav/footers/hidden comments,
        and extracts clean title and content.
        """
        soup = BeautifulSoup(html_content, "html.parser")

        # 1. Strip prompt injection vectors: remove all HTML comments
        for comment in soup.find_all(text=lambda text: isinstance(text, Comment)):
            comment.extract()

        # 2. Extract page title
        title = soup.title.string.strip() if soup.title and soup.title.string else ""

        # 3. Remove non-content elements
        for tag in soup(["script", "style", "nav", "footer", "header", "noscript", "svg", "iframe"]):
            tag.decompose()

        # 4. Extract text from primary body or main
        main_content = soup.find("main") or soup.find("article") or soup.body or soup
        
        # Replace block tags with newline
        for block in main_content.find_all(["p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "li", "tr"]):
            block.append("\n")

        raw_text = main_content.get_text()
        
        # Normalize whitespace
        cleaned_text = re.sub(r"[ \t]+", " ", raw_text)
        cleaned_text = re.sub(r"\n\s*\n+", "\n\n", cleaned_text).strip()

        return {
            "title": title or source_url or "Untitled Page",
            "content": cleaned_text,
            "url": source_url
        }

    @staticmethod
    def parse_pdf(file_bytes: bytes, file_name: str = "") -> List[Dict[str, Any]]:
        """
        Parses PDF bytes page-by-page.
        """
        import io
        from pypdf import PdfReader

        reader = PdfReader(io.BytesIO(file_bytes))
        pages_data = []

        for page_idx, page in enumerate(reader.pages):
            text_content = page.extract_text() or ""
            cleaned = re.sub(r"[ \t]+", " ", text_content).strip()
            if cleaned:
                pages_data.append({
                    "title": f"{file_name} (Page {page_idx + 1})",
                    "content": cleaned,
                    "page_number": page_idx + 1,
                    "url": file_name
                })

        return pages_data
