import React, { Component } from 'react';
import { WeatherApiKey } from '../data/config';
import {
  getWeatherData,
  converterToCentigrates,
  showIcon
} from './helpers/WeatherApi';

import WeatherList from './WeatherList';
import WeatherHeader from './WeatherHeader';

import Loader from './Loader';

import iconSearch from './media/search.svg';




class Weather extends Component {

  constructor(...props){
    super(...props)

    this.state = {
      dataWeather:null,
      error:false
    }

    this.handleSearchForCity = this.handleSearchForCity.bind(this)

  }



  componentDidMount(){

    navigator.geolocation.getCurrentPosition(position =>{

      let coords = {
        lat:position.coords.latitude,
        lon:position.coords.longitude
      }

      getWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&APPID=${WeatherApiKey}`)
        .then(result => {

            this.setState({
              dataWeather:result
            })
        })


    })
  }





  handleSearchForCity(e){
    e.preventDefault();


    getWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${this.city.value}&APPID=${WeatherApiKey}`)
      .then(result => {

          this.setState({
            dataWeather:result,
            error:false
          })
      })
      .catch(error => this.setState({error:true}))

  }

  setMessage(err){
    return  err;
  }


  render(){
    return(
     <div>
       <div className="search">
         <form onSubmit={this.handleSearchForCity}>
            <input type="text" ref={city => this.city = city  }  placeholder="look for your city"/>
            <button type="submit">
              <img src={iconSearch} alt="icon"/>
            </button>
         </form>
       </div>
       {
          this.state.error
            ? <h2>Data no Encontrada</h2>
            :
              this.state.dataWeather
                ?(
                  <div>
                    <div className="weather">

                        <WeatherHeader
                          name={this.state.dataWeather.name}
                          country={this.state.dataWeather.sys.country}
                          tempMax={converterToCentigrates(this.state.dataWeather.main.temp_max)}
                          description={this.state.dataWeather.weather[0].description}
                          icon={showIcon(this.state.dataWeather.weather[0].icon)}
                        />

                      <div className="weather__body">
                        <WeatherList
                          coordLat={this.state.dataWeather.coord.lat}
                          coordLon={this.state.dataWeather.coord.lon}
                        />
                      </div>
                    </div>
                  </div>
                )
              : <Loader logo={iconSearch} title="Buscando.."/>
       }
     </div>

    )
  }

}

export default Weather