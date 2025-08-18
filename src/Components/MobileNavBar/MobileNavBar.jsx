import React from "react";
import { Link, useLocation } from "react-router-dom";
import OrderBySelect from "../OrderBySelect";
import OwnershipCheckbox from "../OwnershipCheckbox";
import SortBySelect from "../SortBySelect";
import "./MobileNavBar.scss";

const MobileNavBar = ({
  isSignedIn,
  filterAmiibos,
  setIsAscending,
  setSortBy,
  toggleSelectedAmiiboCollection,
  isAddRemoveEnabled,
  setIsAddRemoveEnabled,
  setAmiiboList,
  selectedAmiiboIDs,
  shouldShowOwned,
  shouldShowUnowned,
  setShouldShowOwned,
  setShouldShowUnowned,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const location = useLocation();

  return (
    <div className="MobileNavBar">
      <div
        className={`hamburger ${isVisible ? "active" : ""}`}
        onClick={() => setIsVisible(!isVisible)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <div className={`nav-bar-container ${isVisible ? "" : "no-width"}`}>
        <h2 className="header">Site Navigation</h2>
        <div className="links-container">
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/amiibo" className="link">
            Amiibo
          </Link>
          {isSignedIn && (
            <Link to="/myCollection" className="link">
              My Collection
            </Link>
          )}
        </div>

        {(location.pathname == "/amiibo" ||
          location.pathname == "/myCollection") && (
          <>
            <h2 className="header">Page Tools</h2>
            <input
              type="search"
              placeholder="Search"
              className="search-field"
              onChange={(e) => filterAmiibos(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setIsVisible(false)}
            />
          </>
        )}
        {location.pathname == "/myCollection" && (
          <button
            className={`add-remove-button ${isAddRemoveEnabled ? "active" : ""}`}
            onClick={() => setIsAddRemoveEnabled((prevState) => !prevState)}
          >
            Add / Remove
          </button>
        )}

        {isAddRemoveEnabled &&
          selectedAmiiboIDs.size > 0 &&
          location.pathname == "/myCollection" && (
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
        {(location.pathname == "/amiibo" ||
          location.pathname == "/myCollection") && (
          <>
            <SortBySelect className="sort-by-select" setSortBy={setSortBy} />
            <OrderBySelect setIsAscending={setIsAscending} />
          </>
        )}
        {location.pathname == "/myCollection" && (
          <div className="checkbox-container">
            <OwnershipCheckbox
              labelText="Show Owned"
              isChecked={shouldShowOwned}
              handleCheck={setShouldShowOwned}
            />
            <OwnershipCheckbox
              labelText="Show Unowned"
              isChecked={shouldShowUnowned}
              handleCheck={setShouldShowUnowned}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavBar;
