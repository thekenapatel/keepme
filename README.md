# 📝 KeepMe – Google Keep Clone with Auth, Dark Mode & Firebase

A full-featured note-taking web app inspired by Google Keep. Built with **React**, **Firebase**, and **Material UI**, it supports user authentication, real-time database sync, responsive design, dark/light modes, and a clean, intuitive UI.

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

*(Add screenshots here using `![Alt text](image link)`)*  
You can take snapshots of the login screen, home screen (with notes), and dark mode.

---

## 🧠 Project Flow

Here's a high-level breakdown of how the app works:

1. **User Authentication**
   - Users log in via Google using Firebase Auth.
   - On login, user UID is fetched and used for storing personalized notes.

2. **Note Management**
   - Notes are saved to Firestore under that user’s ID.
   - You can create, edit (in a Bootstrap modal), or delete notes.

3. **Data Persistence**
   - All notes sync in real-time.
   - Even after refresh or logout, once re-logged, data is fetched from Firebase.

4. **UI Enhancements**
   - Masonry layout ensures notes are displayed without gaps.
   - Material UI icons and theme toggle for a clean experience.
   - Loading spinner shown until Firebase fetch completes.

---

## 📁 Folder Structure


---

## 🔧 Tech Stack

- **Frontend** – React, Bootstrap, Material UI
- **Backend/DB** – Firebase Auth & Firestore
- **Styling** – CSS, Material UI
- **Routing** – React Router DOM

---

## 📁 How to Run This Project Locally

1. **Clone the repo**  
   `git clone https://github.com/thekenapatel/keepme.git`

2. **Go to project folder**  
   `cd keepme`

3. **Install dependencies**  
   `npm install`

4. **Set up Firebase**  
   Create a `.env` file in the root directory and add your Firebase config:

   ```env
   VITE_API_KEY=your_api_key
   VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_PROJECT_ID=your_project_id
   VITE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_MESSAGING_SENDER_ID=your_sender_id
   VITE_APP_ID=your_app_id

3. **Start the dev server**
   `npm run dev`

5. **Open your browser**
   `Go to http://localhost:5173`



---


## 🔗 Live Demo

👉 [Visit KeepMe Live](https://keepmeapp.netlify.app)



## To Do / Future Enhancements
 - Add tags or color categories for notes
 - Enable drag & drop note rearrangement
 - Add pinned notes section
 - Optional markdown support in note content


## 🙌 Inspiration
   This app is inspired by Google Keep and built for learning and portfolio purposes.



💙 Author
Kena Patel
GitHub – thekenapatel






