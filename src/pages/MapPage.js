import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import { ControlledCarousel } from '../components/ControlledCarousel';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import {Link} from 'react-router-dom';

export class MapPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			lng: '',
			lat: '',
			zoom: 13
		};
	}

	UNSAFE_componentWillMount() {
		this.setState({
			lng: this.props.lng,
			lat: this.props.lat
		});	
	}

	componentDidMount(){
		document.title = 'ShotHub | Map';
	}

	render() {
		return (
			<div>
				{this.state.lat ? (
					<Map className="map" center={[ this.state.lat, this.state.lng ]} zoom={this.state.zoom}>
						<TileLayer
							attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors &copy; <a href=&quot;https://carto.com/attributions&quot;>CARTO</a>"
							url={'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'}
							subdomains="abcd"
							maxZoom="19"
						/>

						{this.props.spots.map((spot, i) => {
							return (
								<Marker key={i} position={[ spot[0].lat, spot[0].lon ]}>
									<Popup>
										{(() => {
											return (
												<Carousel
													className="popupImg"
													fade="true"
													interval="100000000000000000"
												>
													{spot.map((photo, k) => {
														let className;
														if (photo === this.props.spots[0]) {
															className = 'active';
														} else {
															className = '';
														}
														return (
															<ControlledCarousel
																key={k}
																photo={photo}
																className={className}
															/>
														);
													})}
												</Carousel>
											);
										})()}
									</Popup>
								</Marker>
							);
						})}
					</Map>
				) : (
					<Container className="containerMain">
                    <div>
						<br />
						<br />
						<h2>Your need to search to view the map!</h2>
						<h4>Go to <Link to="/search">Search</Link></h4>
					</div>
					</Container>
				)}
			</div>
		);
	}
}
