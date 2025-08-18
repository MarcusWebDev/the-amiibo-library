import "./TextBox.scss";

const TextBox = ({ contentArray, noContentMessage }) => {
  let keyCounter = 0;
  return (
    <div className="TextBox">
      {contentArray.length
        ? contentArray.map(([header, body]) => {
            return (
              <div key={keyCounter++}>
                <h3 className="header">{header}</h3>
                <p className="body">{body}</p>
              </div>
            );
          })
        : noContentMessage}
    </div>
  );
};

export default TextBox;
