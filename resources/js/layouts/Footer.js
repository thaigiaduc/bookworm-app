import { Link } from 'react-router-dom';
import '../App.css';
import {Container, Row, Col} from 'react-bootstrap';
import { FaBookOpen } from 'react-icons/fa'

function Footer() {
    return (
        // UI của footer
        <footer className="App-footer">
            <Container fluid>
                <Row xs="auto">
                    <Col style={{fontSize: "40px"}}><img src="../../assets/bookworm_icon.svg"></img></Col>
                    <Col>
                        BOOKWORM<br/>
                        Address: 364 Cộng Hòa, Quận Tân Bình<br/>
                        Phone: 0779636115
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;