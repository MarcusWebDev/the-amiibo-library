import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import AmiiboCard from "../AmiiboCard/AmiiboCard";
import OrderBySelect from "../OrderBySelect/OrderBySelect";
import SortBySelect from "../SortBySelect/SortBySelect";
import "./AmiiboLibrary.css";

const AmiiboLibrary = ({header, showAddRemove, showOwnedUnowned, isCollection}) => {
    const context = useOutletContext();
    const filteredAmiiboList = context.filteredAmiiboList;
    const filterAmiibos = context.filterAmiibos;
    const setSortBy = context.setSortBy;
    const setIsAscending = context.setIsAscending;
    const isDesktop = context.isDesktop;
    const amiiboList = context.amiiboList;
    const setAmiiboList = context.setAmiiboList;
    const [addRemoveEnabled, setAddRemoveEnabled] = useState(false);
    const [selectedAmiiboIDs, setSelectedAmiiboIDs] = useState(new Set());

    const toggleSelectedAmiiboCollection = () => {
        let newArray = amiiboList.map((amiibo) => {
            if (selectedAmiiboIDs.has("" + amiibo.head + amiibo.tail)) {
                return {...amiibo, collected: !amiibo.collected}
            }
            else {
                return amiibo;
            }
        });

        setSelectedAmiiboIDs(new Set());
        return newArray;
    }

    return (
        <div className="amiiboLibraryContainer">
            <h1>{header}</h1>
            {
                isDesktop && 
                    <div className="amiiboLibraryDesktopControls"> 
                        {
                            showAddRemove && <button className={`amiiboLibraryAddRemoveButton ${addRemoveEnabled ? "active" : ""}`} onClick={() => setAddRemoveEnabled((prevState)=> !prevState)}>Add/Remove</button>
                        }
                        {
                            addRemoveEnabled && selectedAmiiboIDs.size != 0 && 
                                <button 
                                    className="amiiboLibraryConfirmChangesButton" 
                                    onClick={() => {
                                        setAddRemoveEnabled(false);
                                        setAmiiboList(toggleSelectedAmiiboCollection());
                                        
                                    }}
                                >
                                    Confirm Changes
                                </button>
                        }
                        <input type="search" 
                            placeholder="Search" 
                            className="amiiboLibrarySearch"
                            onChange={(e) => filterAmiibos(e.target.value)}
                        />
                        <SortBySelect setSortBy={setSortBy} isRow={true}/>
                        <OrderBySelect setIsAscending={setIsAscending} />
                    </div>
            }
            <div className="amiiboLibraryCardsContainer">
                {
                    filteredAmiiboList.map((amiibo) => 
                        <AmiiboCard 
                            amiibo={amiibo} 
                            key={`${amiibo.head}${amiibo.tail}`} 
                            isCollectionCard={isCollection} 
                            addRemoveEnabled={addRemoveEnabled} 
                            setSelectedAmiiboIDs={setSelectedAmiiboIDs}
                            isSelected={selectedAmiiboIDs.has("" + amiibo.head + amiibo.tail)}
                        />)
                }
            </div>
        </div>
    );
}

export default AmiiboLibrary;