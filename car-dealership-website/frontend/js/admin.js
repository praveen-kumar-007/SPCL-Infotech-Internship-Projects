// admin.js — simple admin dashboard to view inquiries & applications
const ADMIN = {
  tokenKey: 'admin_token',
  userKey: 'admin_user',
  apiKey: 'admin_api_base',
  get token(){ return localStorage.getItem(this.tokenKey) || ''; },
  set token(v){ if(v) localStorage.setItem(this.tokenKey, v); else localStorage.removeItem(this.tokenKey); },
  get user(){ return localStorage.getItem(this.userKey) || ''; },
  set user(v){ if(v) localStorage.setItem(this.userKey, v); else localStorage.removeItem(this.userKey); },
  get apiBase(){ return localStorage.getItem(this.apiKey) || (location.hostname === 'localhost' ? 'http://localhost:5000' : '') },
  set apiBase(v){ if(v) localStorage.setItem(this.apiKey, v); else localStorage.removeItem(this.apiKey); }
};

function setStatus(msg, cls){ const s = document.getElementById('adminStatus'); if(!s) return; s.textContent = msg; s.className = cls; }

function authHeader(){ const t = ADMIN.token; if(!t) return {}; return { 'x-admin-token': t, 'Authorization': 'Bearer '+t }; }

