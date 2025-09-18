import "./App.css";
import { useState } from "react";
import MenuBar from "./components/SideBar";
import Forms from "./components/Forms";
import TextInputArea from "./components/TextInputArea";
import CheckButton from "./components/CheckButton";

function App() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffResult, setDiffResult] = useState(null);

  const handleText1Change = (event) => {
    setText1(event.target.value);
  };

  const handleText2Change = (event) => {
    setText2(event.target.value);
  };

  const handleCompare = () => {
    const diffs = diffTexts(text1, text2);
    console.log("Diff result:", diffs);
    setDiffResult(diffs);
  };

  function diffTexts(a, b) {
    let matrix = Array(a.length + 1)
      .fill(null)
      .map(() => Array(b.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) {
      for (let j = 0; j <= b.length; j++) {
        if (i === 0) matrix[i][j] = j;
        else if (j === 0) matrix[i][j] = i;
        else if (a[i - 1] === b[j - 1]) matrix[i][j] = matrix[i - 1][j - 1];
        else
          matrix[i][j] =
            1 +
            Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
      }
    }

    let i = a.length;
    let j = b.length;
    let result = [];

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
        result.unshift({ type: "equal", char: a[i - 1] });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || matrix[i][j - 1] <= matrix[i - 1][j])) {
        result.unshift({ type: "insert", char: b[j - 1] });
        j--;
      } else if (i > 0 && (j === 0 || matrix[i - 1][j] < matrix[i][j - 1])) {
        result.unshift({ type: "delete", char: a[i - 1] });
        i--;
      }
    }

    return result;
  }

  return (
    <div className="main-container">
      <MenuBar />
      <div>
        <Forms />
        <div className="app-main-content">
          <div className="input-section">
            <TextInputArea
              value={text1}
              onChange={handleText1Change}
              diffMode={!!diffResult}
              diffContent={
                diffResult
                  ? diffResult
                      .map((part) => {
                        if (part.type === "delete") {
                          return `<span class="delete">${part.char}</span>`;
                        } else if (part.type === "equal") {
                          return part.char;
                        } else {
                          return "";
                        }
                      })
                      .join("")
                  : ""
              }
            />

            <img src="/arrow.svg" alt="" className="arrow-icon" />

            <TextInputArea
              value={text2}
              onChange={handleText2Change}
              diffMode={!!diffResult}
              diffContent={
                diffResult
                  ? diffResult
                      .map((part) => {
                        if (part.type === "insert") {
                          return `<span class="insert">${part.char}</span>`;
                        } else if (part.type === "equal") {
                          return part.char;
                        } else {
                          return "";
                        }
                      })
                      .join("")
                  : ""
              }
            />
          </div>
          <CheckButton
            onClick={handleCompare}
            disabled={!text1.trim() && !text2.trim()}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
