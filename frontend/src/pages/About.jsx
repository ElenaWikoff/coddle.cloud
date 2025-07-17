import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import AboutCard from "../components/card/AboutCard";
import CritiqueCard from '../components/card/CritiqueCard';
import StatsCard from "../components/card/StatsCard";

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

            <section className="mb-16">

               <StatsCard />

               <section>
                  {/* Self Critiques */}
                  <div className="critique-section">
                     <h3 className="section-heading">Self Critiques</h3>
                     <Row xs={1} sm={2} md={2} className="g-4">
                        <Col>
                        <CritiqueCard icon="🎯" title="What did we do well?">
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                        </CritiqueCard>
                        </Col>
                        <Col>
                        <CritiqueCard icon="📚" title="What did we learn?">
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                        </CritiqueCard>
                        </Col>
                        <Col>
                        <CritiqueCard icon="🔧" title="What can we do better?">
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                        </CritiqueCard>
                        </Col>
                        <Col>
                        <CritiqueCard icon="🤔" title="What puzzles us?">
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                        </CritiqueCard>
                        </Col>
                     </Row>
                  </div>

                  {/* Provider Critiques */}
                  <div className="critique-section">
                     <h3 className="section-heading">Provider Critiques</h3>
                     <Row xs={1} sm={2} md={2} className="g-4">
                        <Col>
                        <CritiqueCard icon="✅" title="What did they do well?">
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                        </CritiqueCard>
                        </Col>
                        <Col>
                        <CritiqueCard icon="💡" title="What did we learn from their website?">
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                        </CritiqueCard>
                        </Col>
                        <Col>
                        <CritiqueCard icon="⚡" title="What can they do better?">
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                        </CritiqueCard>
                        </Col>
                        <Col>
                        <CritiqueCard icon="❓" title="What puzzles us about their website?">
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                        </CritiqueCard>
                        </Col>
                     </Row>
                  </div>
               </section>
            </section>
     </Container>
  </PageContainer>
);
};

export default About;
