import React, { Component } from 'react';
/* eslint-disable */
export class Forecast extends Component {
   
    state = {
        data: [],
        city: this.props.city,
        display: false,
    }

    componentDidMount(){
        this.getForecast();
    }

    getForecast = () => {
        const cityID = this.props.cityID
        const url = `https://api.openweathermap.org/data/2.5/forecast?id=${cityID}&appid=b3b740bbd748af4ac0a19778baa007c1`
        fetch(url).then(response => response.json())
        .then(data => {
            this.state.data.push(data);
        })
    }

    displayForecast = (e) => {
        this.setState( () => { 
            return { display: !this.state.display } 
        })
    }
    
    render() {
        let tomorrowDesc = this.state.data[0] && this.state.data[0].list[7].weather[0].description;
        let tomorrowHI = this.state.data[0] && "high: " + this.props.convert(this.state.data[0].list[7].main.temp_max) + "°"
        return (
            <div>
            <button className="btn btn-sm btn-info" id="moreInfo" onClick={this.displayForecast}>{this.state.display ? 'hide info' : 'more info'}</button>
                {
                    this.state.display && 
                    <div className="tomorrowDisplay">
                        <p>tomorrow: </p>
                        <p>{tomorrowDesc}</p>
                        <p>{tomorrowHI}</p>
                    </div>
                }
            </div>
        )
    }
}

export default Forecast