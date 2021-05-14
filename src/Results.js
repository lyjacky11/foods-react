import Place from "./Place";

const Results = ({ places }) => {
  return (
    <div className="results">
      {!places.length ? (
        <h2>No places found!</h2>
      ) : (
        places.map((place) => (
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
