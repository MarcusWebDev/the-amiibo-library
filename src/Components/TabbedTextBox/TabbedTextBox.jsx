import React from "react";
import Tab from "../Tab";
import TextBox from "../TextBox";
import "./TabbedTextBox.scss";

const TabbedTextBox = ({ tabNames, contentArray, noContentMessage }) => {
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
  let keyCounter = 0;
  return (
    <div className="TabbedTextBoxContainer">
      <div className="TabbedTextBoxTabsContainer">
        {tabNames.map((tabName, index) => (
          <Tab
            tabName={tabName}
            isSelected={currentTabIndex === index}
            handleClick={() => setCurrentTabIndex(index)}
            key={keyCounter++}
          />
        ))}
      </div>
      <TextBox
        contentArray={contentArray[currentTabIndex]}
        noContentMessage={noContentMessage}
      />
    </div>
  );
};

export default TabbedTextBox;
