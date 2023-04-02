import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs';
import './AmiiboCard.css';

const AmiiboCard = ({amiibo}) => {
    const imageRef = useRef(null);
    const [colorArray, setColorArray] = useState([255, 255, 255]);

    useEffect(() => {
        let colorThief = new ColorThief();

        if (imageRef.current.complete) {
            setColorArray(colorThief.getColor(imageRef.current));
        } else {
            imageRef.current.addEventListener('load', () => 
                setColorArray(colorThief.getColor(imageRef.current))
            );
        }
    }, []);

    return (
        <div className="amiiboCardContainer" style={{background: `linear-gradient(180deg, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 1) 0%, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 0) 100%)`}}>
            <img className="amiiboCardImage" src={amiibo.image} ref={imageRef} crossOrigin="anonymous"/>
            <div className="amiiboCardTextContainer">
                <p className="amiiboCardNameText">{amiibo.character}</p>
                <p className="amiiboCardSeriesText">{amiibo.amiiboSeries}</p>
            </div>
        </div>
    );
}

export default AmiiboCard;