import "./OrderBySelect.scss";

const OrderBySelect = ({ setIsAscending }) => {
  return (
    <select
      name="orderBySelect"
      className="orderBySelectSelect"
      onChange={(e) =>
        e.target.value == "ascending"
          ? setIsAscending(true)
          : setIsAscending(false)
      }
    >
      <option value="ascending" defaultValue>
        Ascending
      </option>
      <option value="descending">Descending</option>
    </select>
  );
};

export default OrderBySelect;
