// build-config.js — reads .env.frontend and generates js/config.js
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.frontend') });

const api = process.env.API_BASE || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000');
const out = `window.__APP_ENV = window.__APP_ENV || {};
window.__APP_ENV.API_BASE = ${JSON.stringify(api)};
`;
fs.writeFileSync(path.join(__dirname, 'js', 'config.js'), out, 'utf8');
console.log('Wrote js/config.js with API_BASE=' + api);
