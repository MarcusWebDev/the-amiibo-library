import React from "react";
import "./OwnershipCheckbox.css";

const OwnershipCheckbox = ({forOwned, isChecked, handleCheck}) => {
    return (
        <div className="ownershipCheckboxContainer">
            <label htmlFor={`${forOwned ? "showOwned" : "showUnowned"}`}>Show {forOwned ? "Owned" : "Unowned"}</label>
            <input type="checkbox" 
                name={`${forOwned ? "showOwned" : "showUnowned"}`} 
                onChange={(e) => handleCheck(e.target.checked)}
                checked={isChecked}
            />
        </div>
    );
}

export default OwnershipCheckbox;