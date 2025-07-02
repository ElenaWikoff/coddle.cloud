import Map from "../Map.jsx";
import "./herobanner.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const HeroMap = ({ spots, onSelect }) => {
   return (
      <Container fluid className="map-hero-banner row m-0 p-0" style={{maxHeight: '600px'}}>
         <Row className="m-0 p-0 h-100 w-100">
            <Col
               sm={9}
               id="map"
               className="m-0 p-0 h-100"
               style={{ aspectRatio: "16/9" }}
            >
               <Map spots={spots} onSelect={onSelect} />
            </Col>
            <Col sm={3} id="map-filter" className='h-100'>
                Filter
            </Col>
         </Row>
      </Container>
   );
};

export default HeroMap;
