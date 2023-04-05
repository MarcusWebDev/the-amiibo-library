import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs';
import './AmiiboCard.css';

const AmiiboCard = ({amiibo}) => {
    const context = useOutletContext();
    const imageRef = useRef(null);
    const [colorArray, setColorArray] = useState([255, 255, 255]);
    const amiiboBackgroundColors = context.amiiboBackgroundColors;
    const setAmiiboBackgroundColor = context.setAmiiboBackgroundColor;
    const amiiboList = context.amiiboList;

    useEffect(() => {

        if (amiiboBackgroundColors.get("" + amiibo.head + amiibo.tail) == null) {
            let colorThief = new ColorThief();

            if (imageRef.current.complete) {
                let color = colorThief.getColor(imageRef.current);
                setAmiiboBackgroundColor(amiibo, color);
                setColorArray(color);
            } else {
                imageRef.current.addEventListener('load', () => {
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
            className="amiiboCardContainer" 
            style={{background: `linear-gradient(180deg, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 1) 0%, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 0) 100%)`}}
        >
            <img className="amiiboCardImage" src={amiibo.image} ref={imageRef} crossOrigin="anonymous"/>
            <div className="amiiboCardTextContainer">
                <p className="amiiboCardNameText">{amiibo.character}</p>
                <p className="amiiboCardSeriesText">{amiibo.amiiboSeries}</p>
            </div>
        </Link>
    );
}

export default AmiiboCard;