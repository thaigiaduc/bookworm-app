import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Container, Button, Row, Col, Card, Dropdown, Form} from 'react-bootstrap';
import '../App.css';
import ReactPaginate from 'react-paginate';
import { useParams, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
function Product() {
  const id = useParams();

  const [productDetails, setProductDetails] = useState([]);
  const [reviewDetails, setReviewDetails] = useState([]);
  const [ratingStart, setRatingStart] = useState(0);
  const [total, setTotal] = useState(0);
  // số sản phẩm 1 trang 
  const [perPage, setPerPage] = useState(0);
  // trang cuối
  const [lastPage, setLastPage] = useState(0);
  // trang đầu
  const [from, setFrom] = useState(0);
  // trang cuối
  const [to, setTo] = useState(0);
  const [quantity, setQuantity] = useState(1);
  // paginate
  const [currentItems, setCurrentItems] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const [titleDay, setTitleDay] = useState("Sort by Date: newest to oldest");
  const [filter, setFilter] = useState({
    sortbyday: 'newest',
    page : 1
  })
  const [titleSort, setTitleSort] = useState("Sort by on sale");
  const navigate = useNavigate();
  const url = window.location.pathname;
  let reviewUrl = "/product"+"/review/";
  for(let x in id) {
    reviewUrl += id[x];
  }
  useEffect(() => {
    const queryParams = queryString.stringify(filter);
    const test = `http://localhost:8000/api${url}`; 
    console.log(test);
    axios.get(`http://localhost:8000/api${url}`)
    .then(res => {
      setProductDetails(res.data.data);
      setRatingStart(res.data.data[0].avg_rating);
    })
    .catch(error => navigate('/product'));

    axios.get(`http://localhost:8000/api${reviewUrl}?${queryParams}`)
    .then(res => {
      setReviewDetails(res.data.data);
      setTotal(res.data.total);
      setPerPage(res.data.per_page);
      setLastPage(res.data.last_page);
      setTo(res.data.to);
      setFrom(res.data.from);
    })
    .catch(error => console.log(error));
}, [filter,itemOffset]);

  const CardItemProduct = props => {
    return (
      <React.Fragment>
        <Row className="justify-content-md-center">
          <Col xs lg={11} id="title"><b>(Category Name) {props.category_name}</b></Col>
        </Row>
        <Row className="justify-content-md-center" style={{paddingTop: "50px", paddingBottom: "50px"}}>
          <Col xs lg={7}>
            <Card id="cardItemProduct">
              <Card.Body>
                <Row>
                  <Col xs lg={3}>
                    <Card.Img variant="top" src={props.book_cover_photo === null || props.book_cover_photo === 'null' ? "../assets/bookcover/bookCover.jpg" : "../assets/bookcover/"+props.book_cover_photo+".jpg"} />
                  </Col>
                  <Col xs lg={8}>
                    <Card.Title>{props.book_title}</Card.Title>
                    <Card.Text>
                      {props.book_summary}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Text>
                By (author) {props.author_name}
              </Card.Text>
            </Card>
            
          </Col>

          <Col xs lg={4}>
            <Card>
              <Card.Header>
                {
                  (props.book_price == props.final_price) ? <h2>{"$"+props.final_price}</h2> : <h2><del style={{marginRight: "10px"}}>{"$"+props.book_price}</del>{"$"+props.final_price}</h2>
                }
              </Card.Header>
              <Card.Body>
                <Row className="justify-content-md-center text-center">
                  <Col>
                    <Card.Text>
                      Quantity
                    </Card.Text>
                    <Row className="justify-content-md-center text-center"> 
                      <Col xs lg={8}>
                        <div style={{border: "1px solid"}}>
                          <button style={{border: "none", fontSize: "20px"}} onClick = { () => (setQuantity(quantity-1)) }><i className="fas fa-minus"></i></button>
                          <span style={{fontSize: "20px"}}>{quantity} </span>
                          <button style={{border: "none", fontSize: "20px"}} onClick = { () => (setQuantity(quantity+1)) }><i className="fas fa-plus"></i></button>
                        </div>
                      </Col>
                    </Row>
                    <Row className="justify-content-md-center text-center">
                      <Col xs lg={8}>
                        <button>Add to cart</button>
                      </Col>
                    </Row>                  
                  </Col>
                </Row>
                
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
      
    );
  }

  const ReviewProductDetails = props => {
    return (
      <Card>
        <Card.Body>
          <Row>
            <Col xs lg={11}>
              <Card.Title>{props.review_title} | {props.rating_start} starts</Card.Title>
            </Col>
          </Row>
          <Row>
            <Col xs lg={11}>
              <Card.Text>{props.review_details}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col xs lg={11}>
              <Card.Text>{props.review_date}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>     
    );
  }

  function ReviewProduct() {
    return (
      <React.Fragment>
        <Row className="justify-content-md-center">
          <Col xs lg={7}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs lg={5}>
                    <Card.Title>Customer Review (filtered by 5 star)</Card.Title>
                  </Col>
                  <Col xs lg={6}></Col>
                </Row>
                <Row>
                  <Col xs lg={11}>
                    <Card.Text>{ratingStart} Star</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col xs lg={11}>
                    <Card.Text>
                        <u style={{paddingRight: "15px"}}>({total})</u>     
                        <u>5 star ()</u> | <u>4 star () </u> | <u>3 star ()</u> | <u>2 star ()</u> | <u>1 star ()</u></Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col xs lg={4}>
                    <Card.Text>Showing {from}-{to} of {total} reviews</Card.Text>
                  </Col>
                  <Col xs lg={2} style={{width: "auto"}}>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                        {titleDay}
                      </Dropdown.Toggle>
                      <Dropdown.Menu variant="light">
                        <Dropdown.Item 
                            onClick = {() => (
                                setFilter({...filter, page: 1, sortbyday: 'asc'}),
                                setTitleSort("Sort by Date: newest to oldest"),
                                setCurrentItems(0)
                            )}
                        >
                            Sort by Date: newest to oldest
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onClick = {() => (
                                setFilter({...filter, page: 1,sortbyday: 'desc'}),
                                setTitleSort("Sort by Date: oldest to newest"),
                                setCurrentItems(0)
                            )}
                        >
                            Sort by Date: oldest to newest
                        </Dropdown.Item>
                              
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col xs lg={2}>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                        Show {perPage}
                      </Dropdown.Toggle>
                      <Dropdown.Menu variant="light">
                        <Dropdown.Item 
                            onClick = {() => (
                                setFilter({...filter, page: 1,item_per_page: 5}),
                                setCurrentItems(0)
                            )}
                        >
                          Show 5
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onClick = {() => (
                                setFilter({...filter, page: 1,item_per_page: 15}),
                                setCurrentItems(0)
                            )}
                        >
                          Show 15
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onClick = {() => (
                                setFilter({...filter, page: 1,item_per_page: 20}),
                                setCurrentItems(0)
                            )}
                        >
                          Show 20
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onClick = {() => (
                                setFilter({...filter, page: 1,item_per_page: 25}),
                                setCurrentItems(0)
                            )}
                        >
                          Show 25
                        </Dropdown.Item>
                              
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </Card.Body>
                <Row>
                  <Col>
                    {
                      reviewDetails.map((item,index) => (
                        <ReviewProductDetails 
                          review_title = {item.review_title}
                          review_details = {item.review_details}
                          review_date = {item.review_date}
                          rating_start = {item.rating_start}
                          key = {index}
                        />
                      ))
                    }
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ReactPaginate
                                breakLabel="..."
                                nextLabel="Next >"
                                nextPageRel="null"
                                onPageChange={(event) => (
                                    setItemOffset((event.selected * perPage) % lastPage),
                                    setFilter({...filter, page: event.selected + 1}),
                                    setCurrentItems(event.selected)
                                )}
                                
                                pageCount={lastPage}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                breakClassName={'page-item'}
                                forcePage={currentItems}
                                breakLinkClassName={'page-link'}
                                containerClassName={'pagination'}
                                activeClassName={'active'}        
                                previousLabel="< Previous"
                                prevPageRel="null"
                                renderOnZeroPageCount={null}
                    />
                  </Col>
                </Row>
            </Card>
          </Col>
          
          <Col xs lg={4}>
            <Card>
              <Card.Header>
                <h2>Write a review</h2>
              </Card.Header>
              <Card.Body>
                <form method="get" action=''>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="review_title">Add a title</Form.Label>
                    <Form.Control id="review_title" name="review_title" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label  htmlFor="review_details">Detail please! Your detail help other shoppers</Form.Label>       
                    <Form.Control id="review_details" name="review_details" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Detail please! Your detail help other shoppers</Form.Label>
                    <Form.Select name="rating_start" >
                      <option value="1">1 Star</option>
                      <option value="2">2 Star</option>
                      <option value="3">3 Star</option>
                      <option value="4">4 Star</option>
                      <option value="5">5 Star</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Button type="submit">Submit</Button>
                  </Form.Group>
                </form>
              
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
    
  } 

  function ReviewProductNone() {
    return (
      <>
        <Row className="justify-content-md-center">
          <Col xs lg={7}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs lg={11}>
                    <Card.Title>Customer Review (filtered by 5 star)</Card.Title>
                  </Col>
                </Row>
                <Row>
                  <Col xs lg={11}>
                    
                    <h1>Not review yet!</h1> 
                    
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          
          <Col xs lg={4}>
            <Card>
              <Card.Header>
                <h2>Write a review</h2>
              </Card.Header>
              <Card.Body>
                <form method="get" action=''>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="review_title">Add a title</Form.Label>
                    <Form.Control id="review_title" name="review_title" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label  htmlFor="review_details">Detail please! Your detail help other shoppers</Form.Label>       
                    <Form.Control id="review_details" name="review_details" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Detail please! Your detail help other shoppers</Form.Label>
                    <Form.Select name="rating_start" >
                      <option value="1">1 Star</option>
                      <option value="2">2 Star</option>
                      <option value="3">3 Star</option>
                      <option value="4">4 Star</option>
                      <option value="5">5 Star</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Button type="submit">Submit</Button>
                  </Form.Group>
                </form>
              
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
  return (
      <Container fluid>
        {
          productDetails.map((item,index) => (
            <CardItemProduct
              author_name = {item.author_name}
              book_title = {item.book_title}
              book_summary = {item.book_summary}
              category_name = {item.category_name}
              book_cover_photo = {item.book_cover_photo}
              book_price = {item.book_price}
              final_price = {item.final_price}
              key = {index}
            />
          ))
        }

        {
          reviewDetails.length !== 0 ? 
          <ReviewProduct />
          : <ReviewProductNone />
        } 
      </Container>      
    );
}

export default Product;
