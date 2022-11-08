import axios from 'axios';
import React, { useState, createContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import loginAPI from '../../services/loginAPI';

function Login(props) {
    // set popup modal
    const [isShow, setIsShow] = useState(false);
    const handleClose = () => setShow(false);
    const [user, setUser] = useState([]);
    const show = props.show;
    // data lưu object của login
    const [data, setData] = useState({
      email: "",
      password: "",
    });
    // check validate email
    const [checkEmail, setCheckEmail] = useState(false);
    const [messageEmail, setMessageEmail] = useState("");
    // check validate password
    const [checkPassword, setCheckPassword] = useState(false);
    const [messagePassword, setMessagePassword] = useState("");
    
    // mounted thay đổi trạng thái cho re-render lại popup login
    useEffect(()=>{
        setIsShow(show); 
    }, [show])

    // test lấy dữ liệu input của email và password
    function handle(e) {
      let newData ={...data}
      newData[e.target.id] = e.target.value;
      setData(newData);
    }

    // hàm xử lý login
    function handleSubmit(e) {
      e.preventDefault();
      const Login = async () => {
        try {
          // gửi request và nhận response từ loginAPI
            const a = await loginAPI.Login({
                email: data.email,
                password: data.password,
            });
            if(a.status_code === 200) {
              localStorage.setItem('user', JSON.stringify(a.data));
              localStorage.setItem('token', JSON.stringify(a.access_token));
              alert("hello " + a.data.first_name + " " + a.data.last_name);
              window.location.reload();
            } else if(a.status_code == 401) {
              if(typeof a.data.email != 'undefined') {
                setCheckEmail(true);
                setMessageEmail(a.data.email);
              } else {
                setCheckEmail(false);
                setMessageEmail("");
              }

              if(typeof a.data.password != 'undefined') {
                setCheckPassword(true);
                setMessagePassword(a.data.password);
              } else {
                setCheckPassword(false);
                setMessagePassword("");
              }
              alert('login failed');
            }
            
        } catch (error) {
            alert("failed");
        }
    }
    Login();
    }
    
    return (
      // UI modal login
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
                  {
                    checkEmail ? 
                    <div className="alert alert-danger" role="alert">
                      {messageEmail}
                    </div> : ""
                  }
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" onChange={(e) => handle(e)} value={data.password} />
                  {
                    checkPassword ? 
                    <div className="alert alert-danger" role="alert">
                      {messagePassword}
                    </div> : ""
                  }
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