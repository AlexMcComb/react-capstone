import React from "react";

class Map extends React.Component {
  render() {
    return <div />;
  }
}

class HikeCards extends React.Component {
  render() {
    const name = this.props.name;
    const description = this.props.description;
    const image = this.props.image;
    return { image, name, description };
  }
}

class SideBar extends React.Component {
  render() {
    return (
      <div>
        <HikeCards products={this.props.hikes} />
      </div>
    );
  }
}

class LogOut extends React.Component {
  render() {
    return <div />;
  }
}

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <logo img />
        <LogOut />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <SideBar />
        <Map />
      </div>
    );
  }
}

const HIKES = [
  {
    imgage: "url",
    name: "Milcreek",
    description: "5 miles, clear conditions"
  },
  {
    imgage: "url",
    name: "Milcreek",
    description: "5 miles, clear conditions"
  },
  {
    imgage: "url",
    name: "Milcreek",
    description: "5 miles, clear conditions"
  }
];

// ReactDOM.render(<App products={HIKES} />, document.getElementById("container"));
