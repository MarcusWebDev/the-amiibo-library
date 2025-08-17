import "./TextBox.scss";

const TextBox = ({ contentArray, noContentMessage }) => {
  let keyCounter = 0;
  return (
    <div className="textBoxContainer">
      {contentArray.length
        ? contentArray.map(([header, body]) => {
            return (
              <div key={keyCounter++}>
                <h3 className="textBoxHeader">{header}</h3>
                <p className="textBoxBody">{body}</p>
              </div>
            );
          })
        : noContentMessage}
    </div>
  );
};

export default TextBox;
