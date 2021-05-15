import { useState, useEffect } from "react";

const localCache = {};

export default function useSubCategories(places, categoryValue) {
  const [subCategories, setSubCategories] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!categoryValue) {
      setSubCategories([]);
    } else if (localCache[categoryValue]) {
      setSubCategories(localCache[categoryValue]);
    } else {
      getSubCategories();
    }

    // Get unique sub categories for selected category
    function getSubCategories() {
      setSubCategories([]);
      setStatus("loading");
      var data = [];
      places.map((place) => {
        var found = data.find((x) => x === place.sub_category);
        if (!found && place.category === categoryValue) {
          data.push(place.sub_category);
        }
      });
      data.sort();
      localCache[categoryValue] = data;
      setSubCategories(localCache[categoryValue]);
      setStatus("loaded");
    }
  }, [places, categoryValue]);
  return [subCategories, status];
}
