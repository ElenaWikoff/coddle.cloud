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

            <section className="mb-16">
               <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Project Statistics</h2>

               {/* Overall Stats */}
               <div className="flex justify-center gap-8 mb-12">
                  <div className="bg-blue-100 rounded-lg p-6 text-center hover:bg-[#307eb1] transition-colors duration-300 group">
                     <h3 className="text-2xl font-bold text-[#307eb1] group-hover:text-white mb-2 transition-colors duration-300">
                        Total Commits: 200
                     </h3>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-6 text-center hover:bg-[#307eb1] transition-colors duration-300 group">
                     <h3 className="text-2xl font-bold text-[#307eb1] group-hover:text-white mb-2 transition-colors duration-300">
                        Total Issues: 137
                     </h3>
                  </div>
               </div>

               {/* Self Critiques */}
               <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Self Critiques</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {/* Cards for self critiques */}
                  </div>
               </div>

               {/* Provider Critiques */}
               <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Provider Critiques</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {/* Cards for provider critiques */}
                  </div>
               </div>
            </section>
         </Container>
      </PageContainer>
   );
};

export default About;
