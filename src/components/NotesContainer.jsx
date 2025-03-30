import React from "react";
import { db, auth } from "./firebase";
import { doc, deleteDoc } from "firebase/firestore";


function NotesContainer({ id, title, content, onDelete }) {
    async function handleDelete() {
        if (!auth.currentUser) return;

        try {
            const noteRef = doc(db, "users", auth.currentUser.uid, "notes", id);
            await deleteDoc(noteRef);

            onDelete(id); // Call onDelete to update UI
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    }

    return (
        <div className="notes">
            <h1 className="note-title">{title}</h1>
            <p className="note-content">{content}</p>
            <button className="delete-button" onClick={handleDelete}>-</button>
        </div>
    );
}


export default NotesContainer;