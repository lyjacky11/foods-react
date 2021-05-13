const Place = ({ id, name, address, city, province, postal }) => {
  return (
    <div id="place">
      <h1>
        {id}. {name}
      </h1>
      <h2>{address}</h2>
      <h3>
        {city}, {province}
      </h3>
      <h3>{postal}</h3>
    </div>
  );
};

export default Place;
