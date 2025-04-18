import React, { useState, useRef, useEffect } from "react";
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
    const modalContentRef = useRef(null);
    const modalTitleRef = useRef(null);


    useEffect(() => {
        if (modalTitleRef.current) {
            modalTitleRef.current.innerText = modalTitle;
        }
        if (modalContentRef.current) {
            modalContentRef.current.innerText = modalContent;
        }
    }, []);


    useEffect(() => {
    const modal = document.getElementById(`modal-${id}`);
    const handleResize = () => {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    };

    if (modal) {
        modal.addEventListener('hidden.bs.modal', handleResize);
    }

    return () => {
        if (modal) {
            modal.removeEventListener('hidden.bs.modal', handleResize);
        }
    };
}, [id]);






    // const updateNote = async () => {
    //     if (!auth.currentUser) return;

    //     const noteRef = doc(db, "users", auth.currentUser.uid, "notes", id);
    //     const updatedTitle = modalTitleRef.current.innerText;
    //     const updatedContent = modalContentRef.current.innerText;

    //     try {
    //         await updateDoc(noteRef, {
    //             title: updatedTitle,
    //             content: updatedContent
    //         });
    //         setNoteTitle(updatedTitle);
    //         setNoteContent(updatedContent);
    //     } catch (error) {
    //         console.error("Error updating note:", error);
    //     }
    // };

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
const updateNote = async () => {
    if (!auth.currentUser) return;

    const updatedTitle = modalTitleRef.current.innerText;
    const updatedContent = modalContentRef.current.innerText;

    if (updatedTitle === noteTitle && updatedContent === noteContent) return;

    try {
        const noteRef = doc(db, "users", auth.currentUser.uid, "notes", id);
        await updateDoc(noteRef, {
            title: updatedTitle,
            content: updatedContent
        });

        setNoteTitle(updatedTitle);
        setNoteContent(updatedContent);
    } catch (error) {
        console.error("Error updating note:", error);
    }
};


    return (
        <>
            {/* Bootstrap Modal */}
            <div
                className="modal fade"
                id={`modal-${id}`}
                tabIndex="-1"
                aria-labelledby={`modalLabel-${id}`}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content custom-modal">
                        <div className="modal-body">
                            <div
                                ref={modalTitleRef}
                                className="editable-title"
                                contentEditable={true}
                                data-placeholder="Title"
                                suppressContentEditableWarning={true}
                                onInput={(e) => setModalTitle(e.currentTarget.textContent)}
                            >
                            </div>
                            <div
                                ref={modalContentRef}
                                className="editable-content"
                                contentEditable={true}
                                data-placeholder="Note"
                                suppressContentEditableWarning={true}
                                onInput={(e) => setModalContent(e.currentTarget.textContent)}
                            >
                            </div>
                        </div>
                        <div className="modal-footer border-0">
                            <button
                                type="button"
                                className="btn btn-primary save-button"
                                onClick={updateNote}
                                data-bs-dismiss="modal"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>



            {/* Note Card */}
            <div className="notes">
                <div
                    onClick={() => document.getElementById(`modal-${id}`)?.classList.add("show")} // optional: JS-based modal trigger
                    data-bs-toggle="modal"
                    data-bs-target={`#modal-${id}`}
                    style={{ width: "100%" }}
                >
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
                </div>

                <button
                    className="delete-button"
                    onClick={(e) => {
                        e.stopPropagation(); // prevents modal trigger
                        handleDelete();
                    }}
                >
                    <DeleteIcon />
                </button>
            </div>
        </>
    );
}

export default NotesContainer;