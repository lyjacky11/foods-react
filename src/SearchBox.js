import { useState, useEffect } from "react";
import Place from "./Place";
import placesJson from "../public/places.json";

const SearchBox = () => {
  const [categoryValue, setCategoryValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [places, setPlaces] = useState([]);

  const categories = [];
  places.map((place) => {
    var found = categories.find((x) => x === place.category);
    if (!found) {
      categories.push(place.category);
    }
  });

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
        <label htmlFor="name">
          Name
          <input
            id="name"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            onBlur={(e) => setNameValue(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={locationValue}
            onChange={(e) => setLocationValue(e.target.value)}
            onBlur={(e) => setLocationValue(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="category">
          Category
          <select
            id="category"
            value={categoryValue}
            onChange={(e) => setCategoryValue(e.target.value)}
            onBlur={(e) => setCategoryValue(e.target.value)}
          >
            <option></option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <br />
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
