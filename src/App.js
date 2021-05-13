import { StrictMode } from "react";
import ReactDOM from "react-dom";
import SearchBox from "./SearchBox";

const App = () => {
  return (
    <div className="app">
      <h1>Food and Places</h1>
      <SearchBox />
    </div>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
