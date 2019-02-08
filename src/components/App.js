import React, { Component } from "react";
import { Map, GeoJSON, Marker } from "react-leaflet";
import changeCoords from "./changeCoords";
import L from "leaflet";
import "./App.css";

import MapboxLayer from "./MapboxLayer";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYWxleG1jYyIsImEiOiJjam5pMWdtN3gwanQ1M3BxdDVuZGlyZXdkIn0.SlU2gCqByEwsz0pt7ocg8A";

const myIcon = L.icon({
  iconUrl: "http://leafletjs.com/examples/custom-icons/leaf-green.png",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.75,
      lng: -112.4,
      zoom: 10,
      isLoaded: false,
      parks: [],
      imageStatus: "loading"
    };
  }

  handleImageLoaded() {
    this.setState({ imageStatus: "loaded" });
  }

  handleImageErrored() {
    this.setState({ imageStatus: "failed to load" });
  }

  componentDidMount() {
    fetch(
      "https://developer.nps.gov/api/v1/parks?stateCode=UT&fields=images&limit=50&api_key=ugi2889p0Blcnpbz4r7lIaJKIoeZDB5g5AH7FVfC"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            parks: result.data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const { error, isLoaded, parks } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <ul className="sidebar">
            {parks.map(item => (
              <li key={item.id} className="polaroid">
                <img
                  src={item.images[1].url}
                  alt="park"
                  onLoad={this.handleImageLoaded.bind(this)}
                  onError={this.handleImageErrored.bind(this)}
                />
                <h2>{item.name}</h2>
                {item.latLong}
                <input id={item.id} className="toggle" type="checkbox" />
                <label htmlFor={item.id} className="lbl-toggle">
                  More Info
                </label>
                <div className="collapsible-content">
                  <div className="content-inner">
                    <p>{item.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Map className="map" center={position} zoom={this.state.zoom}>
            <MapboxLayer
              accessToken={MAPBOX_ACCESS_TOKEN}
              style="mapbox://styles/mapbox/outdoors-v9"
            />
            <GeoJSON key={parks.id} data={parks} />
            <Marker position={coords} icon={myIcon} />
          </Map>
        </div>
      );
    }
  }
}
