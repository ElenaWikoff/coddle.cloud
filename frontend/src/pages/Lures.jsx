import { Link, useLoaderData } from "react-router";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import PageContainer from "../components/PageContainer";

const Lures = () => {
    const { results, pagination } = useLoaderData();

    return (
        <PageContainer>
            <Container className="mt-4">
            <h1>Lures</h1>
            <ListGroup>
               {results &&
                  results.map((lure) => {
                     return (
                        <ListGroup.Item
                           key={lure.id}
                           className="row"
                           as={Link}
                           to={`/lures/${lure.id}`}
                        >
                           <Col xs="auto">{lure.id}</Col>
                           <Col>{lure.type}</Col>
                           <Col>{lure.brand}</Col>
                           <Col>{lure.application}</Col>
                           <Col>{lure.fish_types}</Col>
                        </ListGroup.Item>
                     );
                  })}
            </ListGroup>
         </Container>
        </PageContainer>
    );
};

export default Lures;