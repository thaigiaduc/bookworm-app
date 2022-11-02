import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import queryString from 'query-string';
import {Container, Row, Col, Card, ListGroup, Pagination, Accordion, Dropdown} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import '../App.css';

function Shop() {
    // set all book
    const [allBook, setAllBook] = useState([]);
    // set category
    const [category, setCategory] = useState([]);
    // const [activeCategory, setActiveCategory] = useState(0);
    // const [activeAuthor, setActiveAuthor] = useState(0);
    // const [activeRating, setActiveRating] = useState(0);
    const [titleCategory, setTitleCategory] = useState("");
    const [titleAuthor, setTitleAuthor] = useState("");
    const [titleRating, setTitleRating] = useState("");
    // set author
    const [author, setAuthor] = useState([]);
    // total book
    const [total, setTotal] = useState(0);
    // số sản phẩm 1 trang 
    const [perPage, setPerPage] = useState(0);
    // trang cuối
    const [lastPage, setLastPage] = useState(0);
    // trang đầu
    const [from, setFrom] = useState(0);
    // trang cuối
    const [to, setTo] = useState(0);
    // paginate
    const [currentItems, setCurrentItems] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);
    // title phần sort
    const [titleSort, setTitleSort] = useState("Sort by on sale");
    const [filter, setFilter] = useState({
        sortby: 'onsale'
    })
    const navigate = useNavigate();
    useEffect(() => {
        const queryParams = queryString.stringify(filter);
        axios.get(`http://localhost:8000/api/shop?${queryParams}`)
        .then(res => {
            setAllBook(res.data.data);
            setTotal(res.data.total);
            setPerPage(res.data.per_page);
            setLastPage(res.data.last_page);
            setTo(res.data.to);
            setFrom(res.data.from);
        })
        .catch(error => console.log(error));

        axios.get('http://localhost:8000/api/shop/category')
        .then(res => {
            setCategory(res.data.data);
        })
        .catch(error => console.log(error));

        axios.get('http://localhost:8000/api/shop/author')
        .then(res => {
            setAuthor(res.data.data);
        })
        .catch(error => console.log(error));
    }, [filter, itemOffset]);

    
    const CardItem = props => {
        return (
            <Col xs lg={3}>
                <Card style={{ width: '16rem', height: "450px", margin: "10px 0px 10px 0px", boxShadow: "5px 5px #DDDDDD" }} onClick={ () =>(navigate(`/product/${props.book_id}`)) }>
                    <Card.Img variant="top" src={props.book_cover_photo === null || props.book_cover_photo === 'null' ? "../assets/bookcover/bookCover.jpg" : "../assets/bookcover/"+props.book_cover_photo+".jpg" } height="300px" width="300px"/>
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

    const CategoryFilter = props => {
        return ( 
            <Accordion.Body>

                <button 
                    onClick = {() => (
                        setFilter({...filter, page: 1, category: props.id}),
                        // setActiveCategory(props.id),
                        setTitleCategory(props.category_name),
                        setCurrentItems(0)
                    )}
                        // variant={props.id == activeCategory ? 'secondary' : 'light'}
                        style={{border: "none", color: "black"}}
                >
                    {props.category_name}
                </button>
            </Accordion.Body>
        );
    }

    const AuthorFilter = props => {
        return ( 
            <Accordion.Body>
                <button
                    onClick = {() => (
                        setFilter({...filter, page: 1, author: props.id}),
                        // setActiveAuthor(props.id),
                        setTitleAuthor(props.author_name),
                        setCurrentItems(0) 
                    )}
                    style={{border: "none", color: "black"}}
                >
                    {props.author_name}
                </button>
            </Accordion.Body>
        );
    }

    const ratingArray = [
        {
            id: 1,
            star: "1 Star"
        },
        {
            id: 2,
            star: "2 Star"
        },
        {
            id: 3,
            star: "3 Star"
        },
        {
            id: 4,
            star: "4 Star"
        },
        {
            id: 5,
            star: "5 Star"
        }
    ];
    const RatingFilter = props => {
        return (
            <Accordion.Body>
                <button style={{border: "none", fontSize: "18px"}}
                    onClick = {() => (
                        setFilter({...filter, page: 1, rating_start: props.id}),
                        // setActiveRating(props.id),
                        setTitleRating(props.star),
                        setCurrentItems(0)
                    )}                                        
                >
                    {props.star}
                </button>
            </Accordion.Body>
        );
    }

    return (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col xs lg={11} id="title"><b>Books</b></Col>
            </Row>

            <Row className="justify-content-md-center" style={{ paddingTop: "80px"}}>
                <Col xs lg={2}>
                    <p>
                        Filter By { titleCategory !== "" ? titleCategory+"(category)" : "" } { titleAuthor !== "" ? titleAuthor+"(author)" : "" }  { titleRating !== "" ? titleRating+"(rating)" : "" }
                    </p>
                </Col>

                <Col xs lg={7}>
                    <p>Showing {from}-{to} of {total} books</p>
                </Col>

                <Col xs lg={1} style={{width: "auto"}}>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                            {titleSort}
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="light">
                            <Dropdown.Item 
                                onClick = {() => (
                                    setFilter({...filter, page: 1,sortby: 'onsale'}),
                                    setTitleSort("Sort by on sale"),
                                    setCurrentItems(0)
                                )}
                            >
                                Sort by on sale
                            </Dropdown.Item>
                            <Dropdown.Item 
                                onClick = {() => (
                                    setFilter({...filter, page: 1,sortby: 'popularity'}),
                                    setTitleSort("Sort by popularity"),
                                    setCurrentItems(0)
                                )}
                            >
                                Sort by popularity
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick = {() => (
                                    setFilter({...filter, page: 1,sortby: 'price_up'}),
                                    setTitleSort("Sort by price: low to high"),
                                    setCurrentItems(0)
                                )}
                            >
                                Sort by price: low to high
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick = {() => (
                                    setFilter({...filter, page: 1,sortby: 'price_down'}),
                                    setTitleSort("Sort by price: high to low"),
                                    setCurrentItems(0)
                                )}
                            >
                                Sort by price: high to low
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                
                <Col xs lg={1}>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                            Show {perPage}
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
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

            <Row className="justify-content-md-center" style={{paddingTop: "20px"}}>
                <Col xs lg={2}>
                    <Accordion>
                        <Row style={{paddingBottom: "30px"}}>
                            <Col>
                                <Accordion.Item eventKey="true">
                                    <Accordion.Header>Category</Accordion.Header>
                                    
                                    {
                                        category.map(cate => (
                                            <CategoryFilter
                                                category_name = {cate.category_name}
                                                id = {cate.id}
                                                key = {cate.id}
                                            />
                                            
                                        ))
                                    }
                                   
                                </Accordion.Item>
                            </Col>
                        </Row>
                    
                        <Row style={{paddingBottom: "30px"}}>
                            <Col>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Author</Accordion.Header>
                                    {
                                        author.map(au => (
                                            <AuthorFilter
                                                author_name = {au.author_name}
                                                id = {au.id}
                                                key = {au.id}
                                            />
                                        ))
                                    }
                                    
                                </Accordion.Item>
                            </Col>
                        </Row>
                        
                        <Row className="justify-content-md-center" style={{paddingBottom: "30px"}}>
                            <Col>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Rating Review</Accordion.Header>
                                        {
                                            ratingArray.map(rate => (
                                                <RatingFilter 
                                                    id = {rate.id}
                                                    star = {rate.star}
                                                    key = {rate.id}
                                                />
                                            ))
                                        }
                                </Accordion.Item>
                            </Col>
                        </Row>
                    </Accordion>
                </Col>

                <Col xs lg={9}>
                    <Row className="justify-content-md-center">
                    {
                        allBook.map(item => (
                            <CardItem 
                                book_id = {item.id}
                                book_title = {item.book_title}
                                book_cover_photo = {item.book_cover_photo}
                                author = {item.author_name}
                                book_price = {item.book_price}
                                final_price = {item.final_price}
                                key = {item.id}
                            />
                        ))
                    }
                    </Row>

                    <Row className="justify-content-md-center text-center" style={{paddingTop: "30px"}}>
                        <Col xs lg={6}>
                           
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="Next >"
                                nextPageRel="null"
                                onPageChange={(event) => (
                                    setItemOffset((event.selected * perPage) % lastPage),
                                    setFilter({...filter, page: event.selected+1}),
                                    setCurrentItems(event.selected )
                                )}
                                pageRangeDisplayed={5}
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
                </Col>
            </Row>
        </Container>     
    );
}

export default Shop;