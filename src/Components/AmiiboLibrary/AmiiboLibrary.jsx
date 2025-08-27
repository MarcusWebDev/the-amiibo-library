import React from "react";
import { useLocation, useOutletContext } from "react-router-dom";

import "./AmiiboLibrary.scss";

import AmiiboCard from "../AmiiboCard";
import LoadingSpinnerWrapper from "../LoadingSpinnerWrapper";
import OrderBySelect from "../OrderBySelect";
import OwnershipCheckbox from "../OwnershipCheckbox";
import SortBySelect from "../SortBySelect";

const AmiiboLibrary = ({
  className,
  header,
  showAddRemove,
  showOwnedUnowned,
}) => {
  const {
    filteredAmiiboList,
    searchString,
    setSearchString,
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
    <div className={`AmiiboLibrary ${className ?? ""}`}>
      <h1>{header}</h1>
      {isDesktop && (
        <div className="desktop-controls">
          {showAddRemove && (
            <button
              className={`add-remove-button ${isAddRemoveEnabled ? "active" : ""}`}
              onClick={() => setIsAddRemoveEnabled((prevState) => !prevState)}
            >
              Add / Remove
            </button>
          )}
          {isAddRemoveEnabled && selectedAmiiboIDs.size != 0 && (
            <button
              className="confirm-changes-button"
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
          <div className="ownership-checkboxes-container">
            {showOwnedUnowned && (
              <OwnershipCheckbox
                labelText="Show Owned"
                isChecked={shouldShowOwned}
                handleCheck={setShouldShowOwned}
              />
            )}
            {showOwnedUnowned && (
              <OwnershipCheckbox
                labelText="Show Unowned"
                isChecked={shouldShowUnowned}
                handleCheck={setShouldShowUnowned}
              />
            )}
          </div>
          <input
            className="search-field"
            type="search"
            placeholder="Search"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <SortBySelect setSortBy={setSortBy} isRow={true} />
          <OrderBySelect setIsAscending={setIsAscending} />
        </div>
      )}
      <LoadingSpinnerWrapper
        className="loading-container"
        isLoading={!filteredAmiiboList.length}
      >
        <div className="cards-container">
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
      </LoadingSpinnerWrapper>
    </div>
  );
};

export default AmiiboLibrary;
