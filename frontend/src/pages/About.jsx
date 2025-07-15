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
            <section id="design" className="mt-4">
               <h2 style={{fontWeight: "300", color: "gray"}}>Design</h2>
               <ul>
                  <li>Postman API: <a href="https://utcs-cs373-group1.postman.co/workspace/utcs-cs373-group1~3ac00cd0-77b1-4c25-882e-17a6da2430f7/collection/46076704-066f19ff-7f9e-418b-bf6d-71a9dd03c09f?action=share&creator=43121659">Fishing API Collection</a></li>
               </ul>
            </section>

            <section className="mb-16">

               <StatsCard />

               <section>
                  {/* Self Critiques */}
                  <div className="mb-12">
                     <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Self Critiques</h3>
                     <Row xs={1} sm={2} md={3} className="g-4">
                        <Col>
                           <CritiqueCard icon="🎯" title="What did we do well?">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, sapien et mollis aliquet, nulla libero faucibus libero, euismod convallis metus libero et justo. Cras accumsan justo a lectus euismod, ac scelerisque ligula pharetra. Ut laoreet sollicitudin viverra. Fusce ac arcu eget libero efficitur malesuada. Nam vitae ante vitae risus pretium mollis. Sed at eros quis sem varius laoreet. Curabitur at nunc facilisis, vulputate libero ut, auctor arcu. Mauris sit amet libero neque.
                           </CritiqueCard>
                        </Col>

                        <Col>
                           <CritiqueCard icon="📚" title="What did we learn?">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, sapien et mollis aliquet, nulla libero faucibus libero, euismod convallis metus libero et justo. Cras accumsan justo a lectus euismod, ac scelerisque ligula pharetra. Ut laoreet sollicitudin viverra. Fusce ac arcu eget libero efficitur malesuada. Nam vitae ante vitae risus pretium mollis. Sed at eros quis sem varius laoreet. Curabitur at nunc facilisis, vulputate libero ut, auctor arcu. Mauris sit amet libero neque.
                           </CritiqueCard>
                        </Col>

                        <Col>
                           <CritiqueCard icon="🤝" title="What did we teach each other?">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, sapien et mollis aliquet, nulla libero faucibus libero, euismod convallis metus libero et justo. Cras accumsan justo a lectus euismod, ac scelerisque ligula pharetra. Ut laoreet sollicitudin viverra. Fusce ac arcu eget libero efficitur malesuada. Nam vitae ante vitae risus pretium mollis. Sed at eros quis sem varius laoreet. Curabitur at nunc facilisis, vulputate libero ut, auctor arcu. Mauris sit amet libero neque.
                           </CritiqueCard>
                        </Col>

                        <Col>
                           <CritiqueCard icon="🔧" title="What can we do better?">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, sapien et mollis aliquet, nulla libero faucibus libero, euismod convallis metus libero et justo. Cras accumsan justo a lectus euismod, ac scelerisque ligula pharetra. Ut laoreet sollicitudin viverra. Fusce ac arcu eget libero efficitur malesuada. Nam vitae ante vitae risus pretium mollis. Sed at eros quis sem varius laoreet. Curabitur at nunc facilisis, vulputate libero ut, auctor arcu. Mauris sit amet libero neque.
                           </CritiqueCard>
                        </Col>

                        <Col>
                           <CritiqueCard icon="👥" title="What effect did the peer reviews have?">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, sapien et mollis aliquet, nulla libero faucibus libero, euismod convallis metus libero et justo. Cras accumsan justo a lectus euismod, ac scelerisque ligula pharetra. Ut laoreet sollicitudin viverra. Fusce ac arcu eget libero efficitur malesuada. Nam vitae ante vitae risus pretium mollis. Sed at eros quis sem varius laoreet. Curabitur at nunc facilisis, vulputate libero ut, auctor arcu. Mauris sit amet libero neque.
                           </CritiqueCard>
                        </Col>

                        <Col>
                           <CritiqueCard icon="🤔" title="What puzzles us?">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, sapien et mollis aliquet, nulla libero faucibus libero, euismod convallis metus libero et justo. Cras accumsan justo a lectus euismod, ac scelerisque ligula pharetra. Ut laoreet sollicitudin viverra. Fusce ac arcu eget libero efficitur malesuada. Nam vitae ante vitae risus pretium mollis. Sed at eros quis sem varius laoreet. Curabitur at nunc facilisis, vulputate libero ut, auctor arcu. Mauris sit amet libero neque.
                           </CritiqueCard>
                        </Col>
                     </Row>
                  </div>

                  {/* Provider Critiques */}
                  <div className="mb-12">
                     <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Provider Critiques</h3>
                     <Row xs={1} sm={2} md={3} className="g-4">
                        <Col>
                           <CritiqueCard icon="✅" title="What did they do well?">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, sapien et mollis aliquet, nulla libero faucibus libero, euismod convallis metus libero et justo. Cras accumsan justo a lectus euismod, ac scelerisque ligula pharetra. Ut laoreet sollicitudin viverra. Fusce ac arcu eget libero efficitur malesuada. Nam vitae ante vitae risus pretium mollis. Sed at eros quis sem varius laoreet. Curabitur at nunc facilisis, vulputate libero ut, auctor arcu. Mauris sit amet libero neque.
                           </CritiqueCard>
                        </Col>

                        <Col>
                           <CritiqueCard icon="🔗" title="How effective was their RESTful API?">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, sapien et mollis aliquet, nulla libero faucibus libero, euismod convallis metus libero et justo. Cras accumsan justo a lectus euismod, ac scelerisque ligula pharetra. Ut laoreet sollicitudin viverra. Fusce ac arcu eget libero
                              efficitur malesuada. Nam vitae ante vitae risus pretium mollis. Sed at eros quis sem varius laoreet. Curabitur at nunc facilisis, vulputate libero ut, auctor arcu. Mauris sit amet libero neque. 
                           </CritiqueCard> 
                        </Col>

                    <Col>
                       <CritiqueCard icon="📋" title="How well did they implement your user stories?">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, sapien et mollis aliquet, nulla libero faucibus libero, euismod convallis metus libero et justo. Cras accumsan justo a lectus euismod, ac scelerisque ligula pharetra. Ut laoreet sollicitudin viverra. Fusce ac arcu eget libero efficitur malesuada. Nam vitae ante vitae risus pretium mollis. Sed at eros quis sem varius laoreet. Curabitur at nunc facilisis, vulputate libero ut, auctor arcu. Mauris sit amet libero neque.
                       </CritiqueCard>
                    </Col>

                    <Col>
                       <CritiqueCard icon="💡" title="What did we learn from their website?">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, sapien et mollis aliquet, nulla libero faucibus libero, euismod convallis metus libero et justo. Cras accumsan justo a lectus euismod, ac scelerisque ligula pharetra. Ut laoreet sollicitudin viverra. Fusce ac arcu eget libero efficitur malesuada. Nam vitae ante vitae risus pretium mollis. Sed at eros quis sem varius laoreet. Curabitur at nunc facilisis, vulputate libero ut, auctor arcu. Mauris sit amet libero neque.
                       </CritiqueCard>
                    </Col>

                    <Col>
                       <CritiqueCard icon="⚡" title="What can they do better?">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, sapien et mollis aliquet, nulla libero faucibus libero, euismod convallis metus libero et justo. Cras accumsan justo a lectus euismod, ac scelerisque ligula pharetra. Ut laoreet sollicitudin viverra. Fusce ac arcu eget libero efficitur malesuada. Nam vitae ante vitae risus pretium mollis. Sed at eros quis sem varius laoreet. Curabitur at nunc facilisis, vulputate libero ut, auctor arcu. Mauris sit amet libero neque.
                       </CritiqueCard>
                    </Col>

                    <Col>
                       <CritiqueCard icon="❓" title="What puzzles us about their website?">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, sapien et mollis aliquet, nulla libero faucibus libero, euismod convallis metus libero et justo. Cras accumsan justo a lectus euismod, ac scelerisque ligula pharetra. Ut laoreet sollicitudin viverra. Fusce ac arcu eget libero efficitur malesuada. Nam vitae ante vitae risus pretium mollis. Sed at eros quis sem varius laoreet. Curabitur at nunc facilisis, vulputate libero ut, auctor arcu. Mauris sit amet libero neque.
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
