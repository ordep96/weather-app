
import sun from '../media/01d.svg';
import moon from '../media/01n.svg';
import fewCloudsD from '../media/02d.svg';
import fewCloudsN from '../media/02n.svg';
import clouds from '../media/03d.svg';
import brokenClouds from '../media/04d.svg';
import showerRain from '../media/09d.svg';
import rainD from '../media/10d.svg';
import rainN from '../media/10n.svg';
import thunderStorm from '../media/11d.svg';
import snow from '../media/13d.svg';
import mist from '../media/50d.svg';

const getWeatherData = (data) => (
  fetch(data)
    .then(result =>{
      if(result.ok){
        return result.json()
      }else{
        let error = new Error(result.statusText)
            error.result = result
            throw error
      }
    })
)


const converterToCentigrates = (valor) => {
  return Math.floor(valor - 273.15);
}


const realDate = (timestant,options) => {
  const date = new Date(timestant * 1000)
  let hour = date.getHours(),
      minutes = date.getMinutes();

  if(options === "realdate"){
    return date.toLocaleDateString('en-EN', {day:'numeric',month:'long',year:'numeric'});
  }

  if(options === "hour"){

    if(hour < 10) hour = `0${hour}`;
    if(minutes < 10) minutes = `0${minutes}`;

    return `${hour}: ${minutes}`;
  }

}


const showIcon = (iconCode) => {

  const icons = {
    "01d":sun,
    "01n":moon,
    "02d":fewCloudsD,
    "02n":fewCloudsN,
    "03d":clouds,
    "03n":clouds,
    "04d":brokenClouds,
    "04n":brokenClouds,
    "09d":showerRain,
    "09n":showerRain,
    "10d":rainD,
    "10n":rainN,
    "11d":thunderStorm,
    "11n":thunderStorm,
    "13d":snow,
    "13n":snow,
    "50d":mist,
    "50n":mist
  }

  return icons[iconCode]

}



export {
  getWeatherData,
  converterToCentigrates,
  realDate,
  showIcon
}