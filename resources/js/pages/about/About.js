import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import '../../App.css';
import './about.css';
function About() {
    return (
        // UI của aboutPage
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col xs lg={9} id="title"><b>About Us</b></Col>
            </Row>

            <Row className="justify-content-md-center text-center" style={{padding: "20px"}}>
                <Col xs lg={9}><h1>Welcome to Bookworm</h1></Col>
            </Row>

            <Row className="justify-content-md-center " style={{padding: "30px"}}>
                <Col xs lg={6} style={{fontSize: "30px"}}>
                    <p className="vanban1">
                        "Bookworm is an independent New York bookstore and language school with locations in Manhattan and Brooklyn. 
                        We specialize in travel books and language classes".
                    </p>
                
                </Col>
            </Row>

            <Row className="justify-content-md-center " style={{padding: "30px"}}>
                <Col xs lg={3}>
                    <h2 className="h2vanban">Our Story</h2>
                    <p className="vanban2">
                    The name Bookworm was taken from the original name for New York International Airport, which was renamed JFK in December 1963.
                    </p>

                    <p className="vanban2">
                        Our Manhattan store has just moved to the West Village. Our new location is 170 7th Avenue South, at the corner of Perry Street.
                    </p>

                    <p className="vanban2">
                        From March 2008 through May 2016, the store was located in the Flatiron District.
                    </p>
                
                </Col>

                <Col xs lg={3}>
                    <h2 className="h2vanban">Our Vision</h2>
                    <p className="vanban2">
                        One of the last travel bookstores in the country, our Manhattan store carries a range of 
                        guidebooks (all 10% off) to suit the needs and tastes of every traveller and budget.
                    </p>

                    <p className="vanban2">
                        We believe that a novel or travelogue can be just as valuable a key to a place as any guidebook, 
                        and our well-read, well-travelled staff is happy to make reading recommendations for any 
                        traveller, book lover, or gift giver.
                    </p>
                
                </Col>
            </Row>
        </Container>
    );
}

export default About;