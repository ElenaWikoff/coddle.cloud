import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";

const About = () => {
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState(null);

   useEffect(() => {
      console.log(
         `Attempting to fetch from: http://${window.location.hostname}:8080/api/about`
      );
      setLoading(true);
      fetch(`http://${window.location.hostname}:8080/api/about`)
         .then((res) => res.json())
         .then((data) => {
            setData(data);
            setLoading(false);
         })
         .catch((error) => {
            setLoading(false);
            console.error(`Fetching Gitlab info failed: ${error}`);
         });
   }, []);

   return (
      <main>
         {loading && (
            <div className="spinner-wrapper">
               <Spinner className="spinner" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
               </Spinner>
            </div>
         )}
         <Container className="mt-4 g-4">
            <h1>Meet Our Team</h1>
            <Row xs={1} sm={2} md={3} className="g-3">
               {!loading && !data && <p>Error fetching from Gitlab.</p>}
               {!loading &&
                  data &&
                  data.map((user, index) => {
                     return (
                        <Col key={index} className="">
                           <Card className="h-100">
                              <Card.Body>
                                 <Card.Title>{user.name}</Card.Title>
                                 <Card.Subtitle></Card.Subtitle>
                                 <Card.Text>
                                    <strong>Username: </strong>
                                    {user.username}
                                    <br />
                                    <strong>Gitlab: </strong>
                                    {user.web_url}
                                    <br />
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
