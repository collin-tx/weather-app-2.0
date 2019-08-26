import React, { Component } from 'react';
import WeatherList from './WeatherList';

export default class Weather extends Component {
    state = {
        data: [],
		city: '',
		loading: false,
		error: ''
	}
	
	componentDidMount = () => {
		//this.makeRequest();
	}

	makeRequest = () => {
		const city = this.state.city;
		this.setState({loading: true});
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b3b740bbd748af4ac0a19778baa007c1`;
		function handleErrors(response) {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response;
		}

		fetch(url).then(handleErrors)
		.then((response) => {
			return response.json();
		}).then((data) => {
			this.setState( () => {
				return { 
					data: [...this.state.data, data],
					loading: false, 
					error: false, 
					city: ''
				};
			});
		}).catch(error => {
			this.setState({ error, loading: false })
		})
	}

    changeHandler = (e) => {
		let userInput = e.target.value;
		this.setState({city: userInput})
    }
    
    submitHandler = (e) => {
		e.preventDefault();
		let city = this.state.city;
		if (city){
			this.makeRequest();
	} else {
		document.getElementById('userInput').classList.add('error');
		setTimeout(function(){
			document.getElementById('userInput').classList.remove('error');
		}, 1500);
   	 }
	}

	removeCity = (id) => {
		this.setState( prevState => ({ 
			data: prevState.data.filter(city => city.id !== id)
		}));
	}


    render() {

        return (
            <div id="weather" className="div">
                <form onSubmit={this.submitHandler}>
					<input type="text" onChange={this.changeHandler} id="userInput" className="form-control"
					 value={this.state.city} placeholder="Type a city name..." />
					<button className="btn btn-primary">Submit</button>
				</form>

				<div>
					<p className="loading">{this.state.loading && "Loading..."}</p>
					<p className="notFound">{this.state.error && 'City not found'}</p>
				</div>
				{this.state.data.length > 0 &&
				<WeatherList data={this.state.data} removeCity={this.removeCity} />
				}
            </div>
        );
    }
}