function fullUrl(path){
  // allow absolute URLs to pass through
  if (/^https?:\/\//.test(path)) return path;
  // normalize base and remove any trailing /admin or /admin/... to avoid double-prefixing
  let base = (ADMIN.apiBase || 'http://localhost:5000').replace(/\/+$/,'');
  if(/\/admin(\/.*)?$/.test(base) && path.startsWith('/admin')){
    base = base.replace(/\/admin(\/.*)?$/, '');
  }
  return `${base}${path.startsWith('/')?path:('/'+path)}`;
} 

async function fetchJson(url, opts={}){
  const h = opts.headers || {};
  opts.headers = Object.assign({}, h, authHeader(), { 'Content-Type':'application/json' });
  const full = fullUrl(url);
  const res = await fetch(full, opts);
  // always read body as text first to avoid json parse errors on empty responses
  const text = await res.text();
  let data = null;
  try{ data = text ? JSON.parse(text) : null; }catch(e){ /* not JSON */ }
  if(!res.ok){ const msg = (data && data.message) ? data.message : (text || res.statusText || `${res.status}`); throw new Error(msg); }
  return data;
}

function renderTable(items, type){
  if(!items || !items.length) return `<div class="card"><div class="card-body"><p>No ${type} found</p></div></div>`;

  const headers = type === 'inquiry' ? ['Name','Email','Car / Meta','Time','Status','Actions'] : ['Name','Email','GitHub / Demo','Time','Status','Actions'];

  const rows = items.map(it=>{
    const meta = it.carTitle ? `Car: ${it.carTitle}` : (it.github ? `GitHub: ${it.github}${it.demo?` • Demo: ${it.demo}`:''}` : '');
    const badgeClass = it.status === 'new' ? 'badge-new' : it.status === 'in-review' ? 'badge-in-review' : 'badge-closed';
    return `
      <table class="admin-table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead>
      <tbody>
        <tr>
          <td><strong>${it.name}</strong></td>
          <td>${it.email}</td>
          <td>${meta}</td>
          <td>${new Date(it.time).toLocaleString()}</td>
          <td><span class="badge-status ${badgeClass}">${it.status}</span></td>
          <td>
            <select data-id="${it.id}" class="statusSelect">
              <option value="new" ${it.status==='new'?'selected':''}>New</option>
              <option value="in-review" ${it.status==='in-review'?'selected':''}>In Review</option>
              <option value="closed" ${it.status==='closed'?'selected':''}>Closed</option>
            </select>
            <button class="btn outline btnDetails" data-id="${it.id}" data-type="${type}">Details</button>
          </td>
        </tr>
      </tbody>
      </table>
    `;
  }).join('');
  return rows;
}

async function loadDataset(type, page=1, perPage=20){
  const results = document.getElementById('adminResults');
  const messages = document.getElementById('adminMessages');
  try{
    messages.innerHTML = '<div class="loading-inline">Loading…</div>';
    // fetch full data (small scale); for large data, backend should support pagination
    const res = await fetchJson(type === 'inquiries' ? '/admin/inquiries' : '/admin/applications');
    const data = res.data || [];
    // apply date filters
    const from = document.getElementById('filterFrom').value;
    const to = document.getElementById('filterTo').value;
    const filtered = data.filter(item => {
      if(from && new Date(item.time) < new Date(from)) return false;
      if(to && new Date(item.time) > new Date(to + 'T23:59:59')) return false;
      return true;
    });

    const total = filtered.length;
    const start = (page-1)*perPage;
    const pageData = filtered.slice(start, start+perPage);

    let html = `<div><strong>${type === 'inquiries' ? 'Inquiries' : 'Applications'}</strong> — ${total} total</div>`;
    html += renderTable(pageData, type === 'inquiries' ? 'inquiry' : 'application');

    // pagination
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    html += `<div class="admin-pagination" data-type="${type}" data-perpage="${perPage}"><button class="prev">Prev</button><div class="page-num">${page} / ${totalPages}</div><button class="next">Next</button></div>`;

    results.innerHTML = html;
    messages.innerHTML = '';
    document.getElementById('lastSync').textContent = new Date().toLocaleString();
  }catch(err){ results.innerHTML = `<p class="error-text">Failed to load ${type}: ${err.message}</p>`; messages.innerHTML = '';} 
}

async function loadInquiries(){ return loadDataset('inquiries'); }
async function loadApplications(){ return loadDataset('applications'); }

// listen to actions
function initAdminEvents(){
  // login / logout handlers
  document.getElementById('btnLogin').addEventListener('click', async ()=>{
    const user = document.getElementById('adminUser').value.trim();
    const pass = document.getElementById('adminPass').value;
    if(!user || !pass) return alert('Enter admin ID and password');
    try{
      const resp = await fetch(fullUrl('/admin/login'), { method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ user, pass }) });
      const text = await resp.text();
      let j = null; try{ j = text ? JSON.parse(text) : null; }catch(e){}
      if(!resp.ok){ const msg = (j && j.message) ? j.message : (text || resp.statusText); throw new Error(msg); }
      if(!j || !j.token) throw new Error('Invalid server response');
      ADMIN.token = j.token; ADMIN.user = j.user;
      document.getElementById('adminUserInfo').textContent = `Logged in as ${j.user}`;
      document.getElementById('adminPass').value = '';
      alert('Login successful');
      loadDataset(document.getElementById('datasetSelect').value, 1);
    }catch(err){ alert('Login failed: '+err.message); }
  });

  document.getElementById('btnLogout').addEventListener('click', async ()=>{
    try{ await fetchJson('/admin/logout', { method: 'POST' }); }catch(e){}
    ADMIN.token = ''; ADMIN.user = '';
    document.getElementById('adminUserInfo').textContent = 'Not logged in';
    alert('Logged out');
  });

  document.getElementById('btnWhoami').addEventListener('click', async ()=>{
    try{
      const res = await fetchJson('/admin/me');
      alert(`Logged in as ${res.user}`);
    }catch(err){ alert('Not logged in: '+err.message); }
  });

  // API base handlers
  const apiInput = document.getElementById('apiBase');
  apiInput.value = ADMIN.apiBase || '';
  document.getElementById('saveApi').addEventListener('click', ()=>{
    let v = apiInput.value.trim();
    if(!v) return alert('Enter the API base URL, e.g. http://localhost:5000');
    if(/[&\s]/.test(v)) return alert('Invalid API base — please enter a host like http://localhost:5000');
    if(!/^https?:\/\//.test(v)) v = 'http://'+v;
    // strip trailing slashes and any /admin path the user accidentally included
    v = v.replace(/\/+$/,'').replace(/\/admin(\/.*)?$/,'');
    ADMIN.apiBase = v;
    apiInput.value = v;
    alert('API base saved (normalized)');
  });
  document.getElementById('testApi').addEventListener('click', async ()=>{ const v = apiInput.value.trim() || ADMIN.apiBase; if(!v) return alert('Set API base first'); try{ const ping = await fetch(fullUrl('/')); if(!ping.ok) throw new Error(ping.statusText); document.getElementById('apiStatus').textContent = 'OK — backend reachable'; document.getElementById('apiStatus').className='success-box'; }catch(err){ document.getElementById('apiStatus').textContent = 'Failed to reach backend: '+err.message; document.getElementById('apiStatus').className='error-box'; } });

  const dataset = document.getElementById('datasetSelect');
  document.getElementById('btnFetch').addEventListener('click', ()=> loadDataset(dataset.value, 1));
  document.getElementById('btnRefresh').addEventListener('click', ()=> loadDataset(dataset.value, 1));
  document.getElementById('btnExport').addEventListener('click', ()=> exportCsv(dataset.value));

  // pagination delegate (prev/next)
  document.getElementById('adminResults').addEventListener('click', (e)=>{
    const btn = e.target.closest('.prev, .next');
    if(!btn) return;
    const container = btn.closest('.admin-pagination');
    if(!container) return;
    const type = container.dataset.type;
    const perPage = parseInt(container.dataset.perpage||20,10);
    const pageNumEl = container.querySelector('.page-num');
    const [pageStr, totalStr] = pageNumEl.textContent.split('/').map(s=>s.trim());
    let page = parseInt(pageStr,10)||1; const total = parseInt(totalStr,10)||1;
    if(btn.classList.contains('prev')) page = Math.max(1, page-1); else page = Math.min(total, page+1);
    loadDataset(type, page, perPage);
  });

  document.getElementById('adminSearch').addEventListener('keydown', async (e)=>{
    if(e.key !== 'Enter') return;
    const q = e.target.value.trim(); if(!q) return;
    try{
      document.getElementById('adminMessages').innerHTML = '<div class="loading-inline">Searching…</div>';
      const res = await fetchJson(`/admin/search?q=${encodeURIComponent(q)}`);
      let html = '';
      html += `<h3>Search Results — Inquiries (${res.results.inquiries.length})</h3>` + renderTable(res.results.inquiries, 'inquiry');
      html += `<h3 style="margin-top:12px">Applications (${res.results.applications.length})</h3>` + renderTable(res.results.applications, 'application');
      document.getElementById('adminResults').innerHTML = html;
      document.getElementById('adminMessages').innerHTML = '';
      document.getElementById('lastSync').textContent = new Date().toLocaleString();
    }catch(err){ document.getElementById('adminResults').innerHTML = `<p class="error-text">Search failed: ${err.message}</p>`; document.getElementById('adminMessages').innerHTML = ''; }
  });

  // delegate clicks in results
  document.getElementById('adminResults').addEventListener('click', async (e)=>{
    const btn = e.target.closest('.btnDetails');
    if(btn){
      const id = btn.dataset.id; const type = btn.dataset.type;
      try{
        let src = type==='inquiry' ? '/admin/inquiries' : '/admin/applications';
        const res = await fetchJson(src);
        const list = res.data || [];
        const entry = list.find(x => String(x.id) === String(id));
        if(!entry) return alert('Not found');
        openAdminModal(entry, type);
      }catch(err){ alert('Failed to load details: '+err.message); }
    }
  });

  // handle status change (delegate)
  document.getElementById('adminResults').addEventListener('change', async (e)=>{
    if(e.target && e.target.classList && e.target.classList.contains('statusSelect')){
      const id = e.target.dataset.id; const status = e.target.value;
      const root = e.target.closest('table');
      const type = root && root.querySelector('.btnDetails') ? root.querySelector('.btnDetails').dataset.type : 'inquiry';
      const endpoint = type === 'inquiry' ? `/admin/inquiries/${id}/status` : `/admin/applications/${id}/status`;
      try{
        await fetchJson(endpoint, { method: 'PUT', body: JSON.stringify({ status }) });
        alert('Status updated');
      }catch(err){ alert('Status update failed: '+err.message); }
    }
  });
}

