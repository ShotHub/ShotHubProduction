import React from 'react';
import { Container, Col, Row, Carousel, Card } from 'react-bootstrap';
import { ControlledCarousel } from '../components/ControlledCarousel';
import { MdDeleteForever } from 'react-icons/md';

export class Saved extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			spots: [],

			log: [],
		};
	}

	componentDidMount() {
		document.title = 'ShotHub | Saved';
		for (let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i);

			this.setState((prevState) => ({
				spots: [ ...prevState.spots, JSON.parse(localStorage.getItem(key)) ]
			}));
		}
	}

	handleSpot(spot) {
		localStorage.removeItem(spot[0].id);

		var index = this.state.spots.indexOf(spot);
		var array = this.state.spots;
		array.splice(index, 1);
		this.setState({
			spots: array
		});
	}

	render() {
		return (
			<Container className="containerMain check">
			<div className="header">
				<h2>Saved Spots</h2>
				<br />
				</div>
				<div>
					{this.state.spots.length > 0 ? (
						<Row>
							{this.state.spots.map((spot, i) => {
								//mapping each picture to a card which takes up a third of the screen on pc and 100% of the screen on mobile
								return (
									<Card as={Col} key={i} md={3} sm={12}>
										{(() => {
											return (
												<Carousel fade="true" interval="100000000000000000">
													{spot.map((photo, k) => {
														let className;
														if (photo === this.state.spots[0]) {
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
											<Card.Text>
												<strong>Popularity: </strong> {spot.length} photos in this spot{' '}
												{/*Popularity is judged by the number of photos in the spot */}
												<br />
												{console.log(JSON.parse(JSON.stringify(spot)))}
												<button
													ref={(btn) => {
														this.btn = btn;
													}}
													className="savedButton menuButton"
													onClick={() => this.handleSpot(this.state.spots[i])}
												>
													<MdDeleteForever />
												</button>
											</Card.Text>
										</Card.Body>
									</Card>
								);
							})}
						</Row>
					) : (
						<h4 className="savedHeading">You don't have any saved spots!</h4>
					)}
				</div>
			</Container>
		);
	}
}
