import os
import re
import urllib.request
import urllib.parse
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, urljoin

BASE_URL = 'https://html.aqlova.com/landor-prev/landor/'
START_URL = urljoin(BASE_URL, 'index.html')
OUT_DIR = Path('/Users/istiaktashrif/Projects/BBL/landor-site')
OUT_DIR.mkdir(parents=True, exist_ok=True)

HEADERS = {'User-Agent': 'Mozilla/5.0'}

visited = set()
queue = [START_URL]
downloaded = {}

class AssetParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.assets = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'link' and attrs.get('href'):
            href = attrs['href']
            rel = (attrs.get('rel') or '').lower()
            if 'stylesheet' in rel or 'icon' in rel or 'preload' in rel or 'manifest' in rel or 'apple-touch-icon' in rel:
                self.assets.append(href)
        elif tag in {'script', 'img', 'source', 'video', 'audio', 'iframe'}:
            for key in ('src', 'poster'):
                if attrs.get(key):
                    self.assets.append(attrs[key])
        elif tag == 'a' and attrs.get('href'):
            self.assets.append(attrs['href'])

class CSSParser:
    URL_RE = re.compile(r'url\(\s*(["\']?)(.*?)\1\s*\)', re.I)
    IMPORT_RE = re.compile(r'@import\s+(?:url\()?\s*(["\']?)(.*?)\1\s*\)?', re.I)

    def parse(self, text):
        urls = []
        for pattern in (self.URL_RE, self.IMPORT_RE):
            for match in pattern.finditer(text):
                urls.append(match.group(2))
        return urls


def is_same_host(url):
    try:
        parsed = urlparse(url)
        return parsed.scheme in {'http', 'https'} and parsed.netloc == 'html.aqlova.com'
    except Exception:
        return False


def build_local_path(url):
    parsed = urlparse(url)
    path = parsed.path
    if not path or path == '/':
        path = '/index.html'
    if path.endswith('/'):
        path += 'index.html'
    elif '.' not in Path(path).name:
        path += '/index.html'
    return OUT_DIR / path.lstrip('/')


def download_bytes(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=20) as response:
        return response.read(), response.headers.get_content_type()


def rel_path(from_file, to_file):
    try:
        rel = os.path.relpath(to_file, start=from_file.parent)
        return rel.replace(os.sep, '/')
    except Exception:
        return os.path.basename(to_file).replace(os.sep, '/')


def rewrite_html_content(text, page_url, page_path):
    parser = AssetParser()
    parser.feed(text)
    for asset in parser.assets:
        if not asset or asset.startswith(('data:', 'mailto:', 'tel:', 'javascript:')):
            continue
        asset_url = urljoin(page_url, asset)
        if not is_same_host(asset_url):
            continue
        local_path = downloaded.get(asset_url)
        if not local_path:
            continue
        rel = rel_path(page_path, local_path)
        text = text.replace(asset, rel)
    return text


def rewrite_css_content(text, page_url, page_path):
    css_parser = CSSParser()
    for asset in css_parser.parse(text):
        if not asset or asset.startswith(('data:', 'mailto:', 'tel:', 'javascript:')):
            continue
        asset_url = urljoin(page_url, asset)
        if not is_same_host(asset_url):
            continue
        local_path = downloaded.get(asset_url)
        if not local_path:
            continue
        rel = rel_path(page_path, local_path)
        text = text.replace(asset, rel)
    return text


def save_bytes(url, data, content_type):
    target = build_local_path(url)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(data)
    downloaded[url] = target
    return target


while queue:
    url = queue.pop()
    if url in visited:
        continue
    visited.add(url)
    try:
        data, content_type = download_bytes(url)
    except Exception as exc:
        print(f'FAILED {url}: {exc}')
        continue

    target = save_bytes(url, data, content_type)
    print(f'DOWNLOADED {url} -> {target.relative_to(OUT_DIR)}')

    if 'html' in content_type:
        text = data.decode('utf-8', errors='ignore')
        text = rewrite_html_content(text, url, target)
        target.write_text(text, encoding='utf-8')
        parser = AssetParser()
        parser.feed(text)
        for asset in parser.assets:
            if not asset or asset.startswith(('data:', 'mailto:', 'tel:', 'javascript:')):
                continue
            asset_url = urljoin(url, asset)
            if is_same_host(asset_url):
                queue.append(asset_url)
    elif 'css' in content_type:
        text = data.decode('utf-8', errors='ignore')
        text = rewrite_css_content(text, url, target)
        target.write_text(text, encoding='utf-8')
        for asset in CSSParser().parse(text):
            if not asset or asset.startswith(('data:', 'mailto:', 'tel:', 'javascript:')):
                continue
            asset_url = urljoin(url, asset)
            if is_same_host(asset_url):
                queue.append(asset_url)
    else:
        for asset in re.findall(r'https?://[^\s"\'>)]+', data.decode('utf-8', errors='ignore')):
            if is_same_host(asset):
                queue.append(asset)

print('\nDownload complete. Files:')
for path in sorted(OUT_DIR.rglob('*')):
    if path.is_file():
        print(path.relative_to(OUT_DIR))
