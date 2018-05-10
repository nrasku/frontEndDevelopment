import React from 'react';
import ReactTable from 'react-table';
import Customer from '../models/Customer';

import moment from 'moment';

export default class ClassList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {classes: []}
  }

  componentDidMount() {
    this.getClasses();
  }

  async getClasses() {
    let customer = await Customer.find(this.props.id)
    customer.id = this.props.id
    if (customer) {
        customer.classes().get()
        .then(response => {
          this.setState({
            classes: response[0].content
          })
          this.formatDate()
        }).catch(err => {
          console.error("Error caught while FETCHING: ", err);
        }) 
    } else {
      console.log("Could find customer")
    }

  }

  formatDate() {
    
  }


  render() {
    const columns = [
      {Header: 'Date', accessor: 'date',
              Cell: ({value}) => (
            <div>{value ? moment(value).format('MMMM Do YYYY, h:mm a') : ''}</div>
          )},
      {Header: 'Duration', accessor: 'duration'},
      {Header: 'Activity', accessor: 'activity'},
      {Header: 'Content', accessor: 'content'}
    ]

    console.log(this.props);

    return(
      <div style={{ padding: "20px" }}>
        <em>
          Current class enrollments
        </em>
        <br />
        <br />
        <ReactTable data={this.state.classes}
          columns={columns}
          defaultPageSize={3}
          showPagination={false}
          
        />
      </div>
    );
  }
}