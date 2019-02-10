import React, { Component } from "react";
import { Map, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./App.css";

import MapboxLayer from "./MapboxLayer";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYWxleG1jYyIsImEiOiJjam5pMWdtN3gwanQ1M3BxdDVuZGlyZXdkIn0.SlU2gCqByEwsz0pt7ocg8A";

const myIcon = L.icon({
  iconUrl:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.75,
      lng: -111.7,
      zoom: 10,
      isLoaded: false,
      parks: [],
      todos: [],
      imageStatus: "loading",
      disabled: []
      // button: [{ id: "", disable: false }]
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
      "https://www.hikingproject.com/data/get-trails?lat=40.782976&lon=-111.697815&maxDistance=25&maxResults=40&key=200414472-cec778ee06c27612a21b53d6a62c4e6f"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            parks: result.trails
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  // checkButton = (id, display) => {
  //   const arr = {this.state.button}
  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr[i].includes(id)) {
  //       let display = false;
  //     } else {
  //       let display = true;
  //     }
  //     console.log(arr);
  //   }
  // };

  render() {
    const position = [this.state.lat, this.state.lng];
    const { error, isLoaded, parks } = this.state;
    const zooms = this.state.zoom;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <ul>
            <li className="polaroid" ref="todo">
              {this.state.todos}
            </li>
          </ul>
          <ul className="sidebar">
            {parks.map(item => (
              <li key={item.id} className="polaroid">
                <img
                  src={item.imgMedium}
                  alt="park"
                  onLoad={this.handleImageLoaded.bind(this)}
                  onError={this.handleImageErrored.bind(this)}
                  onClick={() =>
                    this.setState({
                      lat: item.latitude,
                      lng: item.longitude,
                      zoom: zooms + 6
                    })
                  }
                />
                <h2
                  onClick={() =>
                    this.setState({
                      lat: item.latitude,
                      lng: item.longitude,
                      zoom: zooms + 6
                    })
                  }
                >
                  {item.name}
                </h2>
                <input id={item.id} className="toggle" type="checkbox" />
                <label
                  htmlFor={item.id}
                  className="lbl-toggle"
                  // onClick={() =>
                  //   this.setState({
                  //     disabled: false
                  //   })
                  // }
                >
                  More Info
                </label>
                <div className="collapsible-content">
                  <div className="content-inner">
                    <p>{item.summary}</p>
                  </div>
                  <button
                    key={item.id} //** */
                    disabled={this.state.disabled.indexOf(item.id) !== -1}
                    // disabled={this.state.disabled} //loop over button state to connect to disable boolean?
                    onClick={() =>
                      this.setState({
                        todos: [...this.state.todos, item.name],
                        disabled: [...this.state.disabled, item.id]
                        // disabled: true
                        // button: [
                        //   ...this.state.button,
                        //   { id: item.id, disable: true }
                        // ]
                      })
                    }
                  >
                    Add to Wishlist
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Map
            className="map"
            center={position}
            zoom={this.state.zoom}
            maxZoom={18}
          >
            <MapboxLayer
              accessToken={MAPBOX_ACCESS_TOKEN}
              mapStyle="mapbox://styles/mapbox/outdoors-v9"
            />
            {parks.map(item => (
              <Marker
                position={[item.latitude, item.longitude]}
                icon={myIcon}
                key={item.id}
              >
                >
                <Popup>
                  <em>{item.name}</em> {item.conditionDetails}
                </Popup>
              </Marker>
            ))}
          </Map>
        </div>
      );
    }
  }
}
