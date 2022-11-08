import React, { useEffect, createContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Button, Row, Col, Card, ButtonGroup} from 'react-bootstrap';
import orderAPI from '../../services/orderAPI';
import '../../App.css';
import './cart.css';
import Login from '../login/Login'
function Cart() { 
    const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem('cart')));
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState({id: "", quantity: 0, total: 0});
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [titleCart,setTitleCart] = useState(0);
    const [orderItem, setOrderItem] = useState({
        user_id: "",
        order_item: [],
    })
    useEffect(() => {
        var testArray = JSON.parse(localStorage.getItem('cart'));
        if(testArray != null) {
            var c = 0;
            setTitleCart(testArray.length);
            for(var i=0;i<testArray.length;i++) {
                c += testArray[i].price*testArray[i].quantity;
            }
            setTotal(c);
        }
    }, [])

    useEffect(() => {
        setCartItem(JSON.parse(localStorage.getItem('cart')));
    }, [quantity]);

    // order
    const placeOrder = (e) => {
        e.preventDefault();
            if(localStorage.getItem('cart') !== null && localStorage.getItem('user') !== null && localStorage.getItem('token') !== null) {
                const Order = async () => {
                    try {
                        var orderArray = JSON.parse(localStorage.getItem('cart'));
                        var userArray = JSON.parse(localStorage.getItem('user'));
                        var userid = userArray.id;
                        var mang = [];
                        console.log(userid);
                        for(var i=0;i<orderArray.length;i++) {
                            mang.push(orderArray[i]);
                        } 
                        setOrderItem({
                            user_id: userid,
                            order_item: mang,
                        });
                        const a = await orderAPI.createOrder({
                            user_id: userid,
                            order_item: mang,
                        });

                        function alertTime() {
                            setCartItem(null);
                            setTotal(0);
                            alert('success');
                            navigate(`/home`);
                            clearTimeout(time);
                        }
                        if(a.status_code == 201) {
                            const time = setTimeout(alertTime,10000);
                        } else {
                            alert("error, book_id doesn exist");
                            localStorage.removeItem('cart');
                            window.location.reload();
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                Order();
        } else {
            alert('Bạn chưa đăng nhập');
            setShow(true);
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
                  if(cartArray[i].quantity > 1 && cartArray[i].quantity < 9) {
                    cartArray[i].quantity -= 1;
                    localStorage.setItem('cart', JSON.stringify(cartArray));
                    setQuantity({id: id, quantity: cartArray[i].quantity});
                  } else {
                    return ;
                  }
                }
                a += cartArray[i].price * (cartArray[i].quantity);
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
                  if(cartArray[i].quantity > 0 && cartArray[i].quantity < 8) {
                    cartArray[i].quantity += 1;
                    localStorage.setItem('cart', JSON.stringify(cartArray));
                    setQuantity({id: id, quantity: cartArray[i].quantity });
                    
                  } else {
                    return ;
                  }
                }
                b += cartArray[i].price * (cartArray[i].quantity);
            }   
            setTotal(b);
        }
    }

    const ShowCartNone = props => {
        return (
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Row className="justify-content-md-center text-center">
                                <Col xs lg={8}> 
                                    <h2>Empty Cart</h2>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
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
                                    width="100px" height="200px" 
                                    onClick = {
                                        ()=>(navigate(`/shop/product/${props.book_id}`))
                                    }
                                    />
                                </Col>
                                <Col>
                                    <Card.Text
                                        onClick = {
                                            ()=>(navigate(`/shop/product/${props.book_id}`))
                                        }
                                    ><b>{props.book_title.slice(0,25)+"..."}</b></Card.Text>
                                    <Card.Text
                                        onClick = {
                                            ()=>(navigate(`/shop/product/${props.book_id}`))
                                        }
                                    >{props.book_author}</Card.Text>
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
                <Col xs lg={11} style={{borderBottom: "groove 1px", fontSize: "30px"}}><b>Your Cart: {titleCart} items</b></Col>
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
                        cartItem === null ? <ShowCartNone /> :
                        cartItem.map((item,index) => (
                            <ShowCart
                                book_id = {item.book_id}
                                book_cover_photo = {item.book_cover_photo}
                                book_price = {item.price}
                                book_quantity = {item.quantity}
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
                                    <Card.Text><strong style={{fontSize: "30px"}}>{"$"+total.toFixed(2)}</strong></Card.Text>
                                    <Card.Text><Button style={{width: "260px"}} variant="secondary" onClick = { (e) => placeOrder(e) }>Place order</Button></Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Login 
                show = {show}
            />
        </Container>
    );
}

export default Cart;