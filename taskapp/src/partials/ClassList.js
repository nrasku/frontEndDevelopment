import React from 'react';
import ReactTable from 'react-table';
import API from 'api-class';

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

  getClasses() {
    let query = `${this.props.id}/trainings`
    console.log(query)
    myApi.endpoints.customers.getAll(`${this.props.id}/trainings`)
      .then( response => {
          this.setState({
            classes: response.data.content
          });
        });
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
          SubComponent={row => {
            return (
              <div style={{ padding: "20px" }}>
                Another Sub Component!
              </div>
            );
          }}
        />
      </div>
    );
  }
}