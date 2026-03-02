# Portfolio di Niccolò Piccioli

Personal portfolio of Niccolò Piccioli, software developer and music producer. Full-stack website built with React and Django.

---

## Stack Tecnologico / Tech Stack

### Frontend
- **React 18** con TypeScript / with TypeScript
- **Vite 6** come build tool
- **react-icons** per le icone / for icons
- CSS con variabili CSS (tema chiaro / light theme)

### Backend
- **Django 4.2** con Django REST Framework
- **django-cors-headers** per la gestione CORS
- **python-dotenv** per le variabili d'ambiente
- **SQLite** come database
- **WhiteNoise** per i file statici
- **Jazzmin** per l'interfaccia admin

---

## Struttura del Progetto / Project Structure

```
site-niccolopiccioli/
├── frontend/                 # Applicazione React / React application
│   ├── src/
│   │   ├── App.tsx          # Componente principale / Main component
│   │   ├── index.tsx        # Entry point React / React entry point
│   │   ├── index.css        # Stili globali / Global styles
│   │   └── vite-env.d.ts    # Tipi Vite / Vite types
│   ├── public/              # File statici pubblici / Public static files
│   ├── index.html          # Template HTML principale / Main HTML template
│   ├── vite.config.ts      # Configurazione Vite / Vite configuration
│   ├── tsconfig.json       # Configurazione TypeScript / TypeScript configuration
│   ├── package.json        # Dipendenze npm / npm dependencies
│   └── .env.development    # Variabili ambiente frontend
│
└── backend/                 # Applicazione Django
    ├── myproject/          # Configurazione Django
    │   ├── settings.py     # Impostazioni / Settings
    │   ├── urls.py         # URL principali / Main URLs
    │   └── wsgi.py         # Configurazione WSGI / WSGI configuration
    ├── contact/            # App Django per contatti / Django contact app
    │   ├── models.py       # Modello ContactMessage
    │   ├── views.py        # Vista API contact / Contact API view
    │   ├── urls.py         # URL dell'app / App URLs
    │   └── admin.py        # Configurazione admin
    ├── manage.py           # Script Django
    ├── requirements.txt    # Dipendenze Python / Python dependencies
    ├── .env.example       # Esempio variabili ambiente
    └── venv/              # Virtual environment Python
```

---

## Sezioni del Portfolio / Portfolio Sections

1. **Hero** - Introduzione con bottoni CTA / Introduction with CTA buttons
2. **Chi Sono** / **About** - Bio personale / Personal bio
3. **Competenze Tecniche** / **Skills** - Griglia di 6 skill card
4. **Esperienza e Formazione** / **Experience** - Timeline
5. **Progetti** / **Projects** - 7 progetti in stile GitHub dark
6. **Oltre il Codice** / **Beyond Code** - Hobby (Musica e Viaggi / Music & Travel)
7. **Contattami** / **Contact** - Form che invia messaggi al backend
8. **Footer** - Link email, GitHub, LinkedIn

---

## Configurazione / Configuration

### Variabili d'Ambiente Backend / Backend Environment Variables

Crea un file `backend/.env` basato su `.env.example`:

Create a `backend/.env` file based on `.env.example`:

```env
DJANGO_SECRET_KEY=your-secret-key-here
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Per generare una secret key / To generate a secret key:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Variabili d'Ambiente Frontend / Frontend Environment Variables

Il file `frontend/.env.development` è già configurato:
The `frontend/.env.development` file is already configured:
```env
VITE_API_URL=http://localhost:8000
```

---

## Comandi di Avvio / Commands

### Backend

```bash
# Attiva il virtual environment / Activate virtual environment
cd backend
source venv/bin/activate

# Installa le dipendenze / Install dependencies
pip install -r requirements.txt

# Esegui le migrazioni database / Run database migrations
python manage.py migrate

# Avvia il server / Start server
python manage.py runserver
```

**Avvio rapido** (senza attivare il venv / without activating venv):
```bash
cd backend && venv/bin/python manage.py runserver
```

Il backend sarà disponibile su / Backend will be available at `http://localhost:8000`

### Frontend

```bash
cd frontend

# Installa le dipendenze / Install dependencies
npm install

# Avvia il server di sviluppo / Start development server
npm run dev
```

**Avvio rapido / Quick start:**
```bash
cd frontend && npm run dev
```

Il frontend sarà disponibile su / Frontend will be available at `http://localhost:5173`

### Produzione / Production

```bash
# Frontend: build produzione / Frontend: production build
cd frontend && npm run build

# Preview build produzione / Preview production build
cd frontend && npm run preview
```

---

## API Contact / Contact API

### Endpoint

`POST /api/contact/`

### Richiesta / Request

```json
{
  "name": "Nome Cognome / John Doe",
  "email": "email@example.com",
  "message": "Il tuo messaggio... / Your message..."
}
```

### Validazione / Validation

- **name**: obbligatorio / required, max 100 caratteri / characters
- **email**: obbligatorio / required, formato email valido / valid email format, max 254 caratteri / characters
- **message**: obbligatorio / required, max 5000 caratteri / characters

### Rate Limiting

- 5 richieste per IP ogni ora / 5 requests per IP per hour

### Risposte / Responses

**Successo (201) / Success (201):**
```json
{
  "success": "Messaggio inviato con successo! / Message sent successfully!"
}
```

**Errore (400) / Error (400):**
```json
{
  "error": "Messaggio di errore / Error message"
}
```

**Rate Limited (429):**
```json
{
  "error": "Troppe richieste. Riprova tra un'ora. / Too many requests. Try again in an hour."
}
```

---

## Funzionalità / Features

- **Scroll animato** con easing quartico verso le sezioni / Smooth scroll with quartic easing to sections
- **Highlight sezione attiva** nella navbar tramite Intersection Observer / Active section highlight in navbar via Intersection Observer
- **Fade-in al scroll** per le sezioni / Fade-in on scroll for sections
- **Staggered animation** sulle card / Staggered animation on cards
- **Design responsive** per mobile, tablet e desktop / Responsive design for mobile, tablet and desktop
- **Tema chiaro** con accenti blue e purple / Light theme with blue and purple accents
- **Form di contatto** con validazione client e server / Contact form with client and server validation

---

## Dipendenze / Dependencies

### Python (backend)
- Django >= 4.2, < 5.0
- django-jazzmin >= 3.0, < 4.0
- djangorestframework >= 3.14, < 4.0
- django-cors-headers >= 4.3, < 5.0
- python-dotenv >= 1.0, < 2.0
- gunicorn >= 21.2, < 22.0
- whitenoise >= 6.6, < 7.0

### JavaScript (frontend)
- react ^18.2.0
- react-dom ^18.2.0
- react-icons ^5.5.0

---

## License

Progetto personale / Personal project.
