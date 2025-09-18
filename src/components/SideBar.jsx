import "./Sidebar.css";
const SideBar = () => {
  return (
    <>
      <div className="sidebar">
        <p>&#60;&#60;</p>
        <div className="logo">
          <img src="/enagram_logo.png" alt="" className="logo-img" />
          <h5>ENAGRAM</h5>
        </div>
        <ul className="menu">
          <li>
            <img src="/checkmark.svg" alt="" className="icon" /> მართლმწერი
          </li>
          <li className="current-page">
            <img src="/paragraph.svg" alt="" className="icon" /> ტექსტის
            შედარება
          </li>
          <span className="current-page-back">
            <img src="/paragraph.svg" alt="" className="icon" /> ტექსტის
            შედარება
          </span>
          <li>
            <img src="/mic.svg" alt="" className="icon" /> ხმა ➜ ტექსტი
          </li>
          <li>
            <img src="/voice.svg" alt="" className="icon" /> ტექსტი ➜ ხმა
          </li>
          <li>
            <img src="/document.svg" alt="" className="icon" /> PDF კონვერტაცია
          </li>
        </ul>
      </div>
      <div className="user">
        <img src="/user.svg" alt="" /> თამარ ონიანი
        <img src="/more.svg" alt="" className="more" />
      </div>
    </>
  );
};
export default SideBar;
