import axios from 'axios';
import React, { useState, createContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Login(props) {
    const [isShow, setIsShow] = useState(false);
    const handleClose = () => setShow(false);
    const [user, setUser] = useState([]);
    const show = props.show;
    useEffect(()=>{
        setIsShow(show);
        // axios.post('http://localhost:8000/api/session')
        // .then(res => {
        //     setUser(res.data);
        // })
        // .catch(error => console.log(error));
    }, [show])

    // function handleLogin() {
        
    // }

    return (
        <React.Fragment >
            <span onClick={ ()=> (setIsShow(true))}>{props.text}</span>
            <Modal show={isShow} onHide={ () => (setIsShow(false))}>
              <Modal.Header closeButton>
                <Modal.Title>Sign in</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form method="post" >
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      name="email"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                   <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="********"
                      autoFocus
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={()=>(setIsShow(false))}>
                  Close
                </Button>
                <Button variant="primary" >
                  Sign up
                </Button>
              </Modal.Footer>
            </Modal>
        </React.Fragment>
        
    );
}

export default Login;