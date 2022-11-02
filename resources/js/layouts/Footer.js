import { Link } from 'react-router-dom';
import '../App.css';
import {Container, Row, Col} from 'react-bootstrap';
import { FaBookOpen } from 'react-icons/fa'

function Footer() {
    return (
        <footer className="App-footer">
            <Container fluid>
                <Row xs="auto">
                    <Col style={{fontSize: "40px"}}><img src="../assets/bookworm_icon.svg"></img></Col>
                    <Col>
                        BOOKWORM<br/>
                        Address: 51/3 Bãi Sậy, Phường 1, Quận 6<br/>
                        Phone: 0779636115
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;