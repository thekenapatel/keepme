import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NewNoteArea from "./NewNoteArea";
import NotesContainer from "./NotesContainer";
import { signInWithGoogle, logout } from "./auth";
import { auth, db } from "./firebase";
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, serverTimestamp } from "firebase/firestore";


function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [notes, setNotes] = useState([]);


  // ✅ Fetch Notes from Firestore
  const fetchNotes = (userId) => {
    if (!userId) return;  // Ensure user is logged in before fetching notes

    const notesRef = collection(db, "users", userId, "notes");
    const q = query(notesRef, orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
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
        fetchNotes(currentUser.uid);
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
        {[...Array(12)].map((_, i) => (
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
            <h1>KeepMe</h1>
            <button onClick={signInWithGoogle}>Login with Google</button>
          </div>
        ) : (
          <>
            <Header user={user} onLogout={logout} />
            <NewNoteArea fetchNotes={fetchNotes} onAdd={addNote} />
            {notes.map((noteItem) => {
              return (
                <div className="notes-container">
                  <NotesContainer
                    key={noteItem.id}   // Use Firestore doc ID instead of index
                    id={noteItem.id}
                    title={noteItem.title}
                    content={noteItem.content}
                    onDelete={deleteNote}
                  />
                </div>
              );
            })}
            <Footer />
          </>
        )}

      </div>
    </>
  );
}

export default App;