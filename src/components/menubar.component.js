import React, { Component } from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import LoginButton from "./login-button.component";
import LogoutButton from "./logout-button.component";
export default class Menubar extends Component {

    render() {
        return (
            <Navbar bg="light" varint="light" expand="lg">
                <Navbar.Brand href="/" >Essay Editor</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                        <Nav.Link href="/">Essays</Nav.Link>
                        <Nav.Link href="/create">Create Essay</Nav.Link>
                        <Nav.Link href="/user" >Create User</Nav.Link>
                        <LoginButton />
                        <LogoutButton />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}