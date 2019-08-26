import React, { Component } from 'react';
import Weather from './components/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


export default class App extends Component {
	state = {
		websiteName: 'Open Weather API',
	}

	render() {

		return (
			<main>
				<h1>{this.state.websiteName}</h1>
				<Weather />
			</main>
		);
  }
}
