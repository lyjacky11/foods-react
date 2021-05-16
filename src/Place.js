import { Link } from "react-router-dom";
import logos from "./logos/*.png";

const Place = ({
  id,
  name,
  category,
  sub_category,
  address,
  city,
  province,
  postal,
  logo,
}) => {
  return (
    <Link to={`/place/${id}`} className="place-container">
      <div className="place-logo">
        <img src={`${logos[logo]}`} alt={name}></img>
      </div>
      <div className="place-info">
        <h3>{name}</h3>
        <h4>
          {sub_category != "null" ? `${sub_category} ` : ""}
          {category}
        </h4>
        <h5>{address}</h5>
        <h5>
          {city}, {province} {postal}
        </h5>
      </div>
    </Link>
  );
};

export default Place;
