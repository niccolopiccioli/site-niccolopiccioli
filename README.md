# site-niccolopiccioli

Personal portfolio website. Built with **React**, **TypeScript**, and **Vite**, hosted on **Firebase Hosting**.

Migrated from a Django-backed SPA to a serverless static deployment for improved performance, reduced cost, and simplified infrastructure.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite |
| Styling | CSS Custom Properties, Flexbox, Grid |
| Icons | react-icons |
| Forms | EmailJS (serverless, client-side) |
| Hosting | Firebase Hosting (CDN, HTTPS) |

## Structure

```
frontend/
├── src/              # Components and application logic
├── public/           # Static assets
├── .env              # EmailJS credentials
└── vite.config.ts    # Vite configuration
firebase.json         # Firebase hosting rules
.firebaserc           # Project association
```

## Local Development

```bash
git clone https://github.com/niccolopiccioli/site-niccolopiccioli.git
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

```bash
npm run dev
```

## Deployment

```bash
cd frontend
npm run build
cd ..
firebase deploy
```
