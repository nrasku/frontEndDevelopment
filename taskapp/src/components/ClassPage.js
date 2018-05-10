import React, { Component } from 'react';
import API from 'api-class';

const myApi = new API({ url:'https://customerrest.herokuapp.com/api' })

export default class ClassPage extends Component {

	constructor(props) {
		super(props)
		this.state = {customers: []}
	}

	componentDidMount() {
		myApi.createEntity({ name: 'classes' })
		this.getCustomers();
	}

	getClasses() {
		myApi.endpoints.customers.getAll()
			.then( response => {
					this.setState({
						customers: response.data.content
					});
				});
	}

	render() {
		return (
			<div>
				<h1>Class Listings</h1>
			</div>
		);
	}
}