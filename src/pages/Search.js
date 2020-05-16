import React from 'react';
import Container from 'react-bootstrap/Container';
import { Form, Col, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			postcode: '',
			response: null,
			update: ''
		};
	}

	//acquire the users current location and pass it to the handler in App.js
	
	position = async () => {
		await navigator.geolocation.getCurrentPosition(
			(position) =>
				//pass data back to App.js
				this.props.handler(position.coords.latitude, position.coords.longitude),
		);
	};
	

	//handles when the text box is edited, storing it in state
	changeHandler = (event) => {
		this.setState({
			postcode: event.target.value
		});
	};

	//uses the postcode in state to get the latitude and longitude, and then passes this data to the handler in App.js
	handleSubmit = async (event) => {
		event.preventDefault();
		var postcode = encodeURI(this.state.postcode);

		await fetch('https://api.getthedata.com/postcode/' + postcode)
			.then((res) => res.json())
			.then((res) => {
				//console.log(res.body.data.latitude)
				this.setState({
					response: res
				});

				this.props.handler(JSON.parse(res.data.latitude), JSON.parse(res.data.longitude));
				this.props.history.push('/feed'); //return to the feed once the search has completed
			})
			.catch(function(err) {
				console.log(err);
			});
	};

	//calls position when the page is loaded
	componentDidMount(){
		document.title = 'ShotHub | Search';
		this.position();
	} 

	render() {
		return (
			<Container className="containerMain">	
				<h2>Search</h2>
				<p>Enter your postcode or share your current location to search for spots!<br /> Once done, return home to see your search results</p>
				<Form justify-content="center" className="pt-2" onSubmit={this.handleSubmit}>
					<Form.Row>
						<Form.Group as={Col} sm={{span:6, offset: 4}} md ={{span: 6, offset: 3}}>
							<Form.Control
								type="postcode"
								placeholder="Enter a postcode..."
								value={this.state.postcode}
								onChange={this.changeHandler}
							/>
						</Form.Group>
						</Form.Row>
						<Form.Row>
						<Form.Group as={Col} md={{span:2, offset:5}}>
							<Button className="justify-content-center" variant="primary" type="Submit">
								Search!
							</Button>
						</Form.Group>
					</Form.Row>
				</Form>
			</Container>
		);
	}
}

export default withRouter(Search);