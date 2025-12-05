<div align="center">
   <h1>🏠 PrimeEstates</h1>
   <p>Luxury real-estate marketplace with vibrant UI, Indian localization, and AI-powered assistant.</p>
   <p>
      <a href="https://prime-states.vercel.app/" target="_blank">Live Demo</a> •
      <a href="http://localhost:3001" target="_blank">Dev Server</a>
   </p>
</div>

## Overview
PrimeEstates is a modern real-estate platform built with React + TypeScript and a vibrant red/cyan/yellow theme. It features rich property listings, filters, detailed pages, an AI assistant (Gemini), and a polished UI with glassmorphism and micro-animations.

## Quick Links
- Live: https://prime-states.vercel.app/
- Repo: https://github.com/praveen-kumar-007/SPCL-Infotech-Internship-Projects
- Tech: React 19.2.1, TypeScript, Vite, Tailwind (CDN), React Router DOM 7, Lucide Icons, Google GenAI

## Features
- 🎨 Vibrant UI with glassmorphism, gradients, and smooth animations
- 🔎 Filters by listing type (Buy/Rent), property type, and search query
- 🏡 Property details with gallery, specs, features, and agent info
- 🤖 AI Assistant powered by Google Gemini for property Q&A
- 📝 Sell form to submit new listings
- 👥 Agents directory with profiles and ratings
- 🇮🇳 Indian localization: ₹ currency, Indian cities, +91 phone numbers
- ⚡ Fast dev experience with Vite and hot reload

## Getting Started
**Prerequisites:** Node.js (18+ recommended)

1) Install dependencies
```bash
npm install
```

2) Configure environment
Create `.env.local` in the project root:
```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

3) Run the dev server
```bash
npm run dev
```
Dev server runs on `http://localhost:3001` (auto-picks a free port if 3000 is busy).

## Project Structure
```
primeestates/
├─ components/
│  ├─ Navbar.tsx
│  ├─ Filters.tsx
│  ├─ PropertyCard.tsx
│  ├─ AIAssistant.tsx
│  └─ ui/ (Button, Input, Select, Badge)
├─ pages/ (Home, PropertyDetails, Sell, Agents)
├─ assets/ (logo.png)
├─ constants.ts   # Property seed data
├─ types.ts       # TypeScript models
├─ index.css      # Theme, animations, utilities
└─ App.tsx, index.tsx, vite.config.ts
```

## Scripts
- `npm run dev`    – start dev server
- `npm run build`  – production build
- `npm run preview` – preview production build

## Notes
- Theme: Primary Red `#FF6B6B`, Secondary Cyan `#4ECDC4`, Accent Yellow `#FFE66D`, Dark `#2D3436`
- Buttons in hero scroll to listings using smooth scroll
- Uses Lucide icons for UI elements

## License
This project is part of SPCL-Infotech Internship Projects. Use as reference/study material.
