import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
if(!fs.existsSync(path.join(root,'index.html')))throw new Error('Run npm run build first.');
const info=JSON.parse(fs.readFileSync(path.join(root,'build-info.json'),'utf8'));
const base=info.basePath||'';
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.json':'application/json','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8'};
const server=http.createServer((req,res)=>{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'});res.end();return;}
  let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end('Bad request');return;}
  let status=200;
  if(base && name!==base && !name.startsWith(base+'/'))status=404;
  if(base && name===base){res.writeHead(301,{Location:base+'/'});res.end();return;}
  if(base && name.startsWith(base+'/'))name=name.slice(base.length);
  let file=path.resolve(root,'.'+name);
  if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);res.end();return;}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory()){
    if(!name.endsWith('/')){res.writeHead(301,{Location:base+name+'/'});res.end();return;}
    file=path.join(file,'index.html');
  }
  if(status===404||!fs.existsSync(file)||!fs.statSync(file).isFile()){status=404;file=path.join(root,'404.html');}
  res.writeHead(status,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});
  if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);
});
server.listen(Number(process.env.PORT)||3000,process.env.HOST||'127.0.0.1',()=>{console.log(`Portfolio ready at http://${process.env.HOST||'127.0.0.1'}:${server.address().port}${base}/`);});
