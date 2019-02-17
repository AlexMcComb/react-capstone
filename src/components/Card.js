render() {
  return(
{parks.map(item => (
<h2 onClick={() => this.setState({lat: item.latitude, 
           lng: item.longitude, zoom: 16})
           }>{item.name}</h2>
))
)}}