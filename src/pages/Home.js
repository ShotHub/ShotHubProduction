import React from 'react';
import { Container } from 'react-bootstrap';

export function Home() {
	return (
		<Container className="containerMain">
			<div>
				<br />
				<br />
				<h5>
					ShotHub is a tool designed <br />
					to help photographers find popular <br />
					nearby photo spots.<br />
					<br />
					All you need to provide is <br />
					a location, and we do the rest.<br />
					<br />
					Go to Search to find photo spots!
				</h5>
			</div>
		</Container>
	);
}
