import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
	render() {
		return(
			<Navbar>
			  <Navbar.Header>
			    <Navbar.Brand>
			      <Link to='/'>Home</Link>
			    </Navbar.Brand>
			  </Navbar.Header>
			  <Nav>
			    <NavItem eventKey={1} href="#">
			      <Link to='customers'>Customer List</Link>
			    </NavItem>
			    <NavItem eventKey={2} href="#">
			      <Link to='classes'>Class List</Link>
			    </NavItem>
			  </Nav>
			</Navbar>
		);
	}
}