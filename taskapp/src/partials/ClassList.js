import React from 'react';
import ReactTable from 'react-table';
import { Button } from 'react-bootstrap';
import Customer from '../models/Customer';
import Class from '../models/Class';
import AddClass from './AddClass';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; 

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
      console.log(toast)
      toast.success("Class added!", {
          position: toast.POSITION.TOP_CENTER
        });
    }).catch(err => {
      console.error("Error caught while CREATING: ", err);
      toast.error("Error While creating class...", {
        position: toast.POSITION.TOP_CENTER
      })
    })
  }

  deleteClass = async (id) => {
    let classToDelete = await Class.find(id)
    classToDelete.id = id
    confirmAlert({ 
      title: 'Confirm to submit',
          message: 'Are you sure you want to delete?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => classToDelete.delete()
                            .then((response) => {
                                  this.getClasses()
                                  toast.success("Class deleted!", {
                                              position: toast.POSITION.TOP_CENTER
                                            });
                                }).catch(err => {
                              console.error("Error caught while DELETING: ", err);
                              toast.error("Error while deleting class...", {
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