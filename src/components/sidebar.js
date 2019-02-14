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
