import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component{
  renderWeather(cityData){
    const name = cityData.city.name;
    const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => temp-273);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);
    //const lat = cityData.city.coord.lat;
    //const lon = cityData.city.coord.lon;
    const {lon, lat} = cityData.city.coord;

    console.log(temps);
    return (
      <tr key={name}>
        <td>{name}</td>
        <td><GoogleMap lon={lon} lat={lat} /></td>
        <td><Chart data={temps} color="blue" units="K" /></td>
        <td><Chart data={pressures} color="green" units="hPa" /></td>
        <td><Chart data={humidities} color="orange" units="%" /></td>
      </tr>
    );
  }
  render() {
    return(
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City Name</th>
            <th>City</th>
            <th>Temperature (K)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}


/*function mapStateToProps(state){
  return { weather: state.weather };
}*/
function mapStateToProps({ weather }){
  return { weather };
}
export default connect(mapStateToProps)(WeatherList);
