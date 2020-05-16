import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { MdFavorite, MdSearch, MdMap, MdCollections, MdHome } from 'react-icons/md';

export function Nav2() {
	return (
		<div>
			<Navbar expand="sm" className="mb-0 nav2">
				<Container>
					<Link to="/">
						<span className="navIconSearch">
							<MdHome />
						</span>
					</Link>
					<Link to="/feed">
						<span className="navIconSearch">
							<MdCollections />
						</span>
					</Link>
					<Link to="/map">
						<span className="navIconSearch">
							<MdMap />
						</span>
					</Link>
					<Link to="/search">
						<span className="navIconSearch">
							<MdSearch />
						</span>
					</Link>
					<Link to="/saved">
						<span className="navIconAbout">
							<MdFavorite />
						</span>
					</Link>
				</Container>
			</Navbar>
		</div>
	);
}
