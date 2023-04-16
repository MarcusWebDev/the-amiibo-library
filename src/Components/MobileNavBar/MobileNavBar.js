import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderBySelect from "../OrderBySelect/OrderBySelect";
import SortBySelect from "../SortBySelect/SortBySelect";
import "./MobileNavBar.css";

const MobileNavBar = ({isSignedIn, filterAmiibos, setIsAscending, setSortBy}) => {
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
                    
                    <Link to="/" className="mobileNavBa-rLink">Home</Link>
                    <Link to="/amiibo" className="mobileNavBarLink">Amiibo</Link>
                </div>
                <h2 className="mobileNavBarH2">Page Tools</h2>
                <input type="search" 
                    placeholder="Search" 
                    className="mobileNavBarSearch"
                    onChange={(e) => filterAmiibos(e.target.value)}
                    onKeyDown={(e) =>  e.key === "Enter" && setIsVisible(false)}
                />
                <button className="mobileNavBarAddRemoveButton">Add/Remove</button>
                <SortBySelect setSortBy={setSortBy}/>
                <OrderBySelect setIsAscending={setIsAscending} />
                <div className="mobileNavBarCheckboxes">
                    <label htmlFor="showOwned">Show Owned</label>
                    <input type="checkbox" name="showOwned" />
                </div>
                <div className="mobileNavBarCheckboxes">
                    <label htmlFor="showUnowned">Show Unowned</label>
                    <input type="checkbox" name="showUnowned" />
                </div>
            </div>
        </div>
    );
}

export default MobileNavBar;