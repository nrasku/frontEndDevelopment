import React, { Component } from 'react';

export default class ClassPage extends Component {

	constructor(props) {
		super(props)
		this.state = {customers: []}
	}

	componentDidMount() {
		this.getCustomers();
	}

	getClasses() {
		
	}

	render() {
		return (
			<div>
				<h1>Class Listings</h1>
			</div>
		);
	}
}