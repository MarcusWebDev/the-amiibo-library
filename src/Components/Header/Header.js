import "./Header.scss";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ isDesktop, user, handleSignOut }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    window.onclick = (e) => {
      if (!e.target.matches(".headerProfilePicture")) {
        setDropdownVisible(false);
      }
    };
  }, []);

  return (
    <header className="headerContainer">
      {!isDesktop && <div className="headerPlaceholder" />}

      <Link to="/" className="headerLogo">
        The Amiibo Library
      </Link>

      <nav className="headerNavContainer">
        {isDesktop && (
          <div className="headerLinksContainer">
            <Link to="/" className="headerLink">
              Home
            </Link>
            <Link to="/amiibo" className="headerLink">
              Amiibo
            </Link>
            {user && (
              <Link to="/myCollection" className="headerLink">
                My Collection
              </Link>
            )}
          </div>
        )}
        {user ? (
          <img
            src={user.picture}
            onClick={() => setDropdownVisible(true)}
            className="headerProfilePicture"
          />
        ) : (
          <div id="headerSignIn" />
        )}
      </nav>
      <ul
        className={`headerProfileDropdown ${dropdownVisible ? "" : "hidden"}`}
      >
        <li onClick={() => handleSignOut()}>Logout</li>
      </ul>
    </header>
  );
};

export default Header;
