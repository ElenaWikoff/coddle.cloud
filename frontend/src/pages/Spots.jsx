import { Link, useLoaderData } from "react-router";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import PageContainer from "../components/PageContainer";

const Spots = () => {
   const { results, pagination } = useLoaderData();

   return (
      <PageContainer>
         <Container className="m-4">
            <h1>Fishing Spots</h1>
            <ListGroup>
               {results &&
                  results.map((spot) => {
                     return (
                        <ListGroup.Item
                           key={spot.id}
                           className="row"
                           as={Link}
                           to={`/spots/${spot.id}`}
                        >
                           <Col xs="auto">{spot.id}</Col>
                           <Col>{`lattitude: ${spot.coordinates.lattitude}, longitude: ${spot.coordinates.longitude}`}</Col>
                           <Col>{spot.feature_name}</Col>
                           <Col>{spot.type}</Col>
                           <Col>{spot.city}</Col>
                           <Col>{spot.zip_code}</Col>
                           <Col>{spot.fish_species}</Col>
                           <Col>{spot.last_updated}</Col>
                        </ListGroup.Item>
                     );
                  })}
            </ListGroup>
         </Container>
      </PageContainer>
   );
};

export default Spots;
