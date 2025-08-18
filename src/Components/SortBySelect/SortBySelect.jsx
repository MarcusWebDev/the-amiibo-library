import "./SortBySelect.scss";

const SortBySelect = ({ className, setSortBy }) => {
  return (
    <div className={`SortBySelect ${className ?? ""}`}>
      <label htmlFor="sortBy">Sort by: </label>
      <select name="sortBy" onChange={(e) => setSortBy(e.target.value)}>
        <option value="characterName">Character Name</option>
        <option value="amiiboSeries">Amiibo Series</option>
        <option value="releaseDate">Release Date</option>
      </select>
    </div>
  );
};

export default SortBySelect;
