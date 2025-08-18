import React from "react";
import { Link, useOutletContext } from "react-router-dom";
// This import statement looks weird, but this is how they imported it in the documentation https://lokeshdhakar.com/projects/color-thief/
import ColorThief from "colorthief";
import "./AmiiboCard.scss";

const AmiiboCardContent = ({ amiibo, colorArray, imageRef }) => {
  return (
    <div
      className="AmiiboCardContent"
      style={{
        background: `linear-gradient(180deg, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 1) 0%, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 0) 100%)`,
      }}
    >
      <img
        className="amiibo-image"
        src={amiibo.image}
        ref={imageRef}
        crossOrigin="anonymous"
      />
      <div className="text-container">
        <p className="character-name">{amiibo.character}</p>
        <p className="series">{amiibo.amiiboSeries}</p>
      </div>
    </div>
  );
};

const AmiiboCard = ({
  className,
  amiibo,
  isAddRemoveEnabled,
  setSelectedAmiiboIDs,
  isSelected,
}) => {
  const { amiiboBackgroundColors, setAmiiboBackgroundColor } =
    useOutletContext();
  const imageRef = React.useRef(null);
  const [colorArray, setColorArray] = React.useState([255, 255, 255]);
  const [colorThiefFinished, setColorThiefFinished] = React.useState(false);

  React.useEffect(() => {
    if (!amiiboBackgroundColors.get("" + amiibo.head + amiibo.tail)) {
      const colorThief = new ColorThief();
      const amiiboImg = new Image();

      amiiboImg.src = amiibo.image;
      amiiboImg.crossOrigin = "anonymous";
      amiiboImg.onload = () => {
        const color = colorThief.getColor(amiiboImg);
        setAmiiboBackgroundColor(amiibo, color);
        setColorArray(color);
        setColorThiefFinished(true);
      };
    } else {
      setColorArray(amiiboBackgroundColors.get("" + amiibo.head + amiibo.tail));
      setColorThiefFinished(true);
    }
  }, []);

  if (!colorThiefFinished) {
    return null;
  }

  return isAddRemoveEnabled ? (
    <div
      className={`AmiiboCard ${colorThiefFinished ? "" : "hidden"} ${
        isSelected && !amiibo.collected
          ? "pending-add"
          : isSelected && amiibo.collected
            ? "pending-remove"
            : ""
      } ${className ?? ""}`}
      onClick={() => {
        setSelectedAmiiboIDs((prevState) => {
          const newSet = new Set(prevState);
          const id = "" + amiibo.head + amiibo.tail;

          if (prevState.has(id)) {
            newSet.delete(id);
          } else {
            newSet.add(id);
          }

          return newSet;
        });
      }}
    >
      {isSelected && !amiibo.collected ? (
        <div className="icon add-icon" />
      ) : isSelected && amiibo.collected ? (
        <div className="icon delete-icon" />
      ) : null}
      <AmiiboCardContent
        amiibo={amiibo}
        colorArray={colorArray}
        imageRef={imageRef}
      />
    </div>
  ) : (
    <Link
      className={`AmiiboCard ${colorThiefFinished ? "" : "hidden"} ${className ?? ""}`}
      to={`/amiibo/${amiibo.head}${amiibo.tail}/?colorArray=${JSON.stringify(colorArray)}`}
    >
      <AmiiboCardContent
        amiibo={amiibo}
        colorArray={colorArray}
        imageRef={imageRef}
      />
    </Link>
  );
};

export default AmiiboCard;
