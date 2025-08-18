import "./Tab.scss";

const Tab = ({ tabName, isSelected, handleClick }) => {
  return (
    <div
      className={`Tab ${isSelected && "selected"}`}
      onClick={() => handleClick()}
    >
      {tabName}
    </div>
  );
};

export default Tab;
