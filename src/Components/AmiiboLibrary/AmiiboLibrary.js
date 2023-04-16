import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import AmiiboCard from "../AmiiboCard/AmiiboCard";
import OrderBySelect from "../OrderBySelect/OrderBySelect";
import SortBySelect from "../SortBySelect/SortBySelect";
import "./AmiiboLibrary.css";

const AmiiboLibrary = ({header, showAddRemove, showOwnedUnowned}) => {
    const context = useOutletContext();
    const filteredAmiiboList = context.filteredAmiiboList;
    const filterAmiibos = context.filterAmiibos;
    const setSortBy = context.setSortBy;
    const setIsAscending = context.setIsAscending;
    const isDesktop = context.isDesktop;

    return (
        <div className="amiiboLibraryContainer">
            <h1>{header}</h1>
            {
                isDesktop && 
                    <div className="amiiboLibraryDesktopControls"> 
                        {

                        }
                        <input type="search" 
                            placeholder="Search" 
                            className="mobileNavBarSearch"
                            onChange={(e) => filterAmiibos(e.target.value)}
                        />
                        <SortBySelect setSortBy={setSortBy} isRow={true}/>
                        <OrderBySelect setIsAscending={setIsAscending} />
                    </div>
            }
            <div className="amiiboLibraryCardsContainer">
                {
                    filteredAmiiboList.map((amiibo) => <AmiiboCard amiibo={amiibo} key={`${amiibo.head}${amiibo.tail}`}/>)
                }
            </div>
        </div>
    );
}

export default AmiiboLibrary;