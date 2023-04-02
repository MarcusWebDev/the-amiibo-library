import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MobileNavBar.css";

const MobileNavBar = ({isSignedIn}) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div>
            <div className={`mobileNavBarHamburger ${isVisible ? "active" : ""}`} onClick={()=> setIsVisible(!isVisible)}>
                <span className="mobileNavBarBar"></span>
                <span className="mobileNavBarBar"></span>
                <span className="mobileNavBarBar"></span>
            </div>
            <div className={`mobileNavBarContainer ${isVisible ? "mobileNavBarWidth" : "noWidth"}`} >
                <div className="mobileNavBarContentContainer">

                </div>
                <h2 className="mobileNavBarH2">Site Navigation</h2>
                <div className="mobileNavBarLinksContainer">
                    {
                        isSignedIn 
                        ? null
                        : <Link to="/signIn" className="mobileNavBarLink">Sign In</Link>
                    }
                    
                    <Link to="/" className="mobileNavBarLink">Home</Link>
                    <Link to="/amiibo" className="mobileNavBarLink">Amiibo</Link>
                </div>
                <h2 className="mobileNavBarH2">Page Tools</h2>
            </div>
        </div>
    );
}

export default MobileNavBar;