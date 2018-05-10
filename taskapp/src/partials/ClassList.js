import React from 'react';
import ReactTable from 'react-table';
import { Button } from 'react-bootstrap';
import Customer from '../models/Customer';
import Class from '../models/Class';
import AddClass from './AddClass';

import moment from 'moment';

export default class ClassList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {classes: []}
    this.getClasses = this.getClasses.bind(this);
  }

  componentDidMount() {
    this.getClasses();
  }

  getClasses = async () => {
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

  addClass = (newClass) => {
    newClass = new Class(newClass)
    console.log(newClass)
    newClass.save()
    .then(response => {
      this.getClasses()
    }).catch(err => {
      console.error("Error caught while CREATING: ", err);
    })
  }

  deleteClass = async (id) => {
    let classToDelete = await Class.find(id)
    classToDelete.id = id
    console.log(classToDelete)
    classToDelete.delete()
    .then((response) => {
          this.getClasses()
        }).catch(err => {
      console.error("Error caught while DELETING: ", err);
    })
  }

 

  render() {
    const columns = [
      {Header: 'Date', accessor: 'date',
              Cell: ({value}) => (
            <div>{value ? moment(value).format('MMMM Do YYYY, h:mm a') : ''}</div>
          )},
      {Header: 'Duration', accessor: 'duration'},
      {Header: 'Activity', accessor: 'activity'},
      {Header: 'Content', accessor: 'content'},
      {Header: "", accessor: "links",
       filterable: false,
        Cell: ({value}) => (
          <Button bsStyle="danger"
              onClick = {() => { this.deleteClass(this.props.getId(value[0].href))}}>Delete</Button>
          )},
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
          
        />
        <div className="row">
          <AddClass addClass={this.addClass} customerLink={this.props.customer} /> 
        </div>
      </div>
    );
  }
}