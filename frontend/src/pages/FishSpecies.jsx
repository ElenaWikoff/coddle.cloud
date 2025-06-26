import { Link, useLoaderData } from "react-router";
import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Ratio from 'react-bootstrap/Ratio';
import { capitalizeEachWord } from "../utils/functions.jsx"
import PageContainer from "../components/PageContainer";

const FishSpecies = () => {
   const { results, pagination } = useLoaderData();
   const [imageData, setImageData] = useState(null);

   useEffect(() => {
      fetch("/data/captions.json")
         .then((res) => res.json())
         .then((data) => setImageData(data));
   });

   return (
      <PageContainer>
         <Container className="mt-4 g-4">
            <h1>Fish Species</h1>
            <Row xs={2} sm={3} md={4} className="g-3">
               {results && results.map((fish) => {
                     return (
                        <Col key={fish.id} className="">
                           <Card
                              key={fish.id}
                              className="h-100"
                              as={Link}
                              to={`/fish-species/${fish.id}`}
                           >
                              {fish.image && (
                                 <Ratio aspectRatio="16x9">
                                    <Card.Img
                                       className="ratio-16x9"
                                       variant="top"
                                       src={`/images/${fish.image.filename}`}
                                    />
                                 </Ratio>
                              )}
                              <Card.Body>
                                 <Card.Title>{capitalizeEachWord(fish.common_name)}</Card.Title>
                                 <Card.Subtitle>
                                    {fish.scientific_name[0].toUpperCase() + fish.scientific_name.slice(1)}
                                 </Card.Subtitle>
                              </Card.Body>
                           </Card>
                        </Col>
                     );
                  })}
            </Row>
         </Container>
      </PageContainer>
   );
};

export default FishSpecies;
