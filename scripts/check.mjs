import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,process.env.OUTPUT_DIR||'dist');
const config=JSON.parse(fs.readFileSync(path.join(dist,'build-info.json')));
const projects=JSON.parse(fs.readFileSync(path.join(root,'src/projects.json')));
const files=[];function walk(dir){for(const f of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,f.name);if(f.isDirectory())walk(p);else files.push(p);}}walk(dist);
const pages=files.filter(p=>p.endsWith('.html'));const titles=new Set(),descriptions=new Set();let linkCount=0;
assert.equal(projects.length,14);assert.equal(new Set(projects.map(p=>p.slug)).size,14);assert.equal(pages.length,17);
for(const file of pages){
 const html=fs.readFileSync(file,'utf8');const label=path.relative(dist,file);
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${label}: exactly one H1`);
 const title=html.match(/<title>(.*?)<\/title>/)?.[1];assert.ok(title,`${label}: title`);assert.ok(!titles.has(title),`${label}: unique title`);titles.add(title);
 const desc=html.match(/<meta name="description" content="([^"]+)"/)?.[1];assert.ok(desc,`${label}: description`);assert.ok(!descriptions.has(desc),`${label}: unique description`);descriptions.add(desc);
 assert.ok(html.includes('lang="en"'));assert.ok(html.includes('name="viewport"'));
 for(const script of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))JSON.parse(script[1]);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,`${label}: duplicate ID`);
 for(const img of html.matchAll(/<img\b[^>]*>/g)){assert.ok((/alt="[^"]+"/.test(img[0]) || (/alt=""/.test(img[0]) && /aria-hidden="true"/.test(img[0]))),`${label}: image alt`);assert.ok(/width="\d+"/.test(img[0])&&/height="\d+"/.test(img[0]),`${label}: image dimensions`);}
 for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
   const raw=m[1].replaceAll('&amp;','&');linkCount++;
   if(/^(https?:|mailto:|data:)/.test(raw))continue;
   const [pathname,hash]=raw.split('#');let target=file;
   if(pathname){assert.ok(pathname.startsWith(config.basePath+'/'),`${label}: base path ${raw}`);let relative=pathname.slice(config.basePath.length);target=path.join(dist,relative);if(relative.endsWith('/'))target=path.join(target,'index.html');assert.ok(fs.existsSync(target),`${label}: missing ${raw}`);}
   if(hash){const targetHtml=fs.readFileSync(target,'utf8');assert.ok(targetHtml.includes(`id="${hash}"`),`${label}: missing fragment ${raw}`);}
 }
 if(config.canonicalOrigin && !file.endsWith('404.html'))assert.ok(html.includes('rel="canonical"'),`${label}: canonical`);
 assert.ok(!/YOUR_NAME|lorem ipsum|TODO|example\.com/i.test(html),`${label}: placeholder content`);
}
const total=projects.reduce((n,p)=>n+p.resources.length,0);assert.equal(total,64);
for(const p of projects){assert.ok(p.publicResources.some(r=>r.primary));for(const r of p.resources){const u=new URL(r.url);assert.ok(['drive.google.com','docs.google.com'].includes(u.hostname));}assert.equal(p.sections.length,8);}
if(config.canonicalOrigin){const map=fs.readFileSync(path.join(dist,'sitemap.xml'),'utf8');assert.equal((map.match(/<loc>/g)||[]).length,16);assert.ok(!map.includes('/404'));}
console.log(`PASS: ${pages.length} HTML files, ${linkCount} references, 14 complete case studies, 64 source mappings, unique SEO metadata and valid structured data.`);
