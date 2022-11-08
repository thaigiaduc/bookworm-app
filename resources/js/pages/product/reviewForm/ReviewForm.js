import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Row, Col, Card, Dropdown, Form, Alert} from 'react-bootstrap';
import productAPI from '../../../services/productAPI';
import queryString from 'query-string';
import { isEmpty } from 'lodash';
function ReviewForm() {
    // lấy ra id trên url thông qua route
    const id = useParams();
    // navigate trong react-router-dom dùng cho redirect sang url chỉ định
    const navigate = useNavigate();
    // state object chứa dữ liệu review
    const [data, setData] = useState({
        review_title: "",
        review_details: "",
        rating_start: "1",
        book_id: id.id,
    });
    // state set trang thái alert và message
    const [alert, setAlert] = useState(null);
    const [message, setMessage] = useState({
        title_error: "",
        details_error: "",
        rating_start_error: "",
        book_id_error: "",
    });
    // state set trạng thái reload trang
    const [reload, setReload] = useState(false);
    // hàm add review
    function submit(e) {
        e.preventDefault();
        const Review = async () => {
            try {
                // truyền object sang productAPI và nhận về response
                const c = await productAPI.createReview({
                    review_title: data.review_title,
                    review_details: data.review_details,
                    rating_start: data.rating_start,
                    book_id: data.book_id
                });
                if(c.status_code !== 422) {
                    setAlert(true);
                    setMessage({...message, title_error: "", details_error: ""});
                    setReload(true);
                } else {
                    setAlert(false);
                    if(typeof c.data.review_title !== "undefined" && typeof c.data.review_details !== "undefined") {
                        setMessage({...message, title_error: c.data.review_title[0], details_error: c.data.review_details[0]});        
                    } else if(typeof c.data.review_title == "undefined" && typeof c.data.review_details !== "undefined") {
                        setMessage({...message, title_error: "", details_error: c.data.review_details[0]});
                    } else if(typeof c.data.review_title !== "undefined" && typeof c.data.review_details == "undefined") {
                        setMessage({...message, title_error: c.data.review_title[0], details_error: ""});
                    } else {
                        setMessage({...message, title_error: "", details_error: ""});
                    }     
                }        
            } catch (error) {
                console.log(error);
                navigate("/shop/product");
            }
        }
        Review();
    }

    // hàm in thông báo review thành công trong 5 giây và reload lại trang
    function AlertMessage(props) {
        useEffect(() => {
            function useTime() {
                props.reload ? window.location.reload() : null;
                clearTimeout(time);
            }
            const time = setTimeout(useTime, 5000);
        }, []);
        
        return (
            <Alert variant={props.variant} key={props.variant}>
                {props.message}
            </Alert>
        );
    }

    // test lấy dữ liệu input
    function handle(e) {
        let newData ={...data}
        newData[e.target.id] = e.target.value;
        setData(newData);
    }
    return (
        // UI review form
        <Card>
              <Card.Header>
                <h2>Write a review</h2>
                {
                    alert === true ? <AlertMessage variant="success" message="Add review success" reload={reload} /> : "" 
                }
              </Card.Header>
              <Card.Body>
                <form onSubmit={(e) => submit(e)} method="POST">
                    <fieldset>
                        <div className="mb-3">
                        <label htmlFor="review_title" className="form-label">Add a title</label>
                        <input type="text" id="review_title" className="form-control" onChange={(e) => handle(e)} value={data.review_title} />        
                        </div>
                        {
                            message.title_error == "" ? "" : <AlertMessage variant="danger" message={message.title_error}  />  
                        }
                        <div className="mb-3">
                        <label htmlFor="review_details" className="form-label">Detail please! Your detail help other shoppers</label>
                        <input type="text" id="review_details" className="form-control" onChange={(e) => handle(e)} value={data.review_details} />
                        {
                            message.details_error == "" ? "" : <AlertMessage variant="danger" message={message.details_error}  /> 
                        }
                        </div>
                        <div className="mb-3">
                        <label htmlFor="rating_start" className="form-label">Select a rating star</label>
                        <select id="rating_start" className="form-select" onChange={(e) => handle(e)} value={data.rating_start}>
                            <option value="1">1 Star</option>
                            <option value="2">2 Star</option>
                            <option value="3">3 Star</option>
                            <option value="4">4 Star</option>
                            <option value="5">5 Star</option>
                        </select>
                        {
                            message.rating_start_error == "" ? "" : <AlertMessage variant="danger" message={message.rating_start_error}  /> 
                        }
                        </div>
                        <div className="mb-3">
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </fieldset>
                </form>
              </Card.Body>
            </Card>
    );
}

export default ReviewForm;