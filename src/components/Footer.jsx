import React from "react";

const date = new Date().getFullYear();

function Footer() {
    return (
        <footer className="footer">
            <div>
                <p>&copy; KeepMe {date.toString()}</p>
            </div>
        </footer>
    );
}

export default Footer;
