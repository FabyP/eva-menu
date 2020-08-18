import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'
import 'bootstrap/dist/css/bootstrap.min.css';
import './menu.css'

function LoadMenu(){

    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar-all">
        <Navbar.Brand href="#home" className="navbar-topic">Speisekarte</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="#vorspeisen">Vorpseisen</Nav.Link>
                <Nav.Link href="#salat">Salate</Nav.Link>
                <Nav.Link href="#Rumsteak">Rumsteak</Nav.Link>
                <Nav.Link href="#schnitzel">Schnizel</Nav.Link>
                <Nav.Link href="#dessert">Dessert</Nav.Link>
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Suchen</Button>
            </Form>
        </Navbar.Collapse>
        </Navbar>
    );
}
export default LoadMenu;