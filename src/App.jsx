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
  const [checkClicked, setCheckClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleText1Change = (event) => setText1(event.target.value);
  const handleText2Change = (event) => setText2(event.target.value);

  const handleCompare = () => {
    setCheckClicked(true);
    setLoading(true);
    setProgress(0);

    let fakeProgress = 0;
    const interval = setInterval(() => {
      fakeProgress += 10;
      setProgress(fakeProgress);
      if (fakeProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          const diffs = diffTexts(text1, text2);
          setDiffResult(diffs);
          setLoading(false);
        }, 500);
      }
    }, 150);
  };

  const handleAddNew = () => {
    setText1("");
    setText2("");
    setDiffResult(null);
    setCheckClicked(false);
    setLoading(false);
    setProgress(0);
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
        <Forms addActive={checkClicked} onAddNew={handleAddNew} />
        <div className="app-main-content">
          {loading ? (
            <div className="loading-card">
              <p>Converting... Thank you for your patience</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                >
                  {progress}%
                </div>
              </div>
            </div>
          ) : (
            <div className={`input-section ${diffResult ? "diff-mode" : ""}`}>
              <TextInputArea
                value={text1}
                onChange={handleText1Change}
                diffMode={!!diffResult}
                diffContent={
                  diffResult
                    ? diffResult
                        .map((part) =>
                          part.type === "delete"
                            ? `<span class="delete">${part.char}</span>`
                            : part.type === "equal"
                            ? part.char
                            : ""
                        )
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
                        .map((part) =>
                          part.type === "insert"
                            ? `<span class="insert">${part.char}</span>`
                            : part.type === "equal"
                            ? part.char
                            : ""
                        )
                        .join("")
                    : ""
                }
              />
            </div>
          )}
          <CheckButton
            onClick={handleCompare}
            disabled={(!text1.trim() && !text2.trim()) || loading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
