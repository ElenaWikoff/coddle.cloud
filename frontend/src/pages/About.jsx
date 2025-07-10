import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
         <Container className="p-4">
            <h1>About Coddle.cloud</h1>
            <section id="team">
               <h2 style={{fontWeight: "300", color: "gray"}}>Meet Our Team</h2>
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
            </section>
            <section id="design" className="mt-4">
               <h2 style={{fontWeight: "300", color: "gray"}}>Design</h2>
               <ul>
                  <li>Postman API: <a href="https://utcs-cs373-group1.postman.co/workspace/utcs-cs373-group1~3ac00cd0-77b1-4c25-882e-17a6da2430f7/collection/46076704-066f19ff-7f9e-418b-bf6d-71a9dd03c09f?action=share&creator=43121659">Fishing API Collection</a></li>
               </ul>
            </section>
         </Container>
      </PageContainer>
   );
};

export default About;
