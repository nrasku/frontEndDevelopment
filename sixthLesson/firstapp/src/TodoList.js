import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class TodoList extends React.Component {

	render() {
		const columns = [{
					Header: 'Date',
					accessor: 'date' 
				}, {
					Header: 'Description',
					accessor: 'description',
				}]
		return(
			<div className="App">
				<ReactTable data={this.props.todos} columns={columns} sortable='true'defaultPageSize='10' />
			</div>
		);
	}
}

