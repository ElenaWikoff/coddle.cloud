import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FishCard from "../card/FishCard";
import LureCard from "../card/LureCard";

const ResultsGrid = ({ results, type, query }) => {
   return (
      <Container className={`${type}-grid p-0 m-0 g-4`}>
         <Row xs={2} sm={3} md={4} className="g-3">
            {results.map((item) => {
               return (
                  <Col key={`card-${item.id}`}>
                     {type === "fish" && <FishCard fish={item} query={query} />}
                     {type === "lures" && <LureCard lure={item} query={query} />}
                  </Col>
               );
            })}
         </Row>
      </Container>
   );
};

export default ResultsGrid;
