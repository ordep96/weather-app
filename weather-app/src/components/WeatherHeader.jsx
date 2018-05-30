import React from 'react';


const WeatherHeader = (props) => (

  <div className="weather__head">
      <p>{props.name}, { props.country }</p>
      <h2 className="centigrates">{ props.tempMax }</h2>
      <p>{ props.description}</p>
      <img
        className="weather-icon"
        src= {props.icon }
        alt=""/>
  </div>

);


export default WeatherHeader;