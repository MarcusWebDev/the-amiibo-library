import ColorThief from "colorthief";
import React from "react";
import { Link, useOutletContext } from "react-router-dom";

import "./LargeCarouselItem.scss";

import { shrinkTextToFitContainer } from "../../utils/textUtils.jsx";

const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

const LargeCarouselItem = ({ amiibo }) => {
  const { amiiboBackgroundColors, setAmiiboBackgroundColor, windowDimensions } =
    useOutletContext();
  const [colorArray, setColorArray] = React.useState([255, 255, 255]);
  const imageRef = React.useRef(null);
  const nameRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const differenceInMilliseconds = new Date() - new Date(amiibo.release.na);
  const isReleasedWithinThirtyDays =
    Math.floor(differenceInMilliseconds / ONE_DAY_IN_MILLISECONDS) < 30;

  React.useEffect(() => {
    if (amiiboBackgroundColors.get("" + amiibo.head + amiibo.tail) == null) {
      let colorThief = new ColorThief();

      if (imageRef.current.complete) {
        let color = colorThief.getColor(imageRef.current);
        setAmiiboBackgroundColor(amiibo, color);
        setColorArray(color);
      } else {
        imageRef.current.addEventListener("load", () => {
          if (imageRef.current) {
            let color = colorThief.getColor(imageRef.current);
            setAmiiboBackgroundColor(amiibo, color);
            setColorArray(color);
          }
        });
      }
    } else {
      setColorArray(amiiboBackgroundColors.get("" + amiibo.head + amiibo.tail));
    }
  }, []);

  React.useEffect(() => {
    if (containerRef && nameRef) {
      if (windowDimensions.innerWidth > 600) {
        shrinkTextToFitContainer(containerRef.current, nameRef.current, 300);
      } else {
        shrinkTextToFitContainer(containerRef.current, nameRef.current, 100);
      }
    }
  }, [windowDimensions]);

  return (
    <Link
      ref={containerRef}
      className="LargeCarouselItem"
      to={`/amiibo/${amiibo.head}${amiibo.tail}/?colorArray=${JSON.stringify(colorArray)}`}
      style={{
        background: `linear-gradient(180deg, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 1) 0%, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 0) 100%)`,
      }}
    >
      {isReleasedWithinThirtyDays && <h1 className="header">New Arrival</h1>}
      <span ref={nameRef} className="character-name">
        {amiibo.character}
      </span>
      <img
        className="image"
        src={amiibo.image}
        ref={imageRef}
        crossOrigin="anonymous"
      />
    </Link>
  );
};

export default LargeCarouselItem;
