import "./OwnershipCheckbox.scss";

const OwnershipCheckbox = ({ forOwned, isChecked, handleCheck }) => {
  return (
    <div className="ownershipCheckboxContainer">
      <label htmlFor={`${forOwned ? "shouldShowOwned" : "shouldShowUnowned"}`}>
        Show {forOwned ? "Owned" : "Unowned"}
      </label>
      <input
        type="checkbox"
        name={`${forOwned ? "shouldShowOwned" : "shouldShowUnowned"}`}
        onChange={(e) => handleCheck(e.target.checked)}
        checked={isChecked}
      />
    </div>
  );
};

export default OwnershipCheckbox;
