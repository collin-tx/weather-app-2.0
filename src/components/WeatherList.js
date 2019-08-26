import React from 'react';
import Forecast from './Forecast';

const WeatherList = ({ data, removeCity }) => {
    
    const convertKtoF = degree => {
        return Math.round(1.8 * (degree - 273) + 32)
      }

    return (
        <div id="weather">
            <ul className="list-group">
                {data && data.map((city, index) => {
                    return (
                        <li className="list-group-item" key={city && city.id}>
                            <div className="col info">
                            <h4>{city.name}</h4>
                            <img className="sm-img" alt="weather symbol" src={city.weather && `http://openweathermap.org/img/w/${city.weather[0].icon}.png`} />
                            <p>{city.weather && city.weather[0].description}</p>
                            </div>
                            <div className="col temp">
                                <p>Current: {convertKtoF(city.main && city.main.temp).toFixed(0) + "°"}</p>
                                <p>High: {convertKtoF(city.main && city.main.temp_max).toFixed(0) + "°"}</p>
                                <p>Low: {convertKtoF(city.main && city.main.temp_min).toFixed(0) + "°"}</p>
                            </div>
                            <div className="col btns">
                                <button className="btn btn-sm btn-danger" id="remove" onClick={ () => removeCity(city.id) }>remove</button>
                                <Forecast city={city.name} cityID={city.id} convert={convertKtoF} />
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}


export default WeatherList;