import React, { useEffect, useRef, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import ColorThief from "../../../node_modules/colorthief/dist/color-thief.mjs";
import "./LargeCarouselItem.scss";

const LargeCarouselItem = ({ amiibo }) => {
  const amiiboBackgroundColors = useOutletContext().amiiboBackgroundColors;
  const setAmiiboBackgroundColor = useOutletContext().setAmiiboBackgroundColor;
  const [colorArray, setColorArray] = useState([255, 255, 255]);
  const imageRef = useRef(null);

  useEffect(() => {
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

  return (
    <Link
      to={`/amiibo/${amiibo.character}/${amiibo.head}${amiibo.tail}/${JSON.stringify(colorArray)}`}
      className="largeCaourselItemContainer"
      style={{
        background: `linear-gradient(180deg, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 1) 0%, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 0) 100%)`,
      }}
    >
      <h1 className="largeCarouselItemHeader">New Arrival</h1>
      <span className="largeCarouselItemCharacterName">{amiibo.character}</span>
      <img
        src={amiibo.image}
        ref={imageRef}
        className="largeCarouselItemImage"
        crossOrigin="anonymous"
      />
    </Link>
  );
};

export default LargeCarouselItem;
