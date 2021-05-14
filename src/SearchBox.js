import { useState, useEffect } from "react";
import Place from "./Place";
import placesJson from "../public/places.json";

const CATEGORIES = ["Boba", "Restaurant", "Sushi"];

const SearchBox = () => {
  const [categoryValue, setCategoryValue] = useState("");
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlaces();
  }, []);

  function getPlaces() {
    setPlaces(placesJson);
  }

  return (
    <div className="search-box">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="category">
          Category
          <select
            id="category"
            value={categoryValue}
            onChange={(e) => setCategoryValue(e.target.value)}
            onBlur={(e) => setCategoryValue(e.target.value)}
          >
            <option></option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <button>Search</button>
      </form>
      {places.map((place) => (
        <div key={place.id}>
          <Place
            id={place.id}
            name={place.name}
            category={place.category}
            address={place.address}
            city={place.city}
            province={place.province}
            postal={place.postal}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchBox;
