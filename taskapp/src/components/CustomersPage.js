import React, { Component } from 'react';
import CustomersList from '../partials/CustomersList';
import API from 'api-class';

const myApi = new API({ url:'https://customerrest.herokuapp.com/api' })

class CustomersPage extends Component {

	constructor(props) {
		super(props)
		this.state = {customers: []}
	}

	componentDidMount() {
		myApi.createEntity({ name: 'customers' })
		this.getCustomers();
	}

	getCustomers() {
		myApi.endpoints.customers.getAll()
			.then( response => {
					this.setState({
						customers: response.data.content
					});
				});
	}

	updateCustomer = (customer) => {
		myApi.endpoints.customers.update(customer)
		this.getCustomers()
	}

	render() {
		return (
			<div>
				<h1>Customer Listing</h1>
                <CustomersList customers={this.state.customers} updateCustomer={this.updateCustomer} />
			</div>
		);
	}
}

export default CustomersPage;