import axios from 'axios';
import React, { useState, createContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import loginAPI from '../../services/loginAPI';
function Login(props) {
    const [isShow, setIsShow] = useState(false);
    const handleClose = () => setShow(false);
    const [user, setUser] = useState([]);
    const show = props.show;
    const [data, setData] = useState({
      email: "",
      password: "",
  });
  const [res, setRes] = useState(null);
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
    function handle(e) {
      let newData ={...data}
      newData[e.target.id] = e.target.value;
      setData(newData);
      
    }

    function handleSubmit(e) {
      e.preventDefault();
      const Login = async () => {
        try {
            const a = await loginAPI.Login({
                email: data.email,
                password: data.password,
            });
            alert("hello " + a.data.first_name + " " + a.data.last_name);
            if(a.status_code === 200) {
              localStorage.setItem('user', JSON.stringify(a.data));
              localStorage.setItem('token', JSON.stringify(a.access_token));
              window.location.reload();
            }
            
        } catch (error) {
            alert("failed");
        }
    }
    Login();
    }
    
    return (
        <React.Fragment >
            <span onClick={ ()=> (setIsShow(true))}>{props.text}</span>
            <Modal show={isShow} onHide={ () => (setIsShow(false))}>
              <Modal.Header closeButton>
                <Modal.Title>Sign in</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <form method="POST">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={(e) => handle(e)} value={data.email} />
                  {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" onChange={(e) => handle(e)} value={data.password} />
                </div>
              </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={()=>(setIsShow(false))}>
                  Close
                </Button>
                <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                  Sign up
                </Button>
              </Modal.Footer>
            </Modal>
        </React.Fragment>
        
    );
}

export default Login;