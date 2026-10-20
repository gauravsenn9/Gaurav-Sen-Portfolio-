import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
// These cases cover actual deployment risks: repository subpaths, canonicals, and preview indexing.
const cases=[
 {name:'root domain',env:{SITE_URL:'https://portfolio.test',BASE_PATH:''},base:'',index:true},
 {name:'GitHub project subpath',env:{SITE_URL:'https://person.github.io/portfolio',BASE_PATH:'/portfolio'},base:'/portfolio',index:true},
 {name:'preview deployment',env:{SITE_URL:'https://portfolio.test',BASE_PATH:'',NO_INDEX:'1'},base:'',index:false}
];
for(const c of cases)test(c.name,()=>{
 const dir=`.test-build-${c.name.replaceAll(' ','-')}`;const env={...process.env,NO_INDEX:'0',VERCEL_ENV:'',...c.env,OUTPUT_DIR:dir};
 try{
  execFileSync(process.execPath,['scripts/build.mjs'],{cwd:root,env,stdio:'pipe'});
  execFileSync(process.execPath,['scripts/check.mjs'],{cwd:root,env,stdio:'pipe'});
  const h=fs.readFileSync(path.join(root,dir,'projects/fireflies-commitloop/index.html'),'utf8');
  assert.ok(h.includes(`href="${c.env.SITE_URL}/projects/fireflies-commitloop/"`));
  assert.ok(h.includes(`href="${c.base}/assets/style.css"`));
  assert.ok(h.includes(`content="${c.index?'index,follow':'noindex,follow'}"`));
  const robots=fs.readFileSync(path.join(root,dir,'robots.txt'),'utf8');assert.equal(robots.includes('Disallow: /'),!c.index);
 } finally{fs.rmSync(path.join(root,dir),{recursive:true,force:true});}
});
