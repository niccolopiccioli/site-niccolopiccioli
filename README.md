# Niccolò Piccioli - Personal Portfolio

A modern, high-performance personal portfolio website built with **React**, **TypeScript**, and **Vite**, hosted on **Firebase**. This project showcases my skills, experience, and projects with a focus on clean design and efficient architecture.

## 🚀 Overview

The website is a serverless Single Page Application (SPA). It was recently migrated from a Django-backend architecture to a more efficient, cost-effective, and faster static deployment using Firebase Hosting.

### Key Features
- **Modern Tech Stack**: React 18, TypeScript, and Vite for a lightning-fast development experience.
- **Serverless Contact Form**: Integrated with **EmailJS** to handle user inquiries directly from the client, eliminating the need for a dedicated backend server.
- **Premium UI/UX**: Responsive design with smooth CSS animations and section transitions.
- **Firebase Hosting**: Deployed on Google's global CDN with automatic SSL (HTTPS).

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Vanilla CSS (Custom properties, Flexbox/Grid)
- **Icons**: React Icons
- **Deployment**: Firebase Hosting
- **Forms**: EmailJS (Serverless Email Integration)

## 📁 Project Structure

```text
├── frontend/             # React application source code
│   ├── src/              # Components and logic
│   ├── public/           # Static assets
│   ├── .env              # Environment variables (Keys, API IDs)
│   └── vite.config.ts    # Vite configuration
├── firebase.json         # Firebase Hosting configuration
├── .firebaserc           # Firebase project associations
└── README.md             # Project documentation
```

## ⚙️ Development & Deployment

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/niccolopiccioli/site-niccolopiccioli.git
   ```
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Create a `.env` file in the `frontend` directory with your EmailJS credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Deployment to Firebase
To deploy the latest version to Firebase Hosting:
1. Build the production application:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy using Firebase CLI:
   ```bash
   cd ..
   firebase deploy
   ```

## 📄 License
This project is for personal showcase purposes. Contact [niccolopiccioli68@gmail.com](mailto:niccolopiccioli68@gmail.com) for more information.
