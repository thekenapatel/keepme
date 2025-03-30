import React, { useState, useRef, useEffect } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


const NewNoteArea = ({ fetchNotes }) => {
    const [note, setNote] = useState({ title: "", content: "" });
    const [isExpanded, setIsExpanded] = useState(false);
    const noteRef = useRef(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const handleChange = (field, event) => {
        const text = event.target.innerText; // Get text directly from contentEditable div

        setNote((prev) => ({
            ...prev,
            [field]: text, // Update the correct field
        }));
    };

    const expand = () => {
        setIsExpanded(true);
    };


    const submitNote = async () => {
        if (!auth.currentUser) {
            alert("You must be logged in to save notes.");
            return;
        }

        if (note.title.trim() || note.content.trim()) {
            try {
                const userNotesRef = collection(db, "users", auth.currentUser.uid, "notes");

                await addDoc(userNotesRef, {
                    title: note.title,
                    content: note.content,
                    createdAt: serverTimestamp(),
                });

                setNote({ title: "", content: "" });

                // Clear contentEditable fields
                if (titleRef.current) titleRef.current.innerText = "";
                if (contentRef.current) contentRef.current.innerText = "";

                // Refresh notes after adding
                fetchNotes();

            } catch (error) {
                console.error("Error adding note: ", error);
            }
        }
    };


    useEffect(() => {
        function handleClickOutside(event) {
            if (noteRef.current && !noteRef.current.contains(event.target)) {
                setIsExpanded(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);





    return (
        <div className="new-note-container">
            <div
                ref={noteRef}
                className={`new-note ${isExpanded ? "expanded" : ""}`}
                onClick={expand}
            >
                {isExpanded && (
                    <div
                        ref={titleRef}
                        className="note-title"
                        contentEditable={true}
                        data-placeholder="Title"
                        onInput={(e) => handleChange("title", e)} // Handle input properly
                        suppressContentEditableWarning={true}
                    >
                        {/* {note.title} */}
                    </div>
                )}
                <div
                    ref={contentRef}
                    className="note-content"
                    contentEditable={true}
                    data-placeholder="Take a note..."
                    onInput={(e) => handleChange("content", e)} // Pass event to get innerText
                    suppressContentEditableWarning={true} // Prevent React warning
                >
                    {/* {note.content} */}
                </div>
                {isExpanded && <div className="add-button" onClick={submitNote}>+</div>}
            </div>
        </div>
    );
};

export default NewNoteArea;
