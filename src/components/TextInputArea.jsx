import "./TextInputArea.css";

function TextInputArea({ value, onChange, diffMode = false, diffContent }) {
  return (
    <div className="text-input-area-container">
      {diffMode ? (
        <div
          className="text-input-diff"
          dangerouslySetInnerHTML={{ __html: diffContent }}
        ></div>
      ) : (
        <textarea
          className="text-input-textarea"
          placeholder="დაიწყე წერა..."
          value={value}
          onChange={onChange}
        ></textarea>
      )}
    </div>
  );
}

export default TextInputArea;
