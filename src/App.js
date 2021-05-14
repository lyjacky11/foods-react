import { StrictMode, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import SearchBox from "./SearchBox";
import Results from "./Results";
import placesJson from "./places.json";

const App = () => {
  const [places, setPlaces] = useState([]);
  const categories = [];
  places.map((place) => {
    var found = categories.find((x) => x === place.category);
    if (!found) {
      categories.push(place.category);
    }
  });
  categories.sort();

  function getPlaces() {
    setPlaces(placesJson);
  }

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <div className="app">
      <h1>Food Places</h1>
      <SearchBox categories={categories} />
      <Results places={places} />
    </div>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
