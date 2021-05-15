import { StrictMode, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SearchBox from "./SearchBox";
import Results from "./Results";
import Details from "./Details";
import placesJson from "./places.json";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    getPlaces();
  }, []);

  function getPlaces() {
    setPlaces(placesJson.places);
    setFilteredPlaces(placesJson.places);
  }

  return (
    <div className="app">
      <Router>
        <div className="header">
          <h2 className="title">Food Places</h2>
          <h3 className="subtitle">By: Jacky Ly</h3>
          <h4 className="links">
            <a href="https://github.com/lyjacky11" target="_blank">
              GitHub
            </a>{" "}
            |{" "}
            <a href="https://github.com/lyjacky11/foods-react" target="_blank">
              Project Repo
            </a>
          </h4>
        </div>
        <Switch>
          <Route exact path="/">
            <SearchBox
              places={places}
              filteredPlaces={filteredPlaces}
              setFilteredPlaces={setFilteredPlaces}
            />
            <Results filteredPlaces={filteredPlaces} />
          </Route>
          <Route exact path="/place/:id">
            <Details />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
