
### 🍱 Rescuing Meals. Restoring Dignity. Rebuilding Communities.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

> **Built for 404: Limits Not Found 2026** — Because food waste is a crime when people go hungry.

</div>

---

## 🌍 The Problem

Every day, **restaurants throw away tonnes of perfectly good food** while NGOs struggle to find meals for the people they serve. The gap isn't generosity — it's **coordination**.

**ResQMeal** bridges that gap.

---

## ✨ What is ResQMeal?

ResQMeal is a real-time food rescue platform where:

- 🍕 **Restaurants** post surplus food listings with quantity, pickup time, and location
- 🤝 **NGOs** browse, order, and coordinate food pickups — all from one dashboard
- 🗺️ **An interactive map** shows nearby restaurant listings in real time
- 🔐 **Role-based auth** ensures restaurants and NGOs each see what they need

No middlemen. No waste. Just impact.

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🔐 **Dual Auth System** | Separate onboarding flows for Restaurants & NGOs via Firebase Auth |
| 📋 **Food Listing Board** | Restaurants post surplus with name, quantity, expiry & pickup window |
| 📦 **Order / Reserve System** | NGOs can claim food listings with a single click |
| 🗺️ **Live Map Dashboard** | Interactive map showing nearby active food listings |
| 📊 **Restaurant Dashboard** | Track posted listings, claims, and pickup statuses |
| 📁 **NGO Dashboard** | Browse available food, manage reservations, view history |
| 🔔 **Real-time Updates** | Firestore listeners ensure listings update live across all users |
| 📱 **Fully Responsive** | Works seamlessly on mobile, tablet, and desktop |

---

## 🛠️ Tech Stack

```
Frontend      →  React 18 + Vite
Styling       →  Tailwind CSS
Auth          →  Firebase Authentication
Database      →  Cloud Firestore (real-time)
Map           →  Leaflet.js / Google Maps API
Hosting       →  Firebase Hosting (optional)
```

---

## 📁 Project Structure

```
resqmeal/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/              # Images, icons, static files
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── FoodCard.jsx
│   │   ├── MapView.jsx
│   │   └── ListingForm.jsx
│   ├── pages/               # Route-level pages
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── RestaurantDashboard.jsx
│   └── └── NGODashboard.jsx
│   ├── context/             # Auth & global state
│   │   └── AuthContext.jsx
│   ├── firebase/            # Firebase config & helpers
│   │   └── firebase.js
│   ├── App.jsx
│   └── main.jsx
├── .env                     # 🔴 DO NOT COMMIT
├── .env.example
├── .gitignore
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or above)
- [npm](https://npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Firebase](https://firebase.google.com/) project

---

### 🔥 Step 1 — Clone the Repository

```bash
git clone https://github.com/yourusername/resqmeal.git
cd resqmeal
```

---

### 📦 Step 2 — Install Dependencies

```bash
npm install
```

---

### 🔐 Step 3 — Set Up Firebase

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project → name it `resqmeal` (or anything you like)
3. Enable the following:
   - **Authentication** → Email/Password provider
   - **Firestore Database** → Start in test mode (for development)
4. Go to **Project Settings** → **Your apps** → Add a Web App
5. Copy your Firebase config object

---

### 🌐 Step 4 — Configure Environment Variables

Create a `.env` file in the root of your project:

```bash
cp .env.example .env
```

Then paste your Firebase config into `.env`:


> ⚠️ **Never commit your `.env` file.** It's already in `.gitignore`.

---

### ▶️ Step 5 — Run the App

```bash
npm run dev
```

Open your browser and go to:

```
http://localhost:5173
```

---

### 🏗️ Step 6 — Build for Production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```



## 🗄️ Firestore Data Schema

```
users (collection)
└── {uid}
    ├── role: "restaurant" | "ngo"
    ├── name: string
    ├── email: string
    └── location: string

listings (collection)
└── {listingId}
    ├── restaurantId: string
    ├── restaurantName: string
    ├── foodName: string
    ├── quantity: number
    ├── unit: string          // e.g., "kg", "portions"
    ├── pickupBy: timestamp
    ├── status: "available" | "claimed" | "completed"
    ├── claimedBy: string     // NGO uid (if claimed)
    └── location: { lat, lng }
```

---

## 🔐 Firestore Security Rules (Recommended)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }

    match /listings/{listingId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "restaurant";
      allow update: if request.auth != null;
    }
  }
}
```

---

## 🗺️ Map Setup

ResQMeal uses an interactive map to display nearby restaurant listings.

**Option A — Leaflet.js (Free, Recommended)**
```bash
npm install leaflet react-leaflet
```

**Option B — Google Maps**

Enable the **Maps JavaScript API** in [Google Cloud Console](https://console.cloud.google.com/) and add your key to `.env`.

---

## 👥 User Roles

### 🍽️ Restaurant
- Register as a **Restaurant**
- Post surplus food listings (name, quantity, pickup time)
- View which NGOs have claimed your listings
- Mark pickups as completed

### 🤲 NGO
- Register as an **NGO**
- Browse all available food listings
- View listings on the live map by proximity
- Claim listings and coordinate pickup

---

## 🧪 Running Locally — Quick Checklist

- [ ] Node.js v18+ installed
- [ ] `.env` file created with Firebase credentials
- [ ] Firebase Auth (Email/Password) enabled
- [ ] Firestore database created
- [ ] `npm install` completed
- [ ] `npm run dev` running
- [ ] App opens at `localhost:5173` ✅

---

## 🤝 Contributing

We welcome contributions! Here's how:

```bash
# 1. Fork the repo
# 2. Create your branch
git checkout -b feature/your-feature-name

# 3. Make your changes and commit
git commit -m "feat: add your feature"

# 4. Push and open a PR
git push origin feature/your-feature-name
```

---

## 👨‍💻 Team

| Name | Role |
|---|---|
| Your Name | Full Stack + Firebase |
| Teammate 2 | Frontend + Map Integration |
| Teammate 3 | UI/UX + Auth Flow |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Made with ❤️ and zero food wasted.**

*ResQMeal — Because every meal deserves a second chance.*

</div>
