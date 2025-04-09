// import React, { useState, useRef } from "react";
// import { db, auth } from "./firebase";
// import { doc, deleteDoc, updateDoc } from "firebase/firestore";
// import DeleteIcon from '@mui/icons-material/Delete';

// function NotesContainer({ id, title, content, onDelete }) {

//     const [noteTitle, setNoteTitle] = useState(title);
//     const [noteContent, setNoteContent] = useState(content);
//     const titleRef = useRef(null);
//     const contentRef = useRef(null);

//     // ✅ Function to update Firestore when user stops editing
//     const updateNote = async (field, value) => {
//         if (!auth.currentUser) return;
//         const noteRef = doc(db, "users", auth.currentUser.uid, "notes", id);
//         try {
//             await updateDoc(noteRef, { [field]: value });
//             console.log(`Note updated: ${field} = ${value}`); // ✅ Debugging
//         } catch (error) {
//             console.error("Error updating note:", error);
//         }
//     };


//     // ✅ Function to delete the note
//     async function handleDelete() {
//         if (!auth.currentUser) return;

//         try {
//             const noteRef = doc(db, "users", auth.currentUser.uid, "notes", id);
//             await deleteDoc(noteRef);

//             onDelete(id); // Call onDelete to update UI
//         } catch (error) {
//             console.error("Error deleting note:", error);
//         }
//     }

//     //handle input and preserve cursor point
//     const handleInput = (setter, ref, e) => {
//         e.preventDefault();

//         const selection = window.getSelection();
//         const range = selection.getRangeAt(0);

//         if (!ref.current || !ref.current.firstChild) return; // Prevents errors if the element is empty

//         const startOffset = range.startOffset; // Save cursor position

//         setter(e.target.innerText); // Update state

//         setTimeout(() => {
//             if (!ref.current || !ref.current.firstChild) return; // Double-check after state update

//             // Force browser reflow
//             ref.current.style.height = "auto";  // Reset height
//             ref.current.style.height = ref.current.scrollHeight + "px"; // Expand dynamically

//             // Restore selection after re-render
//             const newRange = document.createRange();
//             newRange.setStart(ref.current.firstChild, Math.min(startOffset, ref.current.firstChild.length));
//             newRange.collapse(true);

//             selection.removeAllRanges();
//             selection.addRange(newRange);
//         }, 0);
//     };



//     return (
//         <div className="notes">
//             <h1
//                 ref={titleRef}
//                 className="note-title"
//                 contentEditable={true}
//                 suppressContentEditableWarning={true}
//                 onBlur={(e) => updateNote("title", e.target.innerText)}
//                 onInput={(e) => handleInput("title", setNoteTitle, titleRef, e)}
//             >{noteTitle}</h1>
//             <p
//                 ref={contentRef}
//                 className="note-content"
//                 contentEditable={true}
//                 suppressContentEditableWarning={true}
//                 onBlur={(e) => updateNote("content", e.target.innerText)}
//                 onInput={(e) => handleInput("content", setNoteContent, contentRef, e)}
//             >{noteContent}</p>
//             <button className="delete-button" onClick={handleDelete}>
//                 <DeleteIcon />
//             </button >
//         </div >
//     );
// }


// export default NotesContainer;





import React, { useState, useRef } from "react";
import { db, auth } from "./firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import DeleteIcon from '@mui/icons-material/Delete';

function NotesContainer({ id, title, content, onDelete }) {
    const [noteTitle, setNoteTitle] = useState(title);
    const [noteContent, setNoteContent] = useState(content);
    const [modalTitle, setModalTitle] = useState(title);
    const [modalContent, setModalContent] = useState(content);
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    // Function to update Firestore when user saves changes
    const updateNote = async () => {
        if (!auth.currentUser) return;
        const noteRef = doc(db, "users", auth.currentUser.uid, "notes", id);
        try {
            await updateDoc(noteRef, { title: modalTitle, content: modalContent });
            setNoteTitle(modalTitle);
            setNoteContent(modalContent);
            console.log("Note updated successfully");
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    // Function to delete the note
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
        <>
            {/* Bootstrap Modal */}
            <div className="modal fade" id={`modal-${id}`} tabIndex="-1" aria-labelledby={`modalLabel-${id}`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <input
                                type="text"
                                className="form-control"
                                value={modalTitle}
                                onChange={(e) => setModalTitle(e.target.value)}
                                placeholder="Edit Title"
                            />
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <textarea
                                className="form-control"
                                rows="5"
                                value={modalContent}
                                onChange={(e) => setModalContent(e.target.value)}
                                placeholder="Edit Content"
                            ></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={updateNote}
                                data-bs-dismiss="modal"
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Note Card */}
            <div className="notes" data-bs-toggle="modal" data-bs-target={`#modal-${id}`}>
                <h1
                    ref={titleRef}
                    className="note-title"
                    suppressContentEditableWarning={true}
                >
                    {noteTitle}
                </h1>
                <p
                    ref={contentRef}
                    className="note-content"
                    suppressContentEditableWarning={true}
                >
                    {noteContent}
                </p>
                <button className="delete-button" onClick={handleDelete}>
                    <DeleteIcon />
                </button>
            </div>
        </>
    );
}

export default NotesContainer;