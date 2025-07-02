import { Link, useLoaderData } from "react-router";
import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import PageContainer from "../components/PageContainer";
import FishCard from "../components/card/FishCard.jsx";

const FishSpecies = () => {
   const { results, pagination } = useLoaderData();

   return (
      <PageContainer>
         <Container className="mt-4 g-4 p-4">
            <h1>Fish Species</h1>
            <Row xs={2} sm={3} md={4} className="g-3">
               {results && results.map((fish) => {
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
