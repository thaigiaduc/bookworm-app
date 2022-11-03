import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Container, Button, Row, Col, Card, ToggleButtonGroup, ToggleButton, ListGroup} from 'react-bootstrap';
import axios from 'axios';
import {useState, useEffect} from 'react';
import '../../css/App.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function Home() {
    const [bookOnSale, setBookOnSale] = useState([]);
    const [bookRecommended, setBookRecommended] = useState([]);
    const [bookPopular, setBookPopular] = useState([]);
    const [recommended, setRecommended] = useState(true);
    const [defaultBook, setDefaultBook] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8000/api/home/sale')
        .then(res => {
            setBookOnSale(res.data.data);
        })
        .catch(error => console.log(error));

        axios.get('http://localhost:8000/api/home/recommended')
        .then(res => {
            setBookRecommended(res.data.data);
            setDefaultBook(res.data.data);
        })
        .catch(error => console.log(error));

        axios.get('http://localhost:8000/api/home/popular')
        .then(res => {
            setBookPopular(res.data.data);
        })
        .catch(error => console.log(error));
    }, []);

    const CardItemCarousel = props => {
        return (
            <Card style={{ width: 'auto', height: "450px", margin: "10px 20px 10px 20px", boxShadow: "5px 5px #DDDDDD" }} onClick={ () =>(navigate(`/product/${props.book_id}`)) }>
                <Card.Img variant="top" src={props.book_cover_photo === null || props.book_cover_photo === 'null' ? "../assets/bookcover/bookCover.jpg" : "../assets/bookcover/"+props.book_cover_photo+".jpg"} height="300px" width="150px"/>
                <Card.Body>
                    <Card.Title>{props.book_title.slice(0,30)+"..."}</Card.Title>
                    <Card.Text>
                        {props.author_name}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                        {
                            (props.book_price == props.final_price) ? "$"+props.final_price : <div><del style={{marginRight: "10px"}}>{"$"+props.book_price}</del>{"$"+props.final_price}</div>
                        }
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        ); 
    }
    
    const CardItemFeatured = props => {
        return (
            <Col xs lg={3} style={{width: "auto"}}>
                <Card style={{ width: '16rem', margin: "10px 40px 10px 35px", boxShadow: "5px 5px #DDDDDD" }} onClick={ () =>(navigate(`/product/${props.book_id}`)) }>
                    <Card.Img variant="top" src={props.book_cover_photo === null || props.book_cover_photo === 'null' ? "../assets/bookcover/bookCover.jpg" : "../assets/bookcover/"+props.book_cover_photo+".jpg"} height="300px" width="300px"/>
                    <Card.Body>
                        <Card.Title>{props.book_title.slice(0,30)+"..."}</Card.Title>
                        <Card.Text>
                            {props.author_name}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                        {
                            (props.book_price == props.final_price) ? "$"+props.final_price : <div><del style={{marginRight: "10px"}}>{"$"+props.book_price}</del>{"$"+props.final_price}</div>
                        }
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        ); 
    }

    const recommendedBookClick = () => {
        setDefaultBook(bookRecommended);
        setRecommended(true);
    };

    const popularBookClick = () => {
        setDefaultBook(bookPopular);
        setRecommended(false);
    };
    
    return (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col xs lg={3}>
                    <div style={{fontSize: "20px"}}>On Sale</div>
                </Col>
                <Col xs lg={3}></Col>
                <Col xs lg={3}><Button variant="secondary" style={{float: "right"}} as={Link} to="/shop">View All &nbsp; <i className="fas fa-angle-right"></i> </Button></Col>
            </Row>
            <Row className="justify-content-md-center" style={{padding: "10px 0px 0px 0px"}}>
                <Col xs lg={9} style={{border: "groove 3px", boxShadow: "5px 10px #DDDDDD"}}>
                    
                    <Carousel responsive={responsive}>
                        {
                            bookOnSale.map(item => (                   
                                <CardItemCarousel 
                                    book_id = {item.id}
                                    book_title = {item.book_title}
                                    book_cover_photo = {item.book_cover_photo}
                                    author_name = {item.author_name}
                                    book_price = {item.book_price}
                                    final_price = {item.final_price}
                                    key = {item.id}
                                />
                            ))
                        }
                        </Carousel>
                    
                </Col>
            </Row>

            <Row className="justify-content-md-center text-center" style={{padding: "80px 0px 0px 0px"}}>
                <Col xs lg={9} >
                    <h2>Featured Books</h2>
                </Col>
            </Row>

            <Row className="justify-content-md-center text-center">
                <Col xs lg={9} >
                    <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                        <ToggleButton 
                            id="tbg-radio-1" 
                            value={1}
                            variant={recommended ? 'secondary' : 'light'}
                            onClick={recommendedBookClick}
                        >
                            Recommended
                        </ToggleButton>
                        <ToggleButton 
                            id="tbg-radio-2" 
                            value={2}
                            variant={recommended ? 'light' : 'secondary'}
                            onClick={popularBookClick}
                        >
                            Popular
                        </ToggleButton>
                        
                    </ToggleButtonGroup>
                </Col>
            </Row>

            
            <Row className="justify-content-md-center" >
                <Col xs lg={9} style={{marginTop: "40px", border: "groove 3px", boxShadow: "5px 10px #DDDDDD"}}>
                    <Row>
                        {
                            defaultBook.map(item => (
                                <CardItemFeatured 
                                    book_id = {item.id}
                                    book_title = {item.book_title}
                                    book_cover_photo = {item.book_cover_photo}
                                    author_name = {item.author_name}
                                    book_price = {item.book_price}
                                    final_price = {item.final_price}
                                    key = {item.id}
                                />
                            ))
                        }
                    </Row>
                    
                </Col>
            </Row>
           
        </Container>
    );
}

export default Home;