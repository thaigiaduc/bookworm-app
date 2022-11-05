import { Link, NavLink } from 'react-router-dom';
import React, { useState, createContext } from 'react';
import '../App.css';
import Container from 'react-bootstrap/Container';
import Login from '../pages/login/Login';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Header() {
  const [show, setShow] = useState(false);
  
  const handleShow = () => setShow(true);
  
    return ( 
        <header className="App-header">
            <Navbar collapseOnSelect fixed='top' expand="lg" bg="light" variant="light">
              <Container fluid>
                <Navbar.Brand as={Link} to="/"><img src="../../assets/bookworm_icon.svg"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <NavLink  className={({ isActive }) =>
                      isActive ? 'activeClass' : 'bg-red-500 font-thin nav-link'
                    } to="/home">
                      Home
                    </NavLink>
                    <NavLink className={({ isActive }) =>
                      isActive ? 'activeClass' : 'bg-red-500 font-thin nav-link'
                    } to="/shop">
                      Shop
                    </NavLink>
                    <NavLink  className={({ isActive }) =>
                      isActive ? 'activeClass' : 'bg-red-500 font-thin nav-link'
                    } to="/about">
                      About
                    </NavLink>
                    <NavLink className={({ isActive }) =>
                      isActive ? 'activeClass' : 'bg-red-500 font-thin nav-link'
                    } to="/cart">
                      Cart (3)
                    </NavLink>
                    <Nav.Link>
                      <Login 
                        text = {"sign in"}
                      />
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>

            <Login 
              show = {show}
              text = {"sign in"}
            />
        </header>
    );
}

export default Header;