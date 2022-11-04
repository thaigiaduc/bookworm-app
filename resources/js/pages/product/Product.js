import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Container, ButtonGroup, Button, Row, Col, Card, Dropdown, Form} from 'react-bootstrap';
import '../../App.css';
import ReactPaginate from 'react-paginate';
import productAPI from '../../services/productAPI';
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
  let [quantity, setQuantity] = useState(1);
  // paginate
  const [currentItems, setCurrentItems] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const [titleDay, setTitleDay] = useState("Sort by Date: newest to oldest");
  const [titleRating, setTitleRating] = useState("");
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
    const product = async () => {
      try {
          const a = await productAPI.getProductDetails(url);
          const b = await productAPI.getReviewDetails(reviewUrl, queryParams);
          setProductDetails(a.data);
          setRatingStart(a.data[0].avg_rating);

          setReviewDetails(b.data);
          setTotal(b.total);
          setPerPage(b.per_page);
          setLastPage(b.last_page);
          setTo(b.to);
          setFrom(b.from);
      } catch (error) {
          error => navigate('/product');
      }
  }
  product();
    
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
                  (props.book_price == props.final_price) ? <h2>{"$"+props.final_price}</h2> : <><del style={{marginRight: "10px", float: "left"}}>{"$"+props.book_price}</del><h2>{"$"+props.final_price}</h2></>
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
                        <ButtonGroup style={{backgroundColor: "#f8f9fa"}}>
                            <Button variant='light' style={{border: "none", fontSize: "20px", margin: "0px 80px 0px 0px"}} onClick = { () => (setQuantity(quantity-1)) }><i className="fas fa-minus"></i></Button>
                            <span style={{fontSize: "20px"}}>{(quantity > 8 ? quantity = 8 : quantity < 1 ? quantity = 1 : quantity )}</span>
                            <Button variant='light' style={{border: "none", fontSize: "20px", margin: "0px 0px 0px 80px"}} onClick = { () => (setQuantity(quantity+1)) }><i className="fas fa-plus"></i></Button>
                        </ButtonGroup>     
                      </Col>
                    </Row>
                    <Row className="justify-content-md-center text-center" style={{padding: "10px 0px 0px 0px"}}>
                      <Col xs lg={8}>
                        <Button variant='light' style={{width: "260px"}} onClick = {() => handleAddToCart(props.book_id ,props.book_cover_photo, props.final_price, quantity, props.book_title, props.author_name)}>Add to cart</Button>
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

  const handleAddToCart = (bookID,bookImg, bookPrice, bookQuantity, bookTitle, bookAuthorName) => {
    let cartArray = [];
    if(localStorage.getItem('cart') === null) {
      localStorage.setItem('cart',JSON.stringify(cartArray));
    } 

    var flag = 0;
    var tam = {'book_id': bookID,'book_cover_photo': bookImg, 'book_price': bookPrice, 'book_quantity': bookQuantity, 'book_title': bookTitle, 'book_author': bookAuthorName};
    cartArray = JSON.parse(localStorage.getItem('cart'));
    for(var i=0;i<cartArray.length;i++) {
      if(cartArray[i].book_id == bookID) {
        bookQuantity += cartArray[i].book_quantity;
        cartArray[i].book_quantity = bookQuantity;
        flag = 1;  
      }
    }   
    
    if(flag == 0) {
      cartArray.push(tam);
    } 
    localStorage.setItem('cart',JSON.stringify(cartArray));
    setQuantity(quantity = 1);
    
    return alert("success");
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
                    <Card.Title>Customer Review ({titleRating})</Card.Title>
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
                        <Button variant="light"
                          onClick = {() => (
                            setFilter({...filter, page: 1, rating_start: 5}),
                            setTitleSort("filtered by 5 star"),
                            setCurrentItems(0)
                          )}
                        >
                          <u>5 star ()</u>
                        </Button> | 
                        <Button variant="light"
                          onClick = {() => (
                            setFilter({...filter, page: 1, rating_start: 4}),
                            setTitleSort("filtered by 4 star"),
                            setCurrentItems(0)
                          )}
                        >
                          <u>4 star () </u>
                        </Button> | 
                        <Button variant="light"
                          onClick = {() => (
                            setFilter({...filter, page: 1, rating_start: 3}),
                            setTitleSort("filtered by 3 star"),
                            setCurrentItems(0)
                          )}
                        >
                          <u>3 star ()</u>
                        </Button> | 
                        <Button variant="light"
                          onClick = {() => (
                            setFilter({...filter, page: 1, rating_start: 2}),
                            setTitleSort("filtered by 2 star"),
                            setCurrentItems(0)
                          )}
                        >
                          <u>2 star ()</u>
                        </Button> | 
                        <Button variant="light"
                          onClick = {() => (
                            setFilter({...filter, page: 1, rating_start: 1}),
                            setTitleSort("filtered by 1 star"),
                            setCurrentItems(0)
                          )}
                        >
                          <u>1 star ()</u>
                        </Button>
                        </Card.Text>
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
                  <Col xs lg={5}>
                    <Card.Title>Customer Review ({titleRating})</Card.Title>
                  </Col>
                  <Col xs lg={6}></Col>
                </Row>        
              </Card.Body>
                <Row>
                  <Col>
                    <h2>Not review yet !</h2>
                    
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
      </>
    );
  }
  return (
      <Container fluid>
        {
          productDetails.map((item,index) => (
            <CardItemProduct
              book_id = {item.id}
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
