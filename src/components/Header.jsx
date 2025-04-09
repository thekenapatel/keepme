import React, { useState } from "react";
import { signInWithGoogle, logout } from "./auth";


function Header({ user }) {
    const [showMenu, setShowMenu] = useState(false);


    const toggleMenu = (e) => {
        e.stopPropagation(); // Prevent event propagation to avoid unintended behavior
        setShowMenu((prev) => !prev);
    };


    // Close the menu when clicking anywhere outside
    React.useEffect(() => {
        const closeMenu = () => setShowMenu(false);
        document.addEventListener("click", closeMenu);

        return () => {
            document.removeEventListener("click", closeMenu);
        };
    }, []);



    return (
        <header>
            <h1>KeepMe</h1>
            <div className="user-profile" onClick={toggleMenu}>
                <img
                    src={user?.photoURL || "../assets/user.png"} // ✅ FIX: Avoid empty string
                    alt="Profile"
                    // key={user?.uid} // Force React to re-render when user changes
                    className="profile-picture"
                    // onClick={toggleMenu}
                    onError={(e) => (e.target.src = "../assets/user.png")} // ✅ FIX: Fallback in case of a broken image
                />
                {showMenu && (
                    <div className="user-menu" onClick={(e) => e.stopPropagation()}>
                        <div className="menu-loggedin">
                            <p className="menu-user-email" id="user-email">{user?.email || "Not logged in"}</p>
                            {user &&
                                <img
                                    src={user?.photoURL || "../assets/user.png"} // ✅ FIX: Avoid empty string
                                    alt="User Profile"
                                    // key={user?.uid} // Force React to re-render when user changes
                                    className="menu-profile-pic"
                                    id="user-pic"
                                    onError={(e) => (e.target.src = "../assets/user.png")} // ✅ FIX: Fallback in case of a broken image
                                />
                            }
                            <p className="menu-user-name" id="user-name">Hi, {user?.displayName || "Guest"}!</p>
                        </div>
                        <div className="add-account" onClick={signInWithGoogle}>╋ Add Another Account</div>
                        <button onClick={logout} className="logout-account">Logout</button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;