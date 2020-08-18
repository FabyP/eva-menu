import React,{useEffect, useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import './menu.css'

function LoadMenu(){

    const [categories, setCategories] = useState([]);

    const fetchCategories = async() => {
        await axios.get('http://localhost:9000/categories')
        .then(function (response) {
            setCategories(response.data);
            console.log(response.data);
            console.log(categories);
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    useEffect(() =>{
        fetchCategories();
    }, [])

    
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar-all">
        <Navbar.Brand href="#home" className="navbar-topic">Speisekarte</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                {categories.map(category => (
                    <Nav.Link /*href={'#' + category.name}*/ key={category._id}>{category.name}</Nav.Link>
                ))}
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