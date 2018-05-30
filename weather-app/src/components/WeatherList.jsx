import React, { Component } from 'react';

import { WeatherApiKey } from '../data/config';
import {
  getWeatherData
} from './helpers/WeatherApi';

import WeatherHourly from './WeatherHourly';

class WeatherList extends Component{
  constructor(...props){
    super(...props)

    this.state = {
      weatherHourly:[],
      loading:true,
      coords:{
        lat:this.props.coordLat,
        lon:this.props.coordLon
      },
      error:false
    }

  }


  componentDidMount(){
    getWeatherData(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.coords.lat}&lon=${this.state.coords.lon}&APPID=${WeatherApiKey}`)
      .then(result => {
        this.setState({
          weatherHourly:this.state.weatherHourly.concat(result.list),
          loading:false
        })
      })

  }


  componentWillReceiveProps(nextProps){

    if(this.state.coord !== nextProps){
      this.setState({weatherHourly:[]})

      getWeatherData(`https://api.openweathermap.org/data/2.5/forecast?lat=${nextProps.coordLat}&lon=${nextProps.coordLon}&APPID=${WeatherApiKey}`)
      .then(result => {
          this.setState({
            weatherHourly:this.state.weatherHourly.concat(result.list),
            loading:false
          })
      })
      .catch(error => console.log(error.message))

    }

  }

  setMessage(err){
    return err
  }




  render(){

    return(
      <WeatherHourly data={this.state.weatherHourly} />
    )

  }

}

export default WeatherList;