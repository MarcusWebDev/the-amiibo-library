import './Header.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({isDesktop, user, handleSignOut}) => {
    return (
        <header className="headerContainer">
            {
                !isDesktop && <div className="headerPlaceholder" />
            }

            <h1 className="headerLogo">The Amiibo Library</h1>

            <nav className="headerNavContainer">
                {
                    isDesktop && 
                    <div className="headerLinksContainer">
                        <Link to="/" className="headerLink">Home</Link>
                        <Link to="/amiibo" className="headerLink">Amiibo</Link>
                        {user && <Link to="/myCollection" className="headerLink">My Collection</Link>}
                    </div>
                        
                }
                {
                    user ? <img src={user.picture} onClick={handleSignOut} className="headerProfilePicture" /> : <div id="headerSignIn"/>
                }
                
            </nav>
            
            {/*
                signedIn 
                ? <p className="headerSignInOrOut">Sign Out</p>
                : <p className="headerSignInOrOut">Sign In</p>
            */}
        </header>
    );
}

export default Header;