import Place from "./Place";

const Results = ({ filteredPlaces }) => {
  return (
    <div className="results">
      {!filteredPlaces.length ? (
        <h2>No places found!</h2>
      ) : (
        filteredPlaces.map((place) => (
          <Place
            key={place.id}
            id={place.id}
            name={place.name}
            category={place.category}
            sub_category={place.sub_category}
            address={place.address}
            city={place.city}
            province={place.province}
            postal={place.postal}
            logo={place.logo}
          />
        ))
      )}
    </div>
  );
};

export default Results;
