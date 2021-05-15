import { useState, useEffect } from "react";
import useCategories from "./useCategories";
import useSubCategories from "./useSubCategories";

const SearchBox = ({ places, filteredPlaces, setFilteredPlaces }) => {
  const [nameValue, setNameValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [prevCategoryValue, setPrevCategoryValue] = useState("");
  const [subCategoryValue, setSubCategoryValue] = useState("");

  // Custom hooks
  const [categories] = useCategories(places);
  const [subCategories] = useSubCategories(places, categoryValue);

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
    console.log(categoryValue, subCategoryValue);
    if (!categoryValue || categoryValue !== prevCategoryValue) {
      setSubCategoryValue("");
    }
    if (categoryValue) {
      data.map((place) => {
        if (place.category === categoryValue) {
          placesByCategory.add(place);
        }
      });
      setPrevCategoryValue(categoryValue);
      data = [...placesByCategory];
    }
    // Sub Category
    let placesBySubCategory = new Set();
    if (subCategoryValue) {
      data.map((place) => {
        if (place.sub_category === subCategoryValue) {
          placesBySubCategory.add(place);
        }
      });
      data = [...placesBySubCategory];
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
      <b>Search Filters</b>
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
            placeholder="Address, City, Prov, or Postal Code"
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
        <button className="button" onClick={resetFilters}>
          Reset Filters
        </button>
        <br />
        <h3>{filteredPlaces.length} results</h3>
      </form>
    </div>
  );
};

export default SearchBox;
