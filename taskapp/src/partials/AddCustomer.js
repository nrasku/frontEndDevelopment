import React, { Component } from 'react';
import SkyLight from 'react-skylight';

export default class AddCar extends Component {

	constructor(props) {
		super(props);

		this.state = {firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''};
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const newCustomer = {
			firstname: this.state.firstname,
			lastname: this.state.lastname,
		 	streetaddress: this.state.streetaddress,
			postcode: this.state.postcode,
			city: this.state.city,
			email: this.state.email,
			phone: this.state.phone,
		}

		this.props.addCustomer(newCustomer);
		this.simpleDialog.hide();
	}

	render() {
		return (
			<div>
				 <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Provide information for the new car">
		          <form>
		          	<div className="form-group">
		          		<input placeholder="First Name" value={this.state.firstname} className="form-control" 
		          		name="firstname" onChange={this.handleChange} ></input>
		          	</div>
		          	<div className="form-group">
		          		<input placeholder="Last Name" value={this.state.lastname} className="form-control" 
		          		name="lastname" onChange={this.handleChange} ></input>
		          	</div>
		          	<div className="form-group">
		          		<input placeholder="Street Address" value={this.state.streetaddress} 
		          		className="form-control" name="streetaddress" onChange={this.handleChange} ></input>
		          	</div>
		          	<div className="form-group">
		          		<input placeholder="Postcode" value={this.state.postcode} className="form-control" 
		          		name="postcode" onChange={this.handleChange} ></input>
		          	</div>
		          	<div className="form-group">
		          		<input placeholder="City" value={this.state.city} className="form-control"  
		          		name="city" onChange={this.handleChange} ></input>
		          	</div>
		          	<div className="form-group">
		          		<input placeholder="Email" value={this.state.email} className="form-control"  
		          		name="email" onChange={this.handleChange} ></input>
		          	</div>
		          	<div className="form-group">
		          		<input placeholder="Phone" value={this.state.phone} className="form-control"  
		          		name="phone" onChange={this.handleChange} ></input>
		          	</div>
		          	<button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
		          </form>
		        </SkyLight>
		        <button style={{margin: 10}} className="btn btn-primary" onClick={() => this.simpleDialog.show() }>Add</button>
			</div>
		);
	}
}