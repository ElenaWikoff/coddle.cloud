import { Link, useLoaderData } from "react-router";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import PageContainer from "../components/PageContainer";
import { capitalizeEachWord } from "../utils/functions.jsx";
import { BsArrowRight } from "react-icons/bs";

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
                           className="row d-flex justify-content-between"
                           as={Link}
                           to={`/spots/${spot.id}`}
                        >
                           <span className="w-auto" style={{ fontWeight: "600" }}>
                              {capitalizeEachWord(spot.feature_name)}
                           </span>
                           <span className="w-auto" style={{fontWeight: "300"}}>
                              {` (${spot.coordinates.lattitude.toFixed()}, ${spot.coordinates.longitude.toFixed(
                                 3
                              )})`}
                           </span>
                           {/* <span className="w-auto" >
                              {new Date(spot.last_updated).toLocaleDateString()}
                           </span> */}
                        </ListGroup.Item>
                     );
                  })}
            </ListGroup>
         </Container>
      </PageContainer>
   );
};

export default Spots;
