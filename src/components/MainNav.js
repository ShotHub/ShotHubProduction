import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import LogoDark from '../images/Logo-Blue.png';
import { MdFavorite, MdSearch, MdMap, MdCollections } from 'react-icons/md';

export function MainNav() {
	return (
		<div>
			<Navbar expand="sm" className="mb-0 mainNav">
				<Container>
					<Link to="/feed">
						<span className="navText">Feed</span>
						<span className="navIconSearch">
							<MdCollections />
						</span>
					</Link>
					<Link to="/map">
						<span className="navText">Map</span>
						<span className="navIconSearch">
							<MdMap />
						</span>
					</Link>
					<a>
						<span className="navText">
							<img className="logoNav justify-content-center" src={LogoDark} alt="ShotHub" />
						</span>
					</a>
					<Link to="/search">
						<span className="navText">Search</span>
						<span className="navIconSearch">
							<MdSearch />
						</span>
					</Link>
					<Link to="/saved">
						<span className="navText">Saved</span>{' '}
						{/*Using spans to show/hide text/icons based on the size of the viewport */}
						<span className="navIconAbout">
							<MdFavorite />
						</span>
					</Link>
				</Container>
			</Navbar>
		</div>
	);
}
