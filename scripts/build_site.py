from pathlib import Path
import re, shutil
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'_site'
PAGES=['index.html','about.html','services.html','gallery.html','reviews.html','contact.html']
HEADER=(ROOT/'components'/'navigation.html').read_text(encoding='utf-8')
FOOTER=(ROOT/'components'/'footer.html').read_text(encoding='utf-8')
if OUT.exists():shutil.rmtree(OUT)
OUT.mkdir(parents=True)
for name in PAGES:
 html=(ROOT/name).read_text(encoding='utf-8')
 start=html.find('<div class="topbar"')
 end=html.find('<main',start)
 if start<0 or end<0:raise ValueError(f'{name}: shared header markers not found')
 header=re.sub(r'\saria-current="page"','',HEADER)
 page=Path(name).stem
 header=re.sub(r'(<a\b[^>]*\bdata-nav-key="'+re.escape(page)+r'"[^>]*)(>)',r'\1 aria-current="page"\2',header)
 html=html[:start]+header+'\n'+html[end:]
 start=html.find('<footer class="footer"')
 if start<0: raise ValueError(f'{name}: footer marker not found')
 end=html.find('</footer>',start)+len('</footer>')
 if end<len('</footer>'):raise ValueError(f'{name}: footer closing tag missing')
 html=html[:start]+FOOTER+html[end:]
 (OUT/name).write_text(html,encoding='utf-8')
 print('Built',name)
shutil.copytree(ROOT/'assets',OUT/'assets')
(OUT/'.nojekyll').touch()
