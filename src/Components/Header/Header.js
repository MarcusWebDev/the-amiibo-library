import './Header.css';
import React, { useState } from 'react';

const Header = ({isDesktop}) => {
    const [signedIn, setSignedIn] = useState(true);
    return (
        <header className="headerContainer">
            {
                !isDesktop && <div className="headerPlaceholder" />
            }

            <h1 className="headerLogo">The Amiibo Library</h1>

            {
                signedIn 
                ? <p className="headerSignInOrOut">Sign Out</p>
                : <p className="headerSignInOrOut">Sign In</p>
            }
        </header>
    );
}

export default Header;