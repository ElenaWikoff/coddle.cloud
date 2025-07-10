import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import AboutCard from "../components/card/AboutCard";

const About = () => {
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState([null, null, null, null, null, null]);

   useEffect(() => {
      console.log(`Attempting to fetch from endpoint: /api/about`);
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
         <Container className="mt-4 g-4">
            <h1>Meet Our Team</h1>
            <Row xs={1} sm={2} md={3} className="g-3">
               {!loading && !data && <p>Error fetching from Gitlab.</p>}
               {data.map((user, index) => {
                  return (
                     <Col key={`item-${index}`}>
                        <AboutCard user={user} loading={loading} />
                     </Col>
                  );
               })}
            </Row>
         </Container>
      </PageContainer>
   );
};

export default About;
