import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Place from "./Place";
import logos from "./logos/*.png";

const MAPS_API = process.env.REACT_APP_MAPS_API;

class PlaceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      place: [],
      locations: [],
    };
  }

  componentDidMount() {
    const { getPlaceById, getOtherLocations } = this.props;
    const id = this.props.match.params.id;
    const place = getPlaceById(id);
    if (place) {
      // document.title = `${place.name} | Food Places`;
      const locations = getOtherLocations(place);
      this.setState({
        loading: false,
        place: place,
        locations: locations,
      });
    } else {
      this.setState({
        loading: false,
        place: null,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <h3>Loading place details...</h3>;
    }
    if (!this.state.place) {
      return (
        <div>
          <h4>
            <Link to="/">↩ Back to Home</Link>
          </h4>
          <h3>Place not found!</h3>
        </div>
      );
    }

    const { place, locations } = this.state;
    const {
      id,
      name,
      category,
      sub_category,
      address,
      city,
      province,
      postal,
      logo,
    } = place;

    return (
      <div className="place-details">
        <h4>
          <Link to="/">↩ Back to Home</Link>
        </h4>
        <div className="place-details-logo">
          <img src={`${logos[logo]}`} alt={name}></img>
        </div>
        <div className="place-details-info">
          <h3>
            {name} | {sub_category != "null" ? `${sub_category} ` : ""}
            {category}
          </h3>
          <h4>
            {address}, {city}, {province} {postal}
          </h4>
        </div>
        <div className="embed-map">
          <iframe
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=${MAPS_API}&q=${name}+${address}+${city}+${province}+${postal}`}
          ></iframe>
        </div>
        {!locations.length ? (
          <div />
        ) : (
          <>
            <h3>Other Locations</h3>
            <div className="other-locations">
              {locations.map((place) => (
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
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(PlaceDetails);
