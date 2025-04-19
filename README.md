# 📝 KeepMe – A Modern Google Keep Clone

A beautiful, cloud-powered note app with real-time updates, secure login, and a clean UI — crafted using React, Material UI, and Firebase.

---

## ✨ Features

- 🔐 **Google Sign-In** using Firebase Authentication
- ☁️ **Real-Time Notes Sync** per user (Firestore)
- 🧠 **Persistent Data** – Data remains after reload/login
- 🧱 **Masonry Layout** for perfect note alignment
- 🛠️ **Edit Notes in Modal** using Bootstrap modals
- 💡 **Dark/Light Theme Toggle** with Material UI
- ❌ **Delete Notes** with Material UI icon
- 📱 **Responsive Design** – Works beautifully on all devices
- ⏳ **Custom iOS-style Loading Spinner**
- 🏠 **Login & Home Pages** with route protection

---

## 🖼️ Project Screenshots

![Login Page](https://github.com/user-attachments/assets/4020c6ad-2514-4aad-820e-225bd182dcd6)
![Home Page](https://github.com/user-attachments/assets/506d8445-d9fb-4bb0-a9ee-c116c60ebaa1)
![Auth Page](https://github.com/user-attachments/assets/ce546d97-daa8-40fc-b0dd-dbc9fb04d1e8)
![Edit Note Modal](https://github.com/user-attachments/assets/ba945217-426a-4ffd-bd12-6dc7b1f2ffde)

---

## 🔧 Tech Stack

- **Frontend** – React, Material UI, Bootstrap
- **Backend / DB** – Firebase Auth & Firestore
- **Styling** – CSS, Material UI

---

## 🧠 Project Flow

Here's a high-level breakdown of how the app works:

**1. User Authentication**
   - Users log in via Google using Firebase Auth.
   - On login, user UID is fetched and used for storing personalized notes.

**2. Note Management**
   - Notes are saved to Firestore under that user’s ID.
   - You can create, edit (in a Bootstrap modal), or delete notes.

**3. Data Persistence**
   - All notes sync in real-time.
   - Even after refresh or logout, once re-logged, data is fetched from Firebase.

**4. UI Enhancements**
   - Masonry layout ensures notes are displayed without gaps.
   - Material UI icons and theme toggle for a clean experience.
   - Loading spinner shown until Firebase fetch completes.
  
---

## 🚀 Getting Started (Local Setup)

## 1. Clone the repository
git clone https://github.com/thekenapatel/keepme.git <br/>
cd keepme

## 2. Install dependencies
npm install

## 3. Create a .env file and add your Firebase config

VITE_API_KEY=your_api_key  
VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com  
VITE_PROJECT_ID=your_project_id  
VITE_STORAGE_BUCKET=your_project_id.appspot.com  
VITE_MESSAGING_SENDER_ID=your_sender_id  
VITE_APP_ID=your_app_id  

## 4. Run the app
npm run dev

## 5. Open in browser
http://localhost:5173


---


## 🔗 Live Demo
👉 [Visit KeepMe Live](keepme-app.netlify.app)


---

## 🧠 How It Works
- On login, user UID is fetched using Firebase Auth.
- Notes are stored and synced under each user’s ID in Firestore.
- Real-time sync ensures changes are reflected instantly.
- Bootstrap modal used to edit notes.
- Material UI for theme toggle, icons, and visual consistency.

---

## 🙌 Inspiration
   This app is inspired by [Google Keep](https://keep.google.com/). Built for learning and portfolio purposes.

---


## 💙 Built By  
Kena Patel  
[GitHub – thekenapatel](https://github.com/thekenapatel)




