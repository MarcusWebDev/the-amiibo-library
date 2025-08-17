import React from "react";
import { Link, useOutletContext } from "react-router-dom";
// This import statement looks weird, but this is how they imported it in the documentation https://lokeshdhakar.com/projects/color-thief/
import ColorThief from "colorthief";
import "./AmiiboCard.scss";

const AmiiboCardContent = ({ amiibo, colorArray, imageRef }) => {
  return (
    <div
      className="amiiboCardContentContainer"
      style={{
        background: `linear-gradient(180deg, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 1) 0%, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 0) 100%)`,
      }}
    >
      <img
        className="amiiboCardImage"
        src={amiibo.image}
        ref={imageRef}
        crossOrigin="anonymous"
      />
      <div className="amiiboCardTextContainer">
        <p className="amiiboCardNameText">{amiibo.character}</p>
        <p className="amiiboCardSeriesText">{amiibo.amiiboSeries}</p>
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
      className={`amiiboCardContainer ${colorThiefFinished ? "" : "hidden"} ${
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
        <div className="amiiboCardSelectedIcon amiiboCardAddIcon" />
      ) : isSelected && amiibo.collected ? (
        <div className="amiiboCardSelectedIcon amiiboCardDeleteIcon" />
      ) : null}
      <AmiiboCardContent
        amiibo={amiibo}
        colorArray={colorArray}
        imageRef={imageRef}
      />
    </div>
  ) : (
    <Link
      className={`amiiboCardContainer ${colorThiefFinished ? "" : "hidden"} ${className ?? ""}`}
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
