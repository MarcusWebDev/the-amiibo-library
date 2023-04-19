import React, { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import AmiiboCard from "../AmiiboCard/AmiiboCard";
import OrderBySelect from "../OrderBySelect/OrderBySelect";
import OwnershipCheckbox from "../OwnershipCheckbox/OwnershipCheckbox";
import SortBySelect from "../SortBySelect/SortBySelect";
import "./AmiiboLibrary.css";

const AmiiboLibrary = ({header, showAddRemove, showOwnedUnowned, isCollection}) => {
    const context = useOutletContext();
    const filteredAmiiboList = context.filteredAmiiboList;
    const filterAmiibos = context.filterAmiibos;
    const setSortBy = context.setSortBy;
    const setIsAscending = context.setIsAscending;
    const isDesktop = context.isDesktop;
    const setAmiiboList = context.setAmiiboList;
    const addRemoveEnabled = context.addRemoveEnabled;
    const setAddRemoveEnabled = context.setAddRemoveEnabled;
    const toggleSelectedAmiiboCollection = context.toggleSelectedAmiiboCollection;
    const selectedAmiiboIDs = context.selectedAmiiboIDs;
    const setSelectedAmiiboIDs = context.setSelectedAmiiboIDs;
    const showOwned = context.showOwned;
    const showUnowned = context.showUnowned;
    const setShowOwned = context.setShowOwned;
    const setShowUnowned = context.setShowUnowned;
    const location = useLocation();

    useEffect(() => {
        if (location.pathname != "/myCollection") {
            setShowOwned(true);
            setShowUnowned(true);
        }
    }, [location])

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
                        <div className="amiiboLibraryOwnershipCheckboxes">
                            {
                                showOwnedUnowned && <OwnershipCheckbox forOwned={true} isChecked={showOwned} handleCheck={setShowOwned}/>
                            }
                            {
                                showOwnedUnowned && <OwnershipCheckbox forOwned={false} isChecked={showUnowned} handleCheck={setShowUnowned}/>
                            }
                        </div>
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