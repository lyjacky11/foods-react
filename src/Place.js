const MAPS_API = process.env.REACT_APP_MAPS_API;

const Place = ({ id, name, category, address, city, province, postal }) => {
  return (
    <div id="place">
      <h1>
        {id}. {name}
      </h1>
      <h2>Category: {category}</h2>
      <h3>{address}</h3>
      <h3>
        {city}, {province}
      </h3>
      <h3>{postal}</h3>
      {/* <iframe
        width="400"
        height="400"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?key=${MAPS_API}&q=${name}+${address}+${city}+${province}+${postal}`}
      ></iframe> */}
    </div>
  );
};

export default Place;
