import React from 'react';
import { Row, Col, Card, Carousel, Container } from 'react-bootstrap';
import { MdFavoriteBorder } from 'react-icons/md';
import { ControlledCarousel } from '../components/ControlledCarousel';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class Feed extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			photo: [],
			update: 0
		};
	}
	//setting the state to the props so that we can modify the array
	UNSAFE_componentWillMount() {
		this.setState({
			spots: this.props.photo,
			buttons: new Array(this.props.photo.length).fill(false),
		});
	}

	//sort the spots from closest to furthest away
	handleSpot(spot) {
		if (localStorage.getItem(spot[0].id) === null) {
			localStorage.setItem(spot[0].id, JSON.stringify(spot));
		} else {
			localStorage.removeItem(spot[0].id);
		}
		this.setState({
			update: this.state.update+1
		})
	}
	
	checkSaved(spot) {
		if (!localStorage.getItem(spot[0].id)) {
			return '#2980b9';
		} else {
			return 'red';
		}
	}

	sortDist = () => {
		this.setState({
			photo: this.props.photo.sort((a, b) => parseFloat(a[0].distance) - parseFloat(b[0].distance))
		});
	};

	//sort the spots from most photos in a spot to least
	sortPop = () => {
		this.setState({
			photo: this.props.photo.sort((a, b) => parseFloat(b.length) - parseFloat(a.length))
		});
	};

	componentDidMount() {
		document.title = 'ShotHub | Feed';
	}

	render() {
		return (
			<Container className="containerMain">
				{this.props.lat ? this.props.isLoading ? (
					<Spinner className="feed-spinner" animation="border" variant="primary" />
				) : (
					<div>
						<Row className="mainHeader">
							<Col md={6} className="left">
								<p className="mb-3 mt-3">
									<strong>Lat: </strong>
									{this.props.lat}
									<br />
									<strong>Lon: </strong>
									{this.props.lon}
								</p>
							</Col>
							{/*Clickables to sort the spots using the above callback functions*/}
							<Col sm={12} md={6} className="right">
								<p className="pt-2 mt-3">
									<strong>Sort by: </strong>
									<button type="button" className="menuButton" onClick={() => this.sortDist()}>
										Distance
									</button>{' '}
									|{' '}
									<button type="button" className="menuButton" onClick={() => this.sortPop()}>
										Popularity
									</button>
								</p>
							</Col>
						</Row>
						<Row className="check justify-content-between">
							{this.props.photo.map((spot, i) => {
								//mapping each picture to a card which takes up a third of the screen on pc and 100% of the screen on mobile
								return (
									<Card as={Col} key={i} md={6} lg={3} sm={12}>
										{(() => {
											return (
												<Carousel fade="true" interval="100000000000000000">
													{spot.map((photo, k) => {
														let className;
														if (photo === this.props.photo[0]) {
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

										<Card.Body>
											<Card.Text className="d-flex align-items-center flex-column">
												<strong>Distance: </strong>
												{spot[0].distance}km{' '}
												{/*Display the distance between each spot and where the user searched */}
												<br />
												<strong>Popularity: </strong> {spot.length} photos in this spot{' '}
												{/*Popularity is judged by the number of photos in the spot */}
												<br />
												<button
													ref={this.btn}
													style={{'color': this.checkSaved(this.props.photo[i])}}
													className="saveButton menuButton"
													onClick={() => this.handleSpot(this.props.photo[i])}
												>
													<MdFavoriteBorder />
												</button>
											</Card.Text>
										</Card.Body>
									</Card>
								);
							})}
						</Row>
					</div>
				) : (
					<div>
						<br />
						<br />
						<h2>Your need to search to view the feed!</h2>
						<h4>
							Go to <Link to="/search">Search</Link>
						</h4>
					</div>
				)}
			</Container>
		);
	}
}
