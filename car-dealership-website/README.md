# Car Dealership Website 🚗

A simple, static car dealership website with a lightweight Express backend for handling contact inquiries and internship applications. The frontend is built with plain HTML/CSS/JavaScript and uses a local JSON file for car data.

---

## 🔧 Features

- Browse car listings, view details, and compare up to 2 cars
- Contact form to send inquiries to the backend
- Internship application form
- Admin dashboard (frontend) to view and manage inquiries/applications
- Lightweight Express backend that stores inquiries/applications to JSON files

---

## 🧭 Tech Stack

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js + Express
- Data: static JSON files (`frontend/data/cars.json`, `backend/inquiries.json`, `backend/applications.json`)

---

## 🚀 Quick Start

Prerequisites:
- Node.js (v14+ recommended)

1. Start backend

```bash
cd backend
npm install
npm start
```

This starts the backend on http://localhost:5000 by default.

2. Serve the frontend

The frontend is static — you can open `frontend/index.html` directly in the browser, or use a simple static server (recommended) for proper fetch behavior. Before serving, generate the runtime config (so the frontend knows which backend to call):

```bash
# from the project root
# generate frontend config (reads frontend/.env.frontend)
cd frontend
npm install
npm run build-config

# then start a static server, for example:
npm i -g http-server
http-server -c-1 . -p 8080
# open http://localhost:8080
```

You can also use VSCode Live Server extension.

---

## 🧩 Environment & Deployment

You can configure both backend and frontend using environment files so the two pieces can be deployed and connected easily.

Backend (server):

- Copy `backend/.env.example` -> `backend/.env` and update values (do NOT commit `backend/.env`).
- Important variables:
  - `PORT` — port the API will listen on (default 5000)
  - `ADMIN_USER`, `ADMIN_PASS`, `ADMIN_TOKEN` — admin auth credentials
  - `INQUIRIES_FILE`, `APPLICATIONS_FILE` — optional paths to storage files
  - `CORS_ORIGIN` — set to your frontend origin (e.g. `https://app.example.com`) in production
- Start the backend with: `cd backend && npm install && npm start`.

Frontend (static):

- Copy `frontend/.env.frontend.example` -> `frontend/.env.frontend` and set `API_BASE` to your backend URL (e.g. `https://api.example.com`).
- Generate the runtime configuration file used by the site: `cd frontend && npm install && npm run build-config` (this will write `frontend/js/config.js`).
- Deploy the frontend static files (e.g., to Netlify, GitHub Pages, Vercel, or a static host). Make sure `js/config.js` is generated during your CI/build step so the frontend knows which API to call.

Notes:
- `js/config.js` exposes `window.__APP_ENV.API_BASE` which the site reads at runtime; admin UI will use that default unless overridden in the admin panel.
- Do not check secrets into source control — use the `.env` files locally and set environment variables in your hosting platform for production.

---

## 🔐 Admin Dashboard

- Open `frontend/admin.html` in your browser.
- Default credentials (for local testing):
  - Username: `admin`
  - Password: `changeme`
- Alternatively set environment variables in the backend process:
  - `ADMIN_USER`, `ADMIN_PASS`, and `ADMIN_TOKEN`
- Admin authentication supports `x-admin-token` header, `Authorization: Bearer <token>` header, or `?token=` query.
- The admin UI allows viewing, filtering, exporting, and updating status of enquiries/applications.

Important: the server stores session tokens in memory (Map) — tokens are cleared on server restart.

---

## 📡 API Endpoints

Base: `http://localhost:5000`

- `GET /` — health/ping
- `POST /contact` — save a contact inquiry
  - Body: `{ name, email, message, carId?, carTitle? }`
- `POST /apply` — submit internship application
  - Body: `{ name, email, github, demo?, message }`
- `POST /admin/login` — admin login (returns token)
  - Body: `{ user, pass }`
- `POST /admin/logout` — logout (requires auth)
- `GET /admin/me` — returns current admin user (requires auth)
- `GET /admin/inquiries` — list inquiries (requires auth)
- `GET /admin/applications` — list applications (requires auth)
- `PUT /admin/inquiries/:id/status` — update inquiry status (requires auth)
- `PUT /admin/applications/:id/status` — update application status (requires auth)
- `GET /admin/search?q=...` — search (requires auth)

Example curl (login):

```bash
curl -X POST http://localhost:5000/admin/login -H "Content-Type: application/json" -d '{"user":"admin","pass":"changeme"}'
```

---

## 📁 Data & Persistence

- `frontend/data/cars.json` — car listings shown on the site (edit to add/remove cars)
- `backend/inquiries.json` — stored inquiries
- `backend/applications.json` — stored internship applications (created on first application)

Note: This project uses flat JSON files for storage (no database). For production use, replace persistence with a proper database.

---

## ⚠️ Notes & Recommendations

- Default admin credentials are insecure — change them in production by setting environment variables.
- Sessions are stored in memory and will be lost on restart. Consider using a persistent session store for production.
- Backend CORS is enabled (origin: true) to allow local testing from a served frontend.
- Many images in `cars.json` are external URLs (Unsplash). Ensure the images are reachable or provide local assets if needed.

---

## Contributing

- Feel free to open issues or create pull requests.
- For feature suggestions: add support for persistent DB, file upload for car images, and pagination for admin endpoints.

---

## License

License in `backend/package.json` is set to `ISC`. If you want a different license, add a `LICENSE` file.

---

If you'd like, I can also:
- Add basic tests or linting
- Add a startup script to serve both frontend and backend concurrently
- Convert data storage to use a small DB (SQLite)

Happy to make any changes — tell me which improvements you'd like next. ✅
