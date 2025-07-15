import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import AboutCard from "../components/card/AboutCard";
import CritiqueCard from '../components/card/CritiqueCard';

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

               <section>
      {/* Self Critiques */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Self Critiques</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CritiqueCard icon="🎯" title="What did we do well?">
            We worked well together as a team, setting goals, communicating effectively, and finishing everything
            on time. Everyone contributed to the project equally and were available during the course of the
            project. Additionally, everyone felt comfortable sharing their perspectives on the project and
            contributing ideas on how tasks should be approached.
          </CritiqueCard>

          <CritiqueCard icon="📚" title="What did we learn?">
            Throughout this project, we gained experience with full-stack development, team collaboration, and
            software engineering techniques. We learned how to plan, build, and deploy a web application from
            scratch, incorporating RESTful APIs, web scraping, and a responsive frontend design. We also deepened
            our knowledge of software engineering tools such as Docker, Postman, and Git. Beyond the technical
            skills, we learned how to work as a team effectively and efficiently.
          </CritiqueCard>

          <CritiqueCard icon="🤝" title="What did we teach each other?">
            There is not one specific thing that we taught each other, but from our different backgrounds, we were
            able to share different kinds of knowledge with each other. Some of us brought stronger backend
            skills, whilst others were more skilled with the frontend. We taught each other and figured out how to
            consume RESTful APIs, use Flask, write unit tests, and build React components. However, the most
            important thing we taught each other was how to work as a team.
          </CritiqueCard>

          <CritiqueCard icon="🔧" title="What can we do better?">
            I think we worked effectively together as a team, but one thing we could improve is the timeline for
            which we worked on the project. We tended to not do that much work on the project until about a week
            before it was due.
          </CritiqueCard>

          <CritiqueCard icon="👥" title="What effect did the peer reviews have?">
            The peer reviews allowed us to communicate any problems we had with each other whilst not having any
            hard feelings as it was anonymous. However, we believe that everyone contributed equally and we would
            have been fine without peer reviews. Yet, we can see how these would have been more effective if there
            were problems that arose.
          </CritiqueCard>

          <CritiqueCard icon="🤔" title="What puzzles us?">
            We ran into a couple of issues where we had to refactor code since everyone had their own way of
            completing their task. However, we could not figure out how to solve this problem.
          </CritiqueCard>
        </div>
      </div>

      {/* Provider Critiques */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Provider Critiques</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CritiqueCard icon="✅" title="What did they do well?">
            Their user interface is super clean and easy to navigate. They met all requirements of the project and
            have very relevant models for their overarching topic of voting and Texas government. Their sorting,
            filtering, and searching is all implemented and functions correctly.
          </CritiqueCard>

          <CritiqueCard icon="🔗" title="How effective was their RESTful API?">
            Their RESTful API was very effective. It pulls information on instances for each model properly. Each
            model has an appropriate number of instances and reflects information correctly.
          </CritiqueCard>

          <CritiqueCard icon="📋" title="How well did they implement your user stories?">
            They implemented our user stories well. Some examples include bolding the labels on the instance
            cards, adjusting to a drop-down instead of a slider for filter options, and making pictures uniform
            sizes on the districts page.
          </CritiqueCard>

          <CritiqueCard icon="💡" title="What did we learn from their website?">
            We learned about information on local government representatives, incumbents in office in Texas, the
            different elected positions, and voting districts nearby.
          </CritiqueCard>

          <CritiqueCard icon="⚡" title="What can they do better?">
            The entire-website search takes you to a separate tab which is a little unconventional for websites.
            Having the website-wide search just show up on the top in the nav bar might be better just in terms of
            having a cleaner, more conventional UI. Visualization for population by district looks a little
            cluttered - specifically the labels on the side.
          </CritiqueCard>

          <CritiqueCard icon="❓" title="What puzzles us about their website?">
            I'm curious why they decided to put the website-wide search bar on an entirely different page on the
            website rather than having a section on the top for it like most conventional websites.
          </CritiqueCard>
        </div>
      </div>
    </section>
            </section>
         </Container>
      </PageContainer>
   );
};

export default About;
