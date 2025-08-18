import "./OwnershipCheckbox.scss";

const OwnershipCheckbox = ({ labelText, isChecked, handleCheck }) => {
  return (
    <div className="OwnershipCheckbox">
      <label htmlFor={labelText}>{labelText}</label>
      <input
        type="checkbox"
        name={labelText}
        onChange={(e) => handleCheck(e.target.checked)}
        checked={isChecked}
      />
    </div>
  );
};

export default OwnershipCheckbox;