// export helper
async function exportCsv(type){
  const endpoint = type === 'inquiries' ? '/admin/inquiries' : '/admin/applications';
  try{
    document.getElementById('adminMessages').innerHTML = '<div class="loading-inline">Exporting…</div>';
    const res = await fetchJson(endpoint);
    const data = res.data || [];
    if(!data.length){ alert('No data to export'); document.getElementById('adminMessages').innerHTML = ''; return; }
    const keys = type === 'inquiries' ? ['id','name','email','carTitle','message','status','time'] : ['id','name','email','github','demo','message','status','time'];
    const lines = [keys.join(',')];
    data.forEach(row=>{
      const vals = keys.map(k=>{
        let v = row[k] === undefined || row[k] === null ? '' : String(row[k]);
        v = v.replace(/"/g,'""');
        if(/,|"|\n/.test(v)) v = '"'+v+'"';
        return v;
      });
      lines.push(vals.join(','));
    });
    const csv = lines.join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${type}-${new Date().toISOString().slice(0,10)}.csv`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    document.getElementById('adminMessages').innerHTML = `<div class="success-box">Exported ${data.length} rows</div>`;
  }catch(err){ alert('Export failed: '+err.message); document.getElementById('adminMessages').innerHTML = ''; }
}

// modal helpers
function openAdminModal(entry, type){
  const body = document.getElementById('adminModalBody');
  body.innerHTML = `
    <h3>${entry.name} — ${entry.email}</h3>
    <p class="muted">${new Date(entry.time).toLocaleString()}</p>
    <p><strong>Type:</strong> ${type}</p>
    <pre style="white-space:pre-wrap;background:#f7f7f7;padding:12px;border-radius:8px;border:1px solid #eee">${entry.message}</pre>
    <div style="margin-top:10px;display:flex;gap:8px"><button id="markRead" class="btn">Mark In-Review</button><button id="markClosed" class="btn outline">Close</button></div>
  `;
  const modal = document.getElementById('adminModal'); modal.classList.add('active'); modal.setAttribute('aria-hidden','false');

  document.getElementById('markRead').addEventListener('click', async ()=>{ try{ const ep = type==='inquiry' ? `/admin/inquiries/${entry.id}/status` : `/admin/applications/${entry.id}/status`; await fetchJson(ep, { method:'PUT', body: JSON.stringify({ status:'in-review' }) }); alert('Marked in-review'); modal.classList.remove('active'); }catch(err){alert('Failed: '+err.message);}});
  document.getElementById('markClosed').addEventListener('click', async ()=>{ try{ const ep = type==='inquiry' ? `/admin/inquiries/${entry.id}/status` : `/admin/applications/${entry.id}/status`; await fetchJson(ep, { method:'PUT', body: JSON.stringify({ status:'closed' }) }); alert('Closed'); modal.classList.remove('active'); }catch(err){alert('Failed: '+err.message);}});
}

// modal close
(function(){
  const modal = document.getElementById('adminModal'); if(!modal) return; modal.querySelector('.modal-close').addEventListener('click', ()=>{ modal.classList.remove('active'); modal.setAttribute('aria-hidden','true'); });
  modal.addEventListener('click', (e)=>{ if(e.target===modal) { modal.classList.remove('active'); modal.setAttribute('aria-hidden','true'); } });
})();

// startup
(function(){
  document.addEventListener('DOMContentLoaded', ()=>{
    const t = ADMIN.token;
    if(t){
      document.getElementById('adminUserInfo').textContent = 'Checking login…';
      fetchJson('/admin/me').then(res=>{
        const u = res.user || ADMIN.user || 'admin';
        ADMIN.user = u;
        document.getElementById('adminUserInfo').textContent = `Logged in as ${u}`;
      }).catch(err=>{
        ADMIN.token = ''; ADMIN.user = ''; document.getElementById('adminUserInfo').textContent = 'Not logged in';
      });
    }else{
      if(ADMIN.user){ document.getElementById('adminUser').value = ADMIN.user; document.getElementById('adminUserInfo').textContent = `Logged in as ${ADMIN.user}`; }
    }
    // If config injected at build/runtime, use that as default API base when none saved by admin
    if(!ADMIN.apiBase && window.__APP_ENV && window.__APP_ENV.API_BASE){
      ADMIN.apiBase = String(window.__APP_ENV.API_BASE).replace(/\/+$/,'').replace(/\/admin(\/.*)?$/,'');
    }

    // normalize any previously saved API base (strip trailing slashes and any /admin path)
    let api = ADMIN.apiBase || '';
    if(api){
      const normalized = api.replace(/\/+$/,'').replace(/\/admin(\/.*)?$/,'');
      if(normalized !== api){ ADMIN.apiBase = normalized; api = normalized; }
      document.getElementById('apiBase').value = api;
    }
    initAdminEvents();
    // default load
    document.getElementById('datasetSelect').value = 'inquiries';
    // if API and token present, auto-load
    if(ADMIN.apiBase && ADMIN.token){ loadDataset('inquiries'); }
  });
})();