import React, { useState, useEffect, useRef } from "react";
import Masonry from "masonry-layout";
import Header from "./Header";
import Footer from "./Footer";
import NewNoteArea from "./NewNoteArea";
import NotesContainer from "./NotesContainer";
import { signInWithGoogle, logout } from "./auth";
import { auth, db } from "./firebase";
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import homepagelogo from "../assets/homepage-logo.png";
import "../styles/loading.css";
import "../styles/mediaqueries.css";
import "../styles/modal.css";
import "../styles/theme.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [notes, setNotes] = useState([]);
  const masonryRef = useRef(null);


  useEffect(() => {
    if (masonryRef.current) {
      new Masonry(masonryRef.current, {
        itemSelector: '.notes',
        columnWidth: '.notes',
        gutter: 3,
        fitWidth: true
      });
    }
  }, [notes]);


  // ✅ Fetch Notes from Firestore
  const fetchNotes = (userId) => {
    if (!userId) return;  // Ensure user is logged in before fetching notes

    const notesRef = collection(db, "users", userId, "notes");
    const q = query(notesRef, orderBy("createdAt", "desc"));

    return onSnapshot(q, (snapshot) => {
      const notesArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotes(notesArray);
    });
  };


  // ✅ Monitor authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        const unsubscribeNotes = fetchNotes(currentUser.uid);
        return () => unsubscribeNotes(); // Unsubscribe from Firestore when user logs out
      } else {
        setNotes([]);
      }
    });

    return unsubscribe;
  }, []);




  // ✅ Function to add notes to Firestore
  const addNote = async (newNote) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "users", user.uid, "notes"), {
        title: newNote.title,
        content: newNote.content,
        createdAt: serverTimestamp(),
      });
      fetchNotes(user.uid); // Refresh notes after adding
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };


  // ✅ Function to delete notes from Firestore
  const deleteNote = async (id) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "notes", id));
      console.log("Note deleted:", id);
      fetchNotes(user.uid); // Refresh notes after deleting
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };


  // Show loading spinner before authentication is checked
  if (loading) {
    return (
      <div className="ispinner">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="ispinner-blade"></div>
        ))}
      </div>
    );
  }


  return (
    <>
      <div className="main-container">
        {!user ? (
          <div className="login-page">
            <div className="logo-name">
              <img className="homepage-logo" src={homepagelogo} alt="homepage-logo"></img>
              <h1>KeepMe</h1>
            </div>
            <button className="login-w-google" onClick={signInWithGoogle}>Login with Google</button>
          </div>
        ) : (
          <>
            <Header user={user} onLogout={logout} />
            <NewNoteArea fetchNotes={fetchNotes} onAdd={addNote} />
            <div className="notes-all">
              <div className="notes-container" ref={masonryRef}>
                {notes.map((noteItem) => {
                  return (
                    <NotesContainer
                      key={noteItem.id}
                      id={noteItem.id}
                      title={noteItem.title}
                      content={noteItem.content}
                      onDelete={deleteNote}
                    />
                  );
                })}
              </div>
            </div>
            <Footer />
          </>
        )}
      </div >
    </>
  );
}

export default App;