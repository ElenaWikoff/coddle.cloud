import { Link, useLoaderData } from "react-router";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";

const FishSpecies = () => {
   const { results, pagination } = useLoaderData();

   return (
      <main>
         <Container className="mt-4">
            <h1>Fish Species</h1>
            <ListGroup>
               {results &&
                  results.map((fish) => {
                     return (
                        <ListGroup.Item
                           key={fish.id}
                           className="row"
                           as={Link}
                           to={`/fish-species/${fish.id}`}
                        >
                           <Col xs="auto">{fish.id}</Col>
                           <Col>{fish.scientific_name}</Col>
                           <Col>{fish.feature_name}</Col>
                           <Col>{fish.type}</Col>
                           <Col>{fish.environment}</Col>
                           <Col>{fish.distribution}</Col>
                           <Col>{`max length: ${fish.max_sizes.length} ${fish.max_sizes_units.length}, max weight: ${fish.max_sizes.weight} ${fish.max_sizes_units.length}`}</Col>
                        </ListGroup.Item>
                     );
                  })}
            </ListGroup>
         </Container>
      </main>
   );
};

export default FishSpecies;
