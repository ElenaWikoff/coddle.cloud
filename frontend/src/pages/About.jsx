import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";

const About = () => {
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState(null);

   useEffect(() => {
      console.log(
         `Attempting to fetch from endpoint: /api/about`
      );
      setLoading(true);
      fetch(`/api/about`)
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
      <PageContainer>
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
                                    <strong>Commits: </strong>
                                    {user.commits}
                                 </Card.Text>
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

export default About;
