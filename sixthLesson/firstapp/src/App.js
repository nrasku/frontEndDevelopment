import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
   constructor(props) {
    super(props);
    this.state = {description: '', date: '', todos: []}
  }

  inputChanged = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  addTodo = (event) => {
    event.preventDefault();
    this.setState({
      todos: [...this.state.todos, { description: this.state.description, date: this.state.date } ]
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Simple Todolist</h2>
        </div>
        <div>
          <form onSubmit={this.addTodo}>
            <label>Date</label><input name="date" type="text" onChange={this.inputChanged} value={this.state.date}/>
            <label>Description</label><input name="description" type="text" onChange={this.inputChanged} value={this.state.description}/>
            <input type="submit" value="Add"/>
          </form>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <table>
            <tbody>
              <tr><th>Date</th><th>Description</th></tr>
              {this.state.todos.map((item, index) => 
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.description}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>          
      </div>    
    );
  }

}

export default App;
