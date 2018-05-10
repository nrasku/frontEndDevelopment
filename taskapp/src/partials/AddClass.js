import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import moment from 'moment';
import DateTime from 'react-datetime';

export default class AddClass extends Component {

	constructor(props) {
		super(props);

		this.state = {date: moment(), duration: '', activity: ''};
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	dateChange = date => {
		this.setState({ 
			date: date._d
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const newClass = {
			date: this.state.date,
			duration: this.state.duration,
		 	activity: this.state.activity,
		 	customer: this.props.customerLink
		}

		this.props.addClass(newClass);
		this.simpleDialog.hide();
	}

	render() {

		return (
			<div>
				 <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Provide information for the new class">
		          <form>
		          	<div className="form-group">
		          		<DateTime inputProps={{ name: 'date' }} onChange={this.dateChange}/>
		          	</div>
		          	<div className="form-group">
		          		<input placeholder="Duration" value={this.state.duration} className="form-control" 
		          		name="duration" onChange={this.handleChange} ></input>
		          	</div>
		          	<div className="form-group">
		          		<input placeholder="Activity" value={this.state.activity} 
		          		className="form-control" name="activity" onChange={this.handleChange} ></input>
		          	</div>
		          	
		          	<button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
		          </form>
		        </SkyLight>
		        <button style={{margin: 10}} className="btn btn-primary" onClick={() => this.simpleDialog.show() }>Add</button>
			</div>
		);
	}
}