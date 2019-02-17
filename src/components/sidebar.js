export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      parks: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
}
render() {
}
return (
  <div>
    <ul>
      <li className="polaroid" ref="todo">
        {this.state.todos}
      </li>
    </ul>
    <ul className="sidebar">
      <form onSubmit={this.handleSubmit}>
        <label>
          maxDist
          <input
            type="text"
            name="maxDist"
            onChange={this.handleChange}
          />
        </label>
        <label>
          maxRes
          <input type="text" name="maxRes" onChange={this.handleChange} />
        </label>
        <label>
          stars
          <input type="text" name="star" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {parks.map(item => (
        <li key={item.id} className="polaroid">
          <img src={item.imgMedium} alt="park" />
          <h2
            onClick={() =>
              this.setState({
                lat: item.latitude,
                lng: item.longitude,
                zoom: 16
              })
            }
          >
            {item.name}
          </h2>
          <input id={item.id} className="toggle" type="checkbox" />
          <label htmlFor={item.id} className="lbl-toggle">
            More Info
          </label>
          <div className="collapsible-content">
            <div className="content-inner">
              <p>{item.summary}</p>
            </div>
            <button
              disabled={this.state.disabled.indexOf(item.id) !== -1}
              onClick={() =>
                this.setState({
                  todos: [...this.state.todos, item.name],
                  disabled: [...this.state.disabled, item.id]
                })
              }
            >
              Add to Wishlist
            </button>
          </div>
        </li>
      ))}
    </ul>
    )
    }
    }
    }}}}}}