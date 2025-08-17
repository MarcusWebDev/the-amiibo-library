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
    <div>
      <div
        className={`mobileNavBarCloseZone ${isVisible ? "" : "hidden"}`}
        onClick={() => setIsVisible(false)}
      />
      <div
        className={`mobileNavBarHamburger ${isVisible ? "active" : ""}`}
        onClick={() => setIsVisible(!isVisible)}
      >
        <span className="mobileNavBarBar"></span>
        <span className="mobileNavBarBar"></span>
        <span className="mobileNavBarBar"></span>
      </div>
      <div
        className={`mobileNavBarContainer ${isVisible ? "mobileNavBarWidth" : "noWidth"}`}
      >
        <div className="mobileNavBarContentContainer"></div>
        <h2 className="mobileNavBarH2">Site Navigation</h2>
        <div className="mobileNavBarLinksContainer">
          <Link to="/" className="mobileNavBa-rLink">
            Home
          </Link>
          <Link to="/amiibo" className="mobileNavBarLink">
            Amiibo
          </Link>
          {isSignedIn && (
            <Link to="/myCollection" className="mobileNavBarLink">
              My Collection
            </Link>
          )}
        </div>

        {(location.pathname == "/amiibo" ||
          location.pathname == "/myCollection") && (
          <h2 className="mobileNavBarH2">Page Tools</h2>
        )}
        {(location.pathname == "/amiibo" ||
          location.pathname == "/myCollection") && (
          <input
            type="search"
            placeholder="Search"
            className="mobileNavBarSearch"
            onChange={(e) => filterAmiibos(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setIsVisible(false)}
          />
        )}
        {location.pathname == "/myCollection" && (
          <button
            className={`mobileNavBarAddRemoveButton ${isAddRemoveEnabled ? "active" : ""}`}
            onClick={() => setIsAddRemoveEnabled((prevState) => !prevState)}
          >
            Add/Remove
          </button>
        )}

        {isAddRemoveEnabled &&
          selectedAmiiboIDs.size > 0 &&
          location.pathname == "/myCollection" && (
            <button
              className="mobileNavBarConfirmChangesButton"
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
          <SortBySelect setSortBy={setSortBy} />
        )}
        {(location.pathname == "/amiibo" ||
          location.pathname == "/myCollection") && (
          <OrderBySelect setIsAscending={setIsAscending} />
        )}
        {location.pathname == "/myCollection" && (
          <OwnershipCheckbox
            forOwned={true}
            isChecked={shouldShowOwned}
            handleCheck={setShouldShowOwned}
          />
        )}
        {location.pathname == "/myCollection" && (
          <OwnershipCheckbox
            forOwned={false}
            isChecked={shouldShowUnowned}
            handleCheck={setShouldShowUnowned}
          />
        )}
      </div>
    </div>
  );
};

export default MobileNavBar;
