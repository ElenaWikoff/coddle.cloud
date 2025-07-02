import { Link, useLoaderData } from "react-router";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import PageContainer from "../components/PageContainer";
import { capitalizeEachWord } from "../utils/functions";

const Lures = () => {
   const { results, pagination } = useLoaderData();

   return (
      <PageContainer>
         <Container className="mt-4 p-4">
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
                           <Col style={{ fontWeight: "600" }}>
                              {capitalizeEachWord(lure.name)}
                           </Col>
                        </ListGroup.Item>
                     );
                  })}
            </ListGroup>
         </Container>
      </PageContainer>
   );
};

export default Lures;
