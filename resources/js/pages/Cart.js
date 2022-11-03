import React from 'react';
import { useState } from 'react';
import {Container, Button, Row, Col, Card, ButtonGroup, ListGroup, Pagination, Accordion, Dropdown} from 'react-bootstrap';
import '../App.css';

function Cart() { 
    const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem('cart')));

    const placeOrder = () => {
        setCartItem(null);
        localStorage.removeItem('cart');
        return alert('success');
    }

    const ShowCart = props => {
        return (
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                <Card.Img 
                                    variant="top" 
                                    src={props.book_cover_photo === null || props.book_cover_photo === 'null' ? "../assets/bookcover/bookCover.jpg" : "../assets/bookcover/"+props.book_cover_photo+".jpg"} 
                                    width="80px" height="200px" />
                                </Col>
                                <Col>
                                    <Card.Text><b>{props.book_title}</b></Card.Text>
                                    <Card.Text>{props.book_author}</Card.Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col>{props.book_price}</Col>
                        <Col>{props.book_quantity}</Col>
                        <Col>{props.book_total}</Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
    return (
        <Container fluid style={{paddingBottom: "350px"}}>
            <Row className="justify-content-md-center">
                <Col xs lg={11} style={{borderBottom: "groove 1px", fontSize: "30px"}}><b>Your Cart: 3 items</b></Col>
            </Row>
            <Row className="justify-content-md-center" style={{paddingTop: "50px"}}>
            <Col xs lg={7}>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col>
                                Product
                            </Col>
                            <Col>
                                Price
                            </Col>
                            <Col>
                                Quantity
                            </Col>
                            <Col>
                                Total
                            </Col>
                        </Row>
                    </Card.Header>
                    {
                        cartItem === null ? "" :
                        cartItem.map((item,index) => (
                            <ShowCart
                                book_cover_photo = {item.book_cover_photo}
                                book_price = {item.book_price}
                                book_quantity = {item.book_quantity}
                                book_total = {item.book_total}
                                book_title = {item.book_title}
                                book_author = {item.book_author}
                                key = {index}
                            />
                        ))
                    }
                </Card>   
            </Col>
                <Col xs lg={4}>
                    <Card>
                        <Card.Header>Cart Totals</Card.Header>
                        <Card.Body>
                            <Row className="justify-content-md-center text-center">
                                <Col xs lg={8}>
                                    <Card.Text>$99.97</Card.Text>
                                    <Card.Text><Button onClick = { () => placeOrder() }>Place order</Button></Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Cart;