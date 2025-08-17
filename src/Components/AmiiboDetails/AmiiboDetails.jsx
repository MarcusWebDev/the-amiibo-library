import LoadingSpinner from "../LoadingSpinner";
import TabbedTextBox from "../TabbedTextBox";
import "./AmiiboDetails.scss";

const AmiiboDetails = ({ amiibo, colorArray, user, handleCollect }) => {
  if (!amiibo) return <LoadingSpinner />;

  const SwitchGames = amiibo.gamesSwitch.map((game) => [
    game.gameName,
    game.amiiboUsage[0].Usage,
  ]);
  const ThreeDSGames = amiibo.games3DS.map((game) => [
    game.gameName,
    game.amiiboUsage[0].Usage,
  ]);
  const WiiUGames = amiibo.gamesWiiU.map((game) => [
    game.gameName,
    game.amiiboUsage[0].Usage,
  ]);

  return (
    <div className="amiiboDetailsContainer">
      <div
        className="amiiboDetailsBackground"
        style={{
          background: `linear-gradient(180deg, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 1) 0%, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 0) 100%)`,
        }}
      />
      <h1 className="amiiboDetailsNameHeader">{amiibo.character}</h1>
      <h2 className="amiiboDetailsSeriesHeader">{amiibo.amiiboSeries}</h2>
      <img className="amiiboDetailsImage" src={amiibo.image} />
      <p className="amiiboDetailsDetails">
        <strong>Original Game Series</strong>: {amiibo.gameSeries}
      </p>
      <p className="amiiboDetailsDetails">
        <strong>Release Dates</strong>:
      </p>
      <ul className="amiiboDetailsReleaseDates">
        <li>
          <strong>North America</strong>:{" "}
          {new Date(amiibo.release.na).toLocaleDateString()}
        </li>
        <li>
          <strong>Europe</strong>:{" "}
          {new Date(amiibo.release.eu).toLocaleDateString()}
        </li>
        <li>
          <strong>Australia</strong>:{" "}
          {new Date(amiibo.release.au).toLocaleDateString()}
        </li>
        <li>
          <strong>Japan</strong>:{" "}
          {new Date(amiibo.release.jp).toLocaleDateString()}
        </li>
      </ul>
      {user != null && !amiibo.collected && (
        <button
          className="amiiboDetailsCollectionButton"
          onClick={() => handleCollect()}
        >
          Add to collection
        </button>
      )}
      {user != null && amiibo.collected && (
        <button
          className="amiiboDetailsCollectionButton"
          onClick={() => handleCollect()}
        >
          Remove from collection
        </button>
      )}
      <p className="amiiboDetailsDetails">
        <strong>Usages:</strong>
      </p>
      <div className="amiiboDetailsTextBoxContainer">
        <TabbedTextBox
          tabNames={["Switch", "3DS", "Wii U"]}
          contentArray={[SwitchGames, ThreeDSGames, WiiUGames]}
          noContentMessage="There are no usages for this amiibo on this console."
        />
      </div>
    </div>
  );
};

export default AmiiboDetails;
