import React from "react";
import "./TextBox.css";

const TextBox = ({contentArray}) => {
    let keyCounter = 0;
    return (
        <div className="textBoxContainer">
            {
                contentArray.map(([header, body]) => {
                    return (
                        <div key={keyCounter++}>
                            <h3 className="textBoxHeader">{header}</h3>
                            <p className="textBoxBody">{body}</p>
                        </div>
                    );
                })
            }
        </div>
    );  
}

export default TextBox;