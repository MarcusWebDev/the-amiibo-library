import "./NavBar.scss";
import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ isDesktop, user, handleSignOut }) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  React.useEffect(() => {
    window.onclick = (e) => {
      if (!e.target.matches(".profile-picture")) {
        setDropdownVisible(false);
      }
    };
  }, []);

  return (
    <header className="NavBar">
      {/* 
        Since the hamburger menu button needs to appear over top of the header and menu, it is positioned absolutely.
        Therefore to have other header elements spaced correctly around the hamburger menu button, a placeholder is added.
      */}
      {!isDesktop && <div className="mobile-hamburger-menu-placeholder" />}
      <Link to="/" className="logo">
        The Amiibo Library
      </Link>
      <nav className="nav-container">
        {isDesktop && (
          <div className="links-container">
            <Link to="/" className="link">
              Home
            </Link>
            <Link to="/amiibo" className="link">
              Amiibo
            </Link>
            {user && (
              <Link to="/myCollection" className="link">
                My Collection
              </Link>
            )}
          </div>
        )}
        {user ? (
          <img
            src={user.picture}
            onClick={() => setDropdownVisible(true)}
            className="profile-picture"
          />
        ) : (
          <div id="sign-in" />
        )}
      </nav>
      <ul className={`profile-dropdown ${dropdownVisible ? "" : "hidden"}`}>
        <li onClick={() => handleSignOut()}>Logout</li>
      </ul>
    </header>
  );
};

export default NavBar;
