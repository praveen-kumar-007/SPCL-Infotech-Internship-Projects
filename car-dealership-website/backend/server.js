require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require('crypto');

const app = express();
// log incoming requests for easier debugging
app.use((req, res, next) => { console.log(`${new Date().toISOString()} ${req.method} ${req.path} from ${req.ip}`); next(); });
// enable CORS; allow setting a specific origin via CORS_ORIGIN env var (defaults to allow all in dev)
const CORS_ORIGIN = process.env.CORS_ORIGIN || true;
app.use(cors({ origin: CORS_ORIGIN, methods: ['GET','POST','PUT','DELETE','OPTIONS'], allowedHeaders: ['Content-Type','Authorization','x-admin-token'] }));
app.options('/admin/login', cors());
app.use(express.json());

const INQUIRIES_FILE = process.env.INQUIRIES_FILE ? path.resolve(process.env.INQUIRIES_FILE) : path.join(__dirname, "inquiries.json");
const APPLICATIONS_FILE = process.env.APPLICATIONS_FILE ? path.resolve(process.env.APPLICATIONS_FILE) : path.join(__dirname, "applications.json");

// better error visibility
process.on('uncaughtException', err => { console.error('UNCAUGHT_EXCEPTION', err); });
process.on('unhandledRejection', err => { console.error('UNHANDLED_REJECTION', err); });

// admin credentials - set ADMIN_USER/ADMIN_PASS env vars in production
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'changeme';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'changeme'; // legacy support
const sessions = new Map();

function adminAuth(req, res, next){
  // look for token in x-admin-token header, Authorization: Bearer <token> or ?token
  const authHeader = req.get('authorization') || '';
  const bearer = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const token = req.get('x-admin-token') || bearer || req.query.token;
  if (!token) {
    console.warn(`Admin auth failed - missing token - path=${req.path} ip=${req.ip}`);
    return res.status(403).json({ success: false, message: 'Forbidden - missing token' });
  }
  // legacy static token support
  if (token === ADMIN_TOKEN) { req.adminUser = { user: 'admin' }; return next(); }
  // session token
  if (sessions.has(token)) { req.adminUser = { user: sessions.get(token).user }; return next(); }
  console.warn(`Admin auth failed - invalid token - path=${req.path} ip=${req.ip} token=${token}`);
  return res.status(403).json({ success: false, message: 'Forbidden - invalid token' });
} 

