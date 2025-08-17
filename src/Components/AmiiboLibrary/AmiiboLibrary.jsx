import React from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import AmiiboCard from "../AmiiboCard";
import OrderBySelect from "../OrderBySelect";
import OwnershipCheckbox from "../OwnershipCheckbox";
import SortBySelect from "../SortBySelect";
import "./AmiiboLibrary.scss";

const AmiiboLibrary = ({
  className,
  header,
  showAddRemove,
  showOwnedUnowned,
}) => {
  const {
    filteredAmiiboList,
    filterAmiibos,
    setSortBy,
    setIsAscending,
    isDesktop,
    setAmiiboList,
    isAddRemoveEnabled,
    setIsAddRemoveEnabled,
    toggleSelectedAmiiboCollection,
    selectedAmiiboIDs,
    setSelectedAmiiboIDs,
    shouldShowOwned,
    shouldShowUnowned,
    setShouldShowOwned,
    setShouldShowUnowned,
  } = useOutletContext();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname != "/myCollection") {
      setShouldShowOwned(true);
      setShouldShowUnowned(true);
    }
  }, [location]);

  return (
    <div className={`amiiboLibraryContainer ${className ?? ""}`}>
      <h1>{header}</h1>
      {isDesktop && (
        <div className="amiiboLibraryDesktopControls">
          {showAddRemove && (
            <button
              className={`amiiboLibraryAddRemoveButton ${isAddRemoveEnabled ? "active" : ""}`}
              onClick={() => setIsAddRemoveEnabled((prevState) => !prevState)}
            >
              Add/Remove
            </button>
          )}
          {isAddRemoveEnabled && selectedAmiiboIDs.size != 0 && (
            <button
              className="amiiboLibraryConfirmChangesButton"
              onClick={async () => {
                setIsAddRemoveEnabled(false);
                setAmiiboList(
                  await toggleSelectedAmiiboCollection(selectedAmiiboIDs),
                );
              }}
            >
              Confirm Changes
            </button>
          )}
          <div className="amiiboLibraryOwnershipCheckboxes">
            {showOwnedUnowned && (
              <OwnershipCheckbox
                forOwned={true}
                isChecked={shouldShowOwned}
                handleCheck={setShouldShowOwned}
              />
            )}
            {showOwnedUnowned && (
              <OwnershipCheckbox
                forOwned={false}
                isChecked={shouldShowUnowned}
                handleCheck={setShouldShowUnowned}
              />
            )}
          </div>
          <input
            type="search"
            placeholder="Search"
            className="amiiboLibrarySearch"
            onChange={(e) => filterAmiibos(e.target.value)}
          />
          <SortBySelect setSortBy={setSortBy} isRow={true} />
          <OrderBySelect setIsAscending={setIsAscending} />
        </div>
      )}
      <div className="amiiboLibraryCardsContainer">
        {filteredAmiiboList.map((amiibo) => (
          <AmiiboCard
            className={`${!amiibo.collected ? "uncollected-card" : ""}`}
            amiibo={amiibo}
            key={`${amiibo.head}${amiibo.tail}`}
            isAddRemoveEnabled={isAddRemoveEnabled}
            setSelectedAmiiboIDs={setSelectedAmiiboIDs}
            isSelected={selectedAmiiboIDs.has("" + amiibo.head + amiibo.tail)}
          />
        ))}
      </div>
    </div>
  );
};

export default AmiiboLibrary;
