import React from 'react';
import uid from 'uid';

import{
  converterToCentigrates,
  realDate,
  showIcon
} from './helpers/WeatherApi';

const WeatherHourly = (props) => (

  props.data !== undefined
    ? (
      props.data.map(weather => (
        <div className="weather-item" key={uid(5)}>
          <div className="info-day">
            <img src={showIcon(weather.weather[0].icon)} alt=""/>
            <p className="weather-date">{ realDate(weather.dt,'realdate') }
              <span>{ weather.weather[0].description }</span>
            </p>
          </div>
          <div className="info-weather">
            <div className="temperature">
              <span className="temp temp-max">{ converterToCentigrates(weather.main.temp_max)   } °C</span>
              <span className="temp temp-min">{ converterToCentigrates(weather.main.temp_min)  } °C</span>
            </div>
          </div>
        </div>
      ))

    )
    : <h2> No es no</h2>


)

export default WeatherHourly
