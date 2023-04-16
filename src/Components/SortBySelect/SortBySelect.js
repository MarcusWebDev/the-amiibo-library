import React from "react";
import "./SortBySelect.css";

const SortBySelect = ({setSortBy, isRow}) => {
    return (
        <div className="sortBySelectContainer " style={{flexDirection: `${isRow ? "row" : "column"}`}}>
            <label htmlFor="sortBy" className="sortBySelectLabel">Sort By: </label>
            <select 
                name="sortBy" 
                className="sortBySelectSelect" 
                onChange={(e) => setSortBy(e.target.value)}
                style={{marginLeft: `${isRow ? "10px" : "0px"}`}}
            >
                <option value="characterName">Character Name</option>
                <option value="amiiboSeries">Amiibo Series</option>
                <option value="releaseDate">Release Date</option>
            </select>
        </div>
    );
}

export default SortBySelect;