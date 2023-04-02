import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import AmiiboCard from "../AmiiboCard/AmiiboCard";
import "./AmiiboLibrary.css";

const AmiiboLibrary = ({}) => {
    const amiiboList = useOutletContext();
    return (
        <div className="amiiboLibraryContainer">
            <h1>Amiibo</h1>
            <div className="amiiboLibraryCardsContainer">
                {
                    amiiboList.map((amiibo) => <AmiiboCard amiibo={amiibo} key={`${amiibo.head}${amiibo.tail}`}/>)
                }
            </div>
        </div>
    );
}

export default AmiiboLibrary;