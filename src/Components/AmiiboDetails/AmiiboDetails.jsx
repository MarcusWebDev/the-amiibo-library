import "./AmiiboDetails.scss";

import LoadingSpinnerWrapper from "../LoadingSpinnerWrapper";
import TabbedTextBox from "../TabbedTextBox";

const AmiiboDetails = ({ amiibo, colorArray, user, handleCollect }) => {
  const SwitchGames = amiibo?.gamesSwitch.map((game) => [
    game.gameName,
    game.amiiboUsage[0].Usage,
  ]);
  const ThreeDSGames = amiibo?.games3DS.map((game) => [
    game.gameName,
    game.amiiboUsage[0].Usage,
  ]);
  const WiiUGames = amiibo?.gamesWiiU.map((game) => [
    game.gameName,
    game.amiiboUsage[0].Usage,
  ]);

  return (
    <div className="AmiiboDetails">
      <LoadingSpinnerWrapper className="loading-container" isLoading={!amiibo}>
        <div
          className="background"
          style={{
            background: `linear-gradient(180deg, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 1) 0%, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 0) 100%)`,
          }}
        />
        <h1 className="name-header">{amiibo?.character}</h1>
        <h2 className="series-header">{amiibo?.amiiboSeries}</h2>
        <img className="image" src={amiibo?.image} />
        <p className="detail">
          <strong>Original Game Series</strong>: {amiibo?.gameSeries}
        </p>
        <p className="detail">
          <strong>Release Dates</strong>:
        </p>
        <ul className="release-dates">
          <li>
            <strong>North America</strong>:{" "}
            {new Date(amiibo?.release.na).toLocaleDateString()}
          </li>
          <li>
            <strong>Europe</strong>:{" "}
            {new Date(amiibo?.release.eu).toLocaleDateString()}
          </li>
          <li>
            <strong>Australia</strong>:{" "}
            {new Date(amiibo?.release.au).toLocaleDateString()}
          </li>
          <li>
            <strong>Japan</strong>:{" "}
            {new Date(amiibo?.release.jp).toLocaleDateString()}
          </li>
        </ul>
        {user != null && !amiibo?.collected && (
          <button className="collection-button" onClick={() => handleCollect()}>
            Add to collection
          </button>
        )}
        {user != null && amiibo?.collected && (
          <button className="collection-button" onClick={() => handleCollect()}>
            Remove from collection
          </button>
        )}
        <p className="detail">
          <strong>Usages:</strong>
        </p>
        <div className="text-box-container">
          <TabbedTextBox
            tabNames={["Switch", "3DS", "Wii U"]}
            contentArray={[SwitchGames, ThreeDSGames, WiiUGames]}
            noContentMessage="There are no usages for this amiibo on this console."
          />
        </div>
      </LoadingSpinnerWrapper>
    </div>
  );
};

export default AmiiboDetails;
