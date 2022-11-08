import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

function Error() {
    return (
        // UI trả về trang 404
        <Container fluid>
            <Row className="justify-content-md-center text-center" style={{paddingBottom: "260px"}}>
                <Col xs lg={12}>
                    <h1 style={{marginTop: "300px"}}>404 PAGE</h1>
                </Col>
            </Row>
        </Container>
    );
}

export default Error;