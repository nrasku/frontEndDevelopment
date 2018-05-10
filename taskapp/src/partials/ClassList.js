import React from 'react';
import ReactTable from 'react-table';
import API from 'api-class';
import Customer from '../models/Customer';

const myApi = new API({ url:'https://customerrest.herokuapp.com/api' })


export default class ClassList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {classes: []}
  }

  componentDidMount() {
    myApi.createEntity({ name: 'customers' })
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
        }).catch(err => {
          console.error("Error caught while FETCHING: ", err);
        }) 
    } else {
      console.log("Could find customer")
    }

  }


  render() {
    const columns = [
      {Header: 'Date', accessor: 'date'},
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