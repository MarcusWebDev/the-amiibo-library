import React, { useState } from "react";
import Tab from "../Tab/Tab";
import TextBox from "../TextBox/TextBox";
import "./TabbedTextBox.css";

const TabbedTextBox = ({tabNames, contentArray}) => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    let keyCounter = 0;
    return (
        <div className="TabbedTextBoxContainer">
            <div className="TabbedTextBoxTabsContainer">
                {
                    tabNames.map((tabName, index) => <Tab tabName={tabName} isSelected={currentTabIndex === index} handleClick={() => setCurrentTabIndex(index)} key={keyCounter++}/>)
                }
            </div>
            <TextBox contentArray={contentArray[currentTabIndex]} />
        </div>
    );
}

export default TabbedTextBox;