function readJson(file){
  try{
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
  }catch(e){ console.error('Read json error', e); return []; }
}
function writeJson(file, data){
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

app.get('/', (req, res) => res.send('Car Dealership Backend Running'));

// contact/inquiry - supports optional car info
app.post('/contact', (req, res) => {
  const { name, email, message, carId, carTitle } = req.body;
  if(!name || !email || !message) return res.status(400).json({ success: false, message: 'name/email/message required' });

  const entry = { id: Date.now(), type: 'inquiry', name, email, message, carId: carId || null, carTitle: carTitle || null, status: 'new', time: new Date().toISOString() };

  try{
    const data = readJson(INQUIRIES_FILE);
    data.push(entry);
    writeJson(INQUIRIES_FILE, data);
    console.log('Saved inquiry', entry);
    res.json({ success: true, message: 'Inquiry saved' });
  }catch(err){ console.error(err); res.status(500).json({ success:false, message:'Server error' }); }
});

// internship application endpoint
app.post('/apply', (req, res) => {
  const { name, email, github, demo, message } = req.body;
  if(!name || !email || !github || !message) return res.status(400).json({ success:false, message: 'name/email/github/message required' });

  const appEntry = { id: Date.now(), name, email, github, demo: demo || null, message, status: 'new', time: new Date().toISOString() };
  try{
    const data = readJson(APPLICATIONS_FILE);
    data.push(appEntry);
    writeJson(APPLICATIONS_FILE, data);
    console.log('Saved application', appEntry);
    res.json({ success:true, message:'Application received' });
  }catch(err){ console.error(err); res.status(500).json({ success:false, message:'Server error' }); }
});

// Auth endpoints (login / logout / me)
app.post('/admin/login', (req, res) => {
  try{
    console.log(`Admin login attempt - method=${req.method} path=${req.path} ip=${req.ip}`);
    const { user, pass } = req.body || {};
    if(!user || !pass) { console.warn(`Admin login - missing user/pass ip=${req.ip}`); return res.status(400).json({ success:false, message:'user/pass required' }); }
    if (user !== ADMIN_USER || pass !== ADMIN_PASS) {
      console.warn(`Admin login failed for user=${user} ip=${req.ip}`);
      return res.status(403).json({ success:false, message:'Forbidden - invalid credentials' });
    }
    const token = crypto.randomBytes(24).toString('hex');
    sessions.set(token, { user, created: Date.now() });
    console.log(`Admin login for ${user} ip=${req.ip}`);
    res.json({ success:true, token, user });
  }catch(err){ console.error('Login handler error', err); res.status(500).json({ success:false, message:'Server error' }); }
});

app.post('/admin/logout', adminAuth, (req, res) => {
  const authHeader = req.get('authorization') || '';
  const bearer = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const token = req.get('x-admin-token') || bearer || req.query.token;
  if(token && sessions.has(token)) sessions.delete(token);
  res.json({ success:true, message:'Logged out' });
});

app.get('/admin/me', adminAuth, (req, res) => { res.json({ success:true, user: req.adminUser.user }); });

// Admin endpoints - protected
app.get('/admin/inquiries', adminAuth, (req, res) => {
  const data = readJson(INQUIRIES_FILE).sort((a,b)=>b.id-a.id);
  res.json({ success:true, data });
});
app.get('/admin/applications', adminAuth, (req, res) => {
  const data = readJson(APPLICATIONS_FILE).sort((a,b)=>b.id-a.id);
  res.json({ success:true, data });
});

// update status (e.g., mark read/closed)
app.put('/admin/inquiries/:id/status', adminAuth, (req, res) => {
  const id = String(req.params.id);
  const { status } = req.body;
  if(!status) return res.status(400).json({ success:false, message:'status required' });
  const data = readJson(INQUIRIES_FILE);
  const idx = data.findIndex(x => String(x.id) === id);
  if(idx === -1) return res.status(404).json({ success:false, message:'Not found' });
  data[idx].status = status;
  writeJson(INQUIRIES_FILE, data);
  res.json({ success:true, message:'Status updated', entry: data[idx] });
});

// likewise for applications
app.put('/admin/applications/:id/status', adminAuth, (req, res) => {
  const id = String(req.params.id);
  const { status } = req.body;
  if(!status) return res.status(400).json({ success:false, message:'status required' });
  const data = readJson(APPLICATIONS_FILE);
  const idx = data.findIndex(x => String(x.id) === id);
  if(idx === -1) return res.status(404).json({ success:false, message:'Not found' });
  data[idx].status = status;
  writeJson(APPLICATIONS_FILE, data);
  res.json({ success:true, message:'Status updated', entry: data[idx] });
});

// lightweight admin search (by email or carId)
app.get('/admin/search', adminAuth, (req, res) => {
  const q = (req.query.q||'').toLowerCase();
  if(!q) return res.status(400).json({ success:false, message:'q query required' });
  const inquiries = readJson(INQUIRIES_FILE);
  const apps = readJson(APPLICATIONS_FILE);
  const results = {
    inquiries: inquiries.filter(x => (x.email||'').toLowerCase().includes(q) || (x.name||'').toLowerCase().includes(q) || (String(x.carId||'')).includes(q)),
    applications: apps.filter(x => (x.email||'').toLowerCase().includes(q) || (x.github||'').toLowerCase().includes(q) || (x.name||'').toLowerCase().includes(q))
  };
  res.json({ success:true, results });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} (CORS_ORIGIN=${String(CORS_ORIGIN)})`));
