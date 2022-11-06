import React, { useEffect } from 'react';
import { useState } from 'react';
import {Container, Button, Row, Col, Card, ButtonGroup, ListGroup, Pagination, Accordion, Dropdown} from 'react-bootstrap';
import '../../App.css';

function Cart() { 
    const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem('cart')));
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState({id: "", quantity: 0, total: 0});
    useEffect(() => {
        var testArray = JSON.parse(localStorage.getItem('cart'));
        if(testArray != null) {
            var c = 0;
            for(var i=0;i<testArray.length;i++) {
                c += testArray[i].book_price*testArray[i].book_quantity;
            }
            setTotal(c);
        }
    }, [])
    useEffect(() => {
        setCartItem(JSON.parse(localStorage.getItem('cart')));
    }, [quantity]);

    // order
    const placeOrder = () => {
        if(JSON.parse(localStorage.getItem('cart')) !== null) {
            setCartItem(null);
            localStorage.removeItem('cart');
            return alert('success');
        }
    }

    // trừ số lượng sản phẩm trong cart
    const MinusQuantity = (id) => {
        if(localStorage.getItem('cart') === null) {
            return ""
        } else {
            var cartArray = JSON.parse(localStorage.getItem('cart'));
            var a=0;
            for(var i=0;i<cartArray.length;i++) {
                if(cartArray[i].book_id == id) {
                  if(cartArray[i].book_quantity > 1 && cartArray[i].book_quantity < 9) {
                    cartArray[i].book_quantity -= 1;
                    localStorage.setItem('cart', JSON.stringify(cartArray));
                    setQuantity({id: id, quantity: cartArray[i].book_quantity});
                  } else {
                    return ;
                  }
                }
                a += cartArray[i].book_price * (cartArray[i].book_quantity);
            }   
            setTotal(a);
        }
    }

    // cộng số lượng sản phẩm trong cart
    const FlusQuantity = (id) => {
        if(localStorage.getItem('cart') === null) {
            return ""
        } else {
            var cartArray = JSON.parse(localStorage.getItem('cart'));
            var b=0;
            for(var i=0;i<cartArray.length;i++) {
                if(cartArray[i].book_id == id) {  
                  if(cartArray[i].book_quantity > 0 && cartArray[i].book_quantity < 8) {
                    cartArray[i].book_quantity += 1;
                    localStorage.setItem('cart', JSON.stringify(cartArray));
                    setQuantity({id: id, quantity: cartArray[i].book_quantity });
                    
                  } else {
                    return ;
                  }
                }
                b += cartArray[i].book_price * (cartArray[i].book_quantity);
            }   
            setTotal(b);
        }
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
                                    <Card.Text><b>{props.book_title.slice(0,25)+"..."}</b></Card.Text>
                                    <Card.Text>{props.book_author}</Card.Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col>{"$"+props.book_price}</Col>
                        <Col>
                            <ButtonGroup style={{backgroundColor: "#f8f9fa"}}>
                                <Button 
                                    variant='light' 
                                    style={{border: "none", fontSize: "20px", margin: "0px 80px 0px 0px"}} 
                                    onClick = { () => (MinusQuantity(props.book_id)) }>
                                        <i className="fas fa-minus"></i>
                                </Button>
                                <span style={{fontSize: "20px"}}>{(props.book_quantity > 8 ? props.book_quantity = 8 : props.book_quantity < 1 ? props.book_quantity = 1 : props.book_quantity )}</span>
                                <Button 
                                    variant='light' 
                                    style={{border: "none", fontSize: "20px", margin: "0px 0px 0px 80px"}} 
                                    onClick = { () => (FlusQuantity(props.book_id)) }>
                                        <i className="fas fa-plus"></i>
                                </Button>
                            </ButtonGroup> 
                        </Col>
                        <Col>
                            {"$"+(props.book_price*props.book_quantity).toFixed(2)}
                        </Col>
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
                                book_id = {item.book_id}
                                book_cover_photo = {item.book_cover_photo}
                                book_price = {item.book_price}
                                book_quantity = {item.book_quantity}
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
                                    <Card.Text>{"$"+total.toFixed(2)}</Card.Text>
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