import { useState, useEffect } from "react";

const SearchBox = ({ places, setFilteredPlaces }) => {
  const [nameValue, setNameValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategoryValue, setSubCategoryValue] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  // Get unique categories
  useEffect(() => {
    var data = [];
    places.map((place) => {
      var found = data.find((x) => x === place.category);
      if (!found) {
        data.push(place.category);
      }
    });
    data.sort();
    setCategories(data);
  }, [places]);

  // Get unique sub-categories for a selected category
  useEffect(() => {
    var data = [];
    places.map((place) => {
      var found = data.find((x) => x === place.sub_category);
      if (!found && place.category === categoryValue) {
        data.push(place.sub_category);
      }
    });
    data.sort();
    setSubCategories(data);
  }, [categoryValue]);

  // Fetch places by search parameters
  useEffect(() => {
    let data = places;
    // Name
    let placesByName = new Set();
    if (nameValue) {
      data.map((place) => {
        if (place.name.toLowerCase().includes(nameValue.toLowerCase())) {
          placesByName.add(place);
        }
      });
      data = [...placesByName];
    }
    // Location
    let placesByLocation = new Set();
    if (locationValue) {
      data.map((place) => {
        if (
          place.address.toLowerCase().includes(locationValue.toLowerCase()) ||
          place.city.toLowerCase().includes(locationValue.toLowerCase()) ||
          place.province.toLowerCase().includes(locationValue.toLowerCase()) ||
          place.postal.toLowerCase().includes(locationValue.toLowerCase())
        ) {
          placesByLocation.add(place);
        }
      });
      data = [...placesByLocation];
    }
    // Category
    let placesByCategory = new Set();
    if (categoryValue) {
      data.map((place) => {
        if (place.category === categoryValue) {
          placesByCategory.add(place);
        }
      });
      data = [...placesByCategory];
    }
    // Sub Category
    if (subCategoryValue) {
      data.map((place) => {
        if (place.subCategory !== subCategoryValue) {
          const index = data.indexOf(place);
          data.slice(index, 1);
        }
      });
    }
    setFilteredPlaces(data);
  }, [nameValue, locationValue, categoryValue, subCategoryValue]);

  function resetFilters() {
    setNameValue("");
    setLocationValue("");
    setCategoryValue("");
    setSubCategoryValue("");
  }

  return (
    <div className="search-box">
      <b>Search for a place:</b>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="name">
          Name:
          <input
            id="name"
            value={nameValue}
            placeholder="Search by name..."
            onChange={(e) => setNameValue(e.target.value)}
            onBlur={(e) => setNameValue(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="location">
          Location:
          <input
            id="location"
            value={locationValue}
            placeholder="Address, Location, Postal Code"
            onChange={(e) => setLocationValue(e.target.value)}
            onBlur={(e) => setLocationValue(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="category">
          Category:
          <select
            id="category"
            value={categoryValue}
            onChange={(e) => setCategoryValue(e.target.value)}
            onBlur={(e) => setCategoryValue(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label htmlFor="sub_category">
          Sub Category:
          <select
            id="sub_category"
            value={subCategoryValue}
            onChange={(e) => setSubCategoryValue(e.target.value)}
            onBlur={(e) => setSubCategoryValue(e.target.value)}
            disabled={!subCategories.length}
          >
            <option value=""></option>
            {subCategories.map((subCategory) => (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button onClick={resetFilters}>Reset</button>
      </form>
    </div>
  );
};

export default SearchBox;
