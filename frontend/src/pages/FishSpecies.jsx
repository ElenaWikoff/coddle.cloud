import { Link, useLoaderData } from "react-router";
import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Ratio from 'react-bootstrap/Ratio';
import CardGroup from "react-bootstrap/CardGroup";
import { capitalizeEachWord } from "../utils/functions.jsx"

const FishSpecies = () => {
   const { results, pagination } = useLoaderData();
   const [imageData, setImageData] = useState(null);

   useEffect(() => {
      fetch("/data/captions.json")
         .then((res) => res.json())
         .then((data) => setImageData(data));
   });

   return (
      <main>
         <Container className="mt-4 g-4">
            <h1>Fish Species</h1>
            <Row xs={2} md={4} className="g-3">
               {results &&
                  imageData &&
                  results.map((fish) => {
                     const { filename } = imageData.find(
                        (item) => fish.id === item.id
                     );
                     return (
                        <Col key={fish.id} className="">
                           <Card
                              key={fish.id}
                              className=""
                              as={Link}
                              to={`/fish-species/${fish.id}`}
                           >
                              {imageData && (
                                 <Ratio aspectRatio="16x9">
                                    <Card.Img
                                       className="ratio-16x9"
                                       variant="top"
                                       src={`/images/${filename}`}
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
      </main>
   );
};

export default FishSpecies;
