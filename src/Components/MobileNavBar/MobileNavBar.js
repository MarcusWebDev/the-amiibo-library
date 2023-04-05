import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
                />
                <button className="mobileNavBarAddRemoveButton">Add/Remove</button>
                <div className="mobileNavBarSortByContainer">
                    <label htmlFor="sortBy" className="mobileNavBarSortByLabel">Sort By: </label>
                    <select 
                        name="sortBy" 
                        className="mobileNavBarSelect" 
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="releaseDate">Release Date</option>
                        <option value="characterName">Character Name</option>
                        <option value="amiiboSeries">Amiibo Series</option>
                    </select>
                </div>
                <select name="ascendingOrDescending" 
                    className="mobileNavBarSelect" 
                    onChange={(e) => e.target.value == "ascending" ? setIsAscending(true) : setIsAscending(false)}
                >
                    <option value="ascending" defaultValue>Ascending</option>
                    <option value="descending">Descending</option> 
                </select>
                <div className="mobileNavBarCheckboxes">
                    <label for="showOwned">Show Owned</label>
                    <input type="checkbox" name="showOwned" />
                </div>
                <div className="mobileNavBarCheckboxes">
                    <label for="showUnowned">Show Unowned</label>
                    <input type="checkbox" name="showUnowned" />
                </div>
            </div>
        </div>
    );
}

export default MobileNavBar;