import { StrictMode } from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div>
      <h1>Food and Places</h1>
      <p>Hello world!</p>
    </div>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);