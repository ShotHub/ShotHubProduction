import React from 'react';
import { Container, Carousel, Card, Col } from 'react-bootstrap';
import homeSpots from '../components/homeSpots.json';
import { ControlledCarousel } from '../components/ControlledCarousel';
import background4 from '../images/background4.jpg';
import Logo from '../images/logo-white.png';
import { MdKeyboardArrowDown } from 'react-icons/md';
import FadeIn from 'react-fade-in';
import CarouselCaption from 'react-bootstrap/CarouselCaption';
var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;
var scroller = Scroll.scroller;

export class Home extends React.Component {
	componentDidMount() {
		document.title = 'ShotHub | Home';
	}

	scrollHandler() {
		scroller.scrollTo('scrollTo', {
			duration: 1000,
			smooth: true,
			offset: 10
		});
	}

	render() {
		const images = [
			[ 'https://live.staticflickr.com/5549/31018313350_7d76655473_h.jpg', 'Roman Baths, Bath' ],
			[ 'https://live.staticflickr.com/65535/49049277981_a22a28e11d_h.jpg', 'Lake District, Cumbria' ],
			[ 'https://live.staticflickr.com/4468/37352372540_5a09d007f5_h.jpg', 'Winchester Cathedral, Winchester' ],
			[ 'https://live.staticflickr.com/65535/49768288488_38c7853457_h.jpg', 'Eden Project, Cornwall' ],
			[ 'https://live.staticflickr.com/65535/49414885632_3c7802b5b3_h.jpg', 'York Minster, York' ],
			[ 'https://live.staticflickr.com/5125/5294713338_417002f65c_h.jpg', 'Stone Henge, Salisbury' ],
			[ 'https://live.staticflickr.com/2429/32973015625_d09cb603bb_h.jpg', 'Canterbury Cathedral, Canterbury' ],
			[ 'https://live.staticflickr.com/4539/27272052809_93c730a613_h.jpg', 'Durdle Door, Dorset' ]
		];

		return (
			<div>
				<div className="containerHome" id="homeDiv1">
					<FadeIn childClassName="homeLogo" transitionDuration="1000">
						<img src={Logo} alt="ShotHub" className="homeLogo" />
					</FadeIn>

					<button className="homeButton" onClick={this.scrollHandler}>
						<MdKeyboardArrowDown />
					</button>
				</div>
				<div name="scrollTo" className="containerHome" id="homeDiv2">
					<h2 id="homeh2">Discover the best photo spots the UK has to offer</h2>
					<button className="homeButton" onClick={this.scrollHandler}>
						<MdKeyboardArrowDown />
					</button>
				</div>
				<div className="containerHome" id="homeDiv3">
					<Carousel>
						{images.map((image, i) => {
							return (
								<Carousel.Item key={i}>
									<img src={image[0]} alt={image[1]} className="homeCarouselImg" />
									<Carousel.Caption>{image[1]}</Carousel.Caption>
								</Carousel.Item>
							);
						})}
					</Carousel>
				</div>
			</div>
		);
	}
}

/*
<br />
				<h5>
					ShotHub is a tool designed <br />
					to help photographers find popular <br />
					nearby photo spots.<br />
					<br />
					<br />
					Go to Search to find your own spots!
				</h5>
				<h2>Our Favourite Spots</h2>






<div className="outerCarousel">
					<Carousel
						className="outerCarousel"
						pause="hover"
						controls={false}
						interval="5000"
						indicators="false"
					>
						{homeSpots.map((spot, i) => {
							return (
								<Carousel.Item>
									<Card key={i}>
										{(() => {
											return (
												<Carousel
													className="innerCarousel"
													fade="true"
													interval="100000000000000000"
												>
													{spot.map((photo, k) => {
														let className;
														if (photo === homeSpots[0]) {
															className = 'active';
														} else {
															className = '';
														}
														return (
															<ControlledCarousel
																as={Col}
																md={{ span: 8, offset: 3 }}
																sm={12}
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
											<Card.Title>Hello</Card.Title>
											<Card.Text>Hello</Card.Text>
										</Card.Body>
									</Card>
								</Carousel.Item>
							);
						})}
					</Carousel>
				</div>
				*/
