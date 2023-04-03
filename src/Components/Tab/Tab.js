import React from "react";
import "./Tab.css";

const Tab = ({tabName, isSelected, handleClick}) => {
    return (
        <div className={`tabContainer ${isSelected && "selected"}`} onClick={() => handleClick()}>
            {tabName}
        </div>
    );
}

export default Tab;