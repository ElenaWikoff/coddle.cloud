import { Link, useLoaderData, useParams } from "react-router";
import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import PageContainer from "../components/PageContainer";
import FishCard from "../components/card/FishCard.jsx";

const FishSpecies = () => {
   const params = useParams();
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);

   useEffect(() => {
      setLoading(true);
      fetch(`/api/fish`)
         .then((res) => res.json())
         .then((data) => {
            setData(data);
            setLoading(false);
         })
         .catch((error) => {
            setError(`Fetching fish species info failed: ${error}`);
            setLoading(false);
            console.error(`Fetching fish species info failed: ${error}`);
         });
   }, [params]);

   return (
      <PageContainer>
         <Container className="mt-4 g-4 p-4">
            <h1>Fish Species</h1>
            <Row xs={2} sm={3} md={4} className="g-3">
               {(!loading && data) &&
                  data.map((fish) => {
                     return (
                        <Col key={fish.id}>
                           <FishCard fish={fish} />
                        </Col>
                     );
                  })}
            </Row>
         </Container>
      </PageContainer>
   );
};

export default FishSpecies;
