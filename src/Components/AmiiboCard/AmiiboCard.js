import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { createPath, Link, useOutletContext } from 'react-router-dom';
import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs';
import './AmiiboCard.css';

const AmiiboCard = ({amiibo, isCollectionCard, addRemoveEnabled, setSelectedAmiiboIDs, isSelected}) => {
    const context = useOutletContext();
    const imageRef = useRef(null);
    const [colorArray, setColorArray] = useState([255, 255, 255]);
    const amiiboBackgroundColors = context.amiiboBackgroundColors;
    const setAmiiboBackgroundColor = context.setAmiiboBackgroundColor;
    const [imageLoaded, setImageLoaded] = useState(false);
    const [colorThiefFinished, setColorThiefFinished] = useState(false);
    
    useEffect(() => {
        if (amiiboBackgroundColors.get("" + amiibo.head + amiibo.tail) == null) {
            let colorThief = new ColorThief();

            let amiiboImg = new Image();
            amiiboImg.src = amiibo.image;
            amiiboImg.crossOrigin = "anonymous";
            amiiboImg.onload = () => {
                let color = colorThief.getColor(amiiboImg);
                setAmiiboBackgroundColor(amiibo, color);
                setColorArray(color);
                setColorThiefFinished(true);
            }


            /*if (imageRef.current.complete) {
                let color = colorThief.getColor(imageRef.current);
                setAmiiboBackgroundColor(amiibo, color);
                setColorArray(color);
                setColorThiefFinished(true);
            } else {
                imageRef.current.addEventListener('load', () => {
                    if (imageRef.current) {
                        let color = colorThief.getColor(imageRef.current);
                        setAmiiboBackgroundColor(amiibo, color);
                        setColorArray(color);
                        setColorThiefFinished(true);
                    }
                });
            }*/
        } else {
            setColorArray(amiiboBackgroundColors.get("" + amiibo.head + amiibo.tail));
            setColorThiefFinished(true);
        }
        
    }, []);

    if (!colorThiefFinished) {
        return null;
    }

    return (
        addRemoveEnabled ? 
            <div className={`amiiboCardContainer ${colorThiefFinished ? "" : "hidden"}`}
                style={{border: `${isCollectionCard && isSelected && !amiibo.collected 
                    ? "2px solid #46FF00" 
                    : isCollectionCard && isSelected && amiibo.collected 
                    ? "2px solid #FF0000"
                    : ""}`
                }} 
                onClick={() => {
                    setSelectedAmiiboIDs((prevState) => {
                        let newSet = new Set(prevState);
                        let id = "" + amiibo.head + amiibo.tail;
                        if (prevState.has(id)) {
                            newSet.delete(id);
                        }
                        else {
                            newSet.add(id);
                        }

                        return newSet;
                    });
                }}
            >
                {
                    isCollectionCard && isSelected && !amiibo.collected 
                    ? <div className="amiiboCardSelectedIcon amiiboCardAddIcon" /> 
                    : isCollectionCard && isSelected && amiibo.collected 
                    ? <div className="amiiboCardSelectedIcon amiiboCardDeleteIcon" ></div>
                    : null
                }
                <div
                    className="amiiboCardContentContainer" 
                    style={{
                        background: `linear-gradient(180deg, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 1) 0%, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 0) 100%)`,
                        filter: `${amiibo.collected || !isCollectionCard ? "saturate(4)" : "saturate(0)"}`,
                    }}
                >
                    <img className="amiiboCardImage" 
                        src={amiibo.image} 
                        ref={imageRef} 
                        crossOrigin="anonymous"
                        style={{filter: `${amiibo.collected || !isCollectionCard ? "saturate(0.25)" : "saturate(0)"}`}}
                    />
                    <div className="amiiboCardTextContainer">
                        <p className="amiiboCardNameText">{amiibo.character}</p>
                        <p className="amiiboCardSeriesText">{amiibo.amiiboSeries}</p>
                    </div>
                </div>
            </div>

        : 

        <Link className={`amiiboCardContainer ${colorThiefFinished ? "" : "hidden"}`}
            to={`/amiibo/${amiibo.character}/${amiibo.head}${amiibo.tail}/${JSON.stringify(colorArray)}`}
        >
            <div
                className="amiiboCardContentContainer" 
                style={{
                    background: `linear-gradient(180deg, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 1) 0%, rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 0) 100%)`,
                    filter: `${amiibo.collected || !isCollectionCard ? "saturate(4)" : "saturate(0)"}`,
                }}
            >
                <img className="amiiboCardImage" 
                    src={amiibo.image} 
                    ref={imageRef} 
                    crossOrigin="anonymous"
                    style={{filter: `${amiibo.collected || !isCollectionCard ? "saturate(0.25)" : "saturate(0)"}`}}
                />
                <div className="amiiboCardTextContainer">
                    <p className="amiiboCardNameText">{amiibo.character}</p>
                    <p className="amiiboCardSeriesText">{amiibo.amiiboSeries}</p>
                </div>
            </div>
        </Link>
    );
}



export default AmiiboCard;