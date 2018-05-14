import React, { Component } from 'react';
import CustomersList from '../partials/CustomersList';
import Customer from '../models/Customer';
import AddCustomer from '../partials/AddCustomer';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'

import 'react-toastify/dist/ReactToastify.css';

class CustomersPage extends Component {

	constructor(props) {
		super(props)
		this.state = {customers: [], customer: ''}
	}

	componentDidMount() {
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
		    toast.success("Customer updated!", {
		      position: toast.POSITION.TOP_CENTER
		    });
		})
		.catch(err => {
			console.error("Error caught while UPDATING: ", err);
			toast.error("Error While updating car...", {
				position: toast.POSITION.TOP_CENTER
			})
		})
	}

	addCustomer = (customer) => {
        customer = new Customer(customer)
        customer.save()
        .then(response => {
        	this.getCustomers()
        	toast.success("Customer added!", {
		      position: toast.POSITION.TOP_CENTER
		    });
        }).catch(err => {
			console.error("Error caught while CREATING: ", err);
			toast.error("Error While creating customer...", {
				position: toast.POSITION.TOP_CENTER
			})
		})
	}

	deleteCustomer = async (id) => {
		let customer = await Customer.find(id)
		customer.id = id
		confirmAlert({ 
			title: 'Confirm to submit',
		      message: 'Are you sure you want to delete?',
		      buttons: [
		        {
		          label: 'Yes',
		          onClick: () => customer.delete()
								.then((response) => {
						        	this.getCustomers()
						        	toast.success("Customer deleted!", {
								      position: toast.POSITION.TOP_CENTER
								    });
						        }).catch(err => {
									console.error("Error caught while DELETING: ", err);
									toast.error("Error While deleting customer...", {
										position: toast.POSITION.TOP_CENTER
									})
								})
		        },
		        {
		          label: 'No',
		          onClick: () => toast.info("Customer was not deleted.", {
		          	position: toast.POSITION.TOP_CENTER
		          })
		        }
		      ]
		})
		
	}

	getId = (link) => {
		let parts = link.split('/');
		return parts[parts.length - 1];	
	}

	render() {
		return (
			<div>
				<h1>Customer Listing</h1>
				<div className="row">
					<AddCustomer addCustomer={this.addCustomer} /> 
				</div>
                <CustomersList customers={this.state.customers} updateCustomer={this.updateCustomer} deleteCustomer={this.deleteCustomer}
                getId={this.getId} />
			</div>
		);
	}
}

export default CustomersPage;