import React from "react";
import "./TextBox.css";

const TextBox = ({contentArray}) => {
    console.log(contentArray);
    return (
        <div className="textBoxContainer">
            {
                contentArray.map(([header, body]) => {
                    return (
                        <div>
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