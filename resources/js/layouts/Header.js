import { Link, NavLink } from 'react-router-dom';
import React, { useState, createContext, useEffect } from 'react';
import '../App.css';
import Container from 'react-bootstrap/Container';
import Login from '../pages/login/Login';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import NavDropdown from 'react-bootstrap/NavDropdown';
import loginAPI from '../services/loginAPI';

function Header() {
  const [show, setShow] = useState(false);
  const [fullName, setFullName] = useState("");
  const [checkLogin, setCheckLogin] = useState(false);
  const handleShow = () => setShow(true);
  const [quantityProduct, setQuantityProduct] = useState(0);
  
  useEffect(() => {
    
    const arr = JSON.parse(localStorage.getItem('cart'));
    if(arr) {
      setQuantityProduct(arr.length);
    }
    
    // setQuantityProduct(test);
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if(userInfo){
        setCheckLogin(true);
        setFullName(userInfo.first_name + " " + userInfo.last_name);
    }
  }, []);

  
  function handleLogout() {
    const Logout = async () => {
      try {
          const b = await loginAPI.Logout();
          if(b.status_code === 204){
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              setCheckLogin(false);
              setFullName("");
          }
      } catch (error) {
          console.log(error);
      }
  }
  Logout();
  }
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
                      Cart ({quantityProduct})
                    </NavLink>
                    {
                        checkLogin ? 
                        <NavDropdown title={fullName} id="navbarScrollingDropdown">
                          <NavDropdown.Item onClick = {() => handleLogout()}>Logout</NavDropdown.Item>
                        </NavDropdown> :
                      <Nav.Link>
                        <Login 
                          show = {show}
                          text = {"Sign In"}
                        />
                      </Nav.Link>
                    }
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>

            {/* <Login 
              show = {show}
              text = {"sign in"}
            /> */}
        </header>
    );
}

export default Header;