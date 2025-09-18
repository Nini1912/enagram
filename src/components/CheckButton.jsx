import "./CheckButton.css";

const CheckButton = ({ onClick, disabled }) => {
  return (
    <div className="compare-button-container">
      <button
        className="compare-button"
        onClick={onClick}
        disabled={disabled}
        style={{
          backgroundColor: disabled ? "#888991" : "#007bff",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        შედარება
      </button>
    </div>
  );
};

export default CheckButton;
