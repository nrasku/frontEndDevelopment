import React, { Component } from 'react';
import CustomersList from '../partials/CustomersList';
import API from 'api-class';
import Customer from '../models/Customer';

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
		Customer.get()
			.then( response => {
					this.setState({
						customers: response[0].content
					});
			}).catch(err => {
			console.error("Error caught while FETCHING: ", err);
		})
	}

	updateCustomer = (customer) => {
		customer = new Customer(customer)
		customer.save()
		.then( response => {
		    this.getCustomers()
		})
		.catch(err => {
			console.error("Error caught while FETCHING: ", err);
		})
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