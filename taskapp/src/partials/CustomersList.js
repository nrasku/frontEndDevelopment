import React from 'react';
import ReactTable from 'react-table';
import { Button } from 'react-bootstrap';
import EditCustomer from '../components/EditCustomer';
import ClassList from '../partials/ClassList';

import 'react-table/react-table.css';

export default class CustomersList extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
		const columns = [
			{Header: 'First Name', accessor: 'firstname'},
			{Header: 'Last Name', accessor: 'lastname'},
			{Header: 'Address', accessor: 'streetaddress'},
			{Header: 'Postcode', accessor: 'postcode'},
			{Header: 'City', accessor: 'city'},
			{Header: 'Email', accessor: 'email'},
			{Header: 'Phone', accessor: 'phone'},
			{Header: "", accessor: "links",
			 filterable: false,
				Cell: ({value}) => (
					<Button bsStyle="danger"
							onClick = {() => { this.props.deleteCustomer(this.props.getId(value[0].href)) }}>Delete</Button>
					)},
			{Header: "", accessor: "links",
			 filterable: false,
				Cell: ({row, value}) => (<EditCustomer updateCustomer={this.props.updateCustomer} id={this.props.getId(value[0].href)} 
						customer={row} />)}
		]

		return (
			<div>
				<ReactTable data={this.props.customers}
					columns={columns} 
					className="-striped -highlight" 
					filterable
					SubComponent={row => (
				        <ClassList
				          customer={row.original.links[0].href}
				          id={this.props.getId(row.original.links[0].href)}
				          getId={this.props.getId}
				        />
				    )}
			    />
			</div>
		);
	}

}