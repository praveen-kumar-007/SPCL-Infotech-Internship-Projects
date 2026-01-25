const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

function checkUrl(url){
  return new Promise((resolve)=>{
    try{
      const lib = url.startsWith('https') ? https : http;
      const req = lib.request(url, {method:'HEAD', timeout:8000}, (res) => {
        resolve({url, ok: res.statusCode >=200 && res.statusCode < 400, status: res.statusCode, ct: res.headers['content-type']});
      });
      req.on('error', (e)=> resolve({url, ok:false, error: e.message}));
      req.on('timeout', ()=>{ req.destroy(); resolve({url, ok:false, error:'timeout'}); });
      req.end();
    }catch(e){ resolve({url, ok:false, error: e.message}); }
  });
}

async function main(){
  const carsPath = path.join(__dirname,'..','frontend','data','cars.json');
  let urls = [];
  try{
    const cars = JSON.parse(fs.readFileSync(carsPath,'utf8'));
    cars.forEach(c=>{
      if(c.image) urls.push(c.image);
      if(Array.isArray(c.images)) urls.push(...c.images);
    });
  }catch(e){ console.error('Failed to read cars.json', e.message); }

  // add known hero/contact images
  urls.push('https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=7a7f3a0f4b6d3f2fb1df1b8c3d3f7f5a');
  // replaced the old broken internship/contact images with a working Unsplash image
  urls.push('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200');
  urls.push('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800');

  urls = Array.from(new Set(urls)).filter(Boolean);
  console.log(`Checking ${urls.length} URLs...`);
  const results = [];
  for(const u of urls){
    process.stdout.write('.');
    // small modification: some unsplash links require removing query param 's=' or add &ixlib param; we'll just try as-is
    try{ const r = await checkUrl(u); results.push(r);}catch(e){ results.push({url:u, ok:false, error:e.message}); }
  }
  console.log('\nResults:');
  const bad = results.filter(r => !r.ok);
  results.forEach(r => console.log(`${r.ok ? 'OK  ' : 'BAD '} ${r.status || ''} ${r.url} ${r.error? ' - '+r.error : ''}`));
  if(bad.length){
    console.log(`\nFound ${bad.length} broken images`);
    // write report
    fs.writeFileSync(path.join(__dirname,'broken-images.json'), JSON.stringify(bad,null,2));
    console.log('Wrote scripts/broken-images.json');
    process.exitCode = 2;
  }else{
    console.log('\nAll images appear reachable.');
  }
}

main();
