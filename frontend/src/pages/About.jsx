import { useLoaderData } from "react-router";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

const About = () => {
   const data = useLoaderData();

   return (
      <main>
         <Container className="mt-4 g-4">
            <h1>Meet Our Team</h1>
            <Row xs={1} sm={2} md={3} className="g-3">
               {data.map((user, index) => {
                  return (
                     <Col key={index} className="">
                        <Card className="h-100">
                           <Card.Body>
                              <Card.Title>{user.name}</Card.Title>
                              <Card.Subtitle></Card.Subtitle>
                              <Card.Text>
                                <strong>Username: </strong>
                                {user.username}<br/>
                                 <strong>Gitlab: </strong>
                                 {user.web_url}<br/>
                              </Card.Text>
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

export default About;
