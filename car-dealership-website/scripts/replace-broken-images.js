const fs = require('fs');
const path = require('path');
const carsPath = path.join(__dirname,'..','frontend','data','cars.json');
const mapping = {
  "https://images.unsplash.com/photo-1583121274602-3e2820bc6988?auto=format&fit=crop&q=80&w=800": "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1567808291548-fc3ee04dbac0?auto=format&fit=crop&q=80&w=800": "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1590362891175-379451245c40?auto=format&fit=crop&q=80&w=800": "https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1583267746897-2cf415888172?auto=format&fit=crop&q=80&w=800": "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1532581133595-3004980ad54e?auto=format&fit=crop&q=80&w=800": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1630659052733-407000e3650a?auto=format&fit=crop&q=80&w=800": "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1621348248421-4d3756d112d8?auto=format&fit=crop&q=80&w=800": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1627443105658-94458385750d?auto=format&fit=crop&q=80&w=800": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1631835339300-3486df819385?auto=format&fit=crop&q=80&w=800": "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1616438652309-8bc426b3e6e8?auto=format&fit=crop&q=80&w=800": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1615632126229-bc3d3328e342?auto=format&fit=crop&q=80&w=800": "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1606148301667-46d47bf1455a?auto=format&fit=crop&q=80&w=800": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1617469767053-d3b503a0b12c?auto=format&fit=crop&q=80&w=800": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1542362567-b05260199732?auto=format&fit=crop&q=80&w=800": "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1562620644-66bd327e53f7?auto=format&fit=crop&q=80&w=800": "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1539108190285-bc5b37877c8e?auto=format&fit=crop&q=80&w=800": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1561580119-7d90193c7233?auto=format&fit=crop&q=80&w=800": "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1631214524020-5e1f74dd7c42?auto=format&fit=crop&q=80&w=800": "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1511914288736-3e486c41d5f0?q=80&w=1200&auto=format&fit=crop": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1511914288736-3e486c41d5f0?q=80&w=800&auto=format&fit=crop": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
};

let data = fs.readFileSync(carsPath,'utf8');
let replaced = 0;
Object.keys(mapping).forEach(oldUrl => {
  const newUrl = mapping[oldUrl];
  const re = new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'g');
  const count = (data.match(re) || []).length;
  if(count){
    data = data.replace(re, newUrl);
    replaced += count;
    console.log(`Replaced ${count} occurrence(s) of ${oldUrl}`);
  }
});
fs.writeFileSync(carsPath, data, 'utf8');
console.log(`Done. Total replacements: ${replaced}`);
