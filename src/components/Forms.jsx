import "./Forms.css";
const Forms = () => {
  return (
    <div className="app">
      <span className="line-box">
        <div className="select-container">
          <select id="language" className="select-dropdown">
            <option value="georgian">ქართული</option>
            <option value="english">ინგლისური</option>
            <option value="russian">რუსული</option>
          </select>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" id="font-selection" className="checkbox" />
          <label htmlFor="font-selection" className="checkbox-label">
            ფორმატის შენარჩუნება
          </label>
        </div>
        <button className="add-button">
          <img src="/plus.svg" alt="" className="plus-icon" />
          <span className="button-text">ახლის გახსნა</span>
        </button>
      </span>
    </div>
  );
};
export default Forms;
