import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MainNav } from './components/MainNav';
import { Saved } from './pages/Saved';
import { Home } from './pages/Home';
import Search from './pages/Search';
import { MapPage } from './pages/MapPage';
import { Feed } from './pages/Feed';
import { Nav2 } from './components/Nav2';
const Flickr = require('flickr-sdk');

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: null,
			lon: null,
			photos: [],
			spots: []
		};
	}

	//handles the latitude and longitude passed up from search.js
	//sets the latitude and longitude to state so this can then be passed down into Home.js for displaying
	locationHandler = (latitude, longitude) => {
		this.setState(
			{
				lat: latitude,
				lon: longitude,
				photos: [],
				spots: []
			},
			() => this.callApi()
		);
	};

	getDistance(lat, lon, destLat, destLon) {
		var radius = 6371; //radius of earth in km
		var dLat = (destLat - lat) * Math.PI / 180;
		var dLon = (destLon - lon) * Math.PI / 180;
		var a =
			0.5 -
			Math.cos(dLat) / 2 +
			Math.cos(lat * Math.PI / 180) * Math.cos(destLat * Math.PI / 180) * (1 - Math.cos(dLon)) / 2;
		var distance = radius * 2 * Math.asin(Math.sqrt(a));

		return distance;
	}

	//loop through the array of photos and compare each photo's lat and lon against each other
	generateSpots(num) {
		let spots = [];
		for (var i = 0; i < this.state.photos.length; i++) {
			let temp = [];
			for (var k = i + 1; k < this.state.photos.length; k++) {
				if (
					//if the lat and lon are within 0.002 either side of the point, they will both be added to the spot
					//0.002 is an arbitrary number, it was just what I felt created the best "spots"
					this.state.photos[i].lat > this.state.photos[k].lat - 0.003 &&
					this.state.photos[i].lat < this.state.photos[k].lat + 0.003 &&
					this.state.photos[i].lon > this.state.photos[k].lon - 0.003 &&
					this.state.photos[i].lon < this.state.photos[k].lon + 0.003
				) {
					temp.push(this.state.photos[k]);
					this.state.photos.splice(k, 1);
				}
			}
			temp.push(this.state.photos[i]);
			spots.push(temp);
		}

		this.setState({
			spots: spots
		});

		console.log('state.spots: ' + this.state.spots);
	}

	callApi = async () => {
		console.log('call api');
		const flickr = new Flickr('9ba1c445f9135aecfdaaef4d933b008e');
		const per_page = 249; //use this value to set the number of photos to search for

		var number = 1;

		flickr.photos //searching for photos near the inputted latitude and longitude
			.search({
				has_geo: '1',
				lat: this.state.lat,
				lon: this.state.lon,
				radius: '3',
				radius_units: 'km',
				content_type: '1',
				safe_search: '1',
				per_page: per_page,
				page: 1
			})
			.then((res) => {
				//using the response to get the location of each individual phot
				res.body.photos.photo.forEach((photo) => {
					flickr.photos.geo
						.getLocation({
							photo_id: photo.id,
							format: 'json'
						})
						.then((res) => {
							//give each photo their lat and lon
							photo.lat = JSON.parse(res.body.photo.location.latitude);
							photo.lon = JSON.parse(res.body.photo.location.longitude);

							//generate the distance between the search lat and lon and each photo and store it in the photo object
							photo.distance = this.getDistance(
								this.state.lat,
								this.state.lon,
								photo.lat,
								photo.lon
							).toFixed(2);

							//add each photo to photos in state
							this.setState((prevState) => ({
								photos: [ ...prevState.photos, photo ]
							}));

							//only generate spots when the length of the photos array is equal to the number of photos we searched the API for
							if (this.state.photos.length === per_page) {
								this.generateSpots(number);
							}
						})
						//catch any errors
						.catch(function(err) {
							console.log('Error in photo.geo.getlocation: ', err);
						});
				});
			})
			//catch any errors
			.catch(function(err) {
				console.log('Error in flickr.photos.search', err);
			});
	};

	render() {
		return (
			<Router hashType="slash">
				<div>
					<MainNav />
					<Switch>
						<Route exact path="/">
							<Home lat={this.state.lat} lon={this.state.lon} />
						</Route>
						<Route path="/saved">
							<Saved lat={this.state.lat} lon={this.state.lon} />
						</Route>
						<Route path="/search">
							<Search handler={this.locationHandler} />
						</Route>
						<Route path="/map">
							<MapPage spots={this.state.spots} lat={this.state.lat} lng={this.state.lon} />
						</Route>
						<Route path="/feed">
							<Feed
								lat={this.state.lat}
								lon={this.state.lon}
								photo={this.state.spots}
								callApi={() => this.callApi()}
							/>
						</Route>
					</Switch>
					<Nav2 />
				</div>
			</Router>
		);
	}
}

export default App;
