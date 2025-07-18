import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import AboutCard from "../components/card/AboutCard";
import CritiqueCard from '../components/card/CritiqueCard';
import StatsCard from "../components/card/StatsCard";
import { ToolsCarousel } from "../components/carousel/ToolsCarousel";
import "../components/card/card.css";

const users_init = [
    {
      name: "Elena Wikoff",
      role: "Team Lead, Frontend Engineer",
      avatar_url: "/images/elena_pic.png",
      bio: "CS Major Senior at UT Austin",
      responsibilities: "Team Leader, UI/UX Design, and Frontend Developer",
      email: "elenawikoff@utexas.edu",
      linkedin: "https://www.linkedin.com/in/elena-wikoff",
    },
    {
      name: "Jane Huynh",
      role: "Backend Engineer",
      avatar_url: "/images/jane_pic.jpg",
      bio: "MSIS Data Science at UT Austin, AI Product Manager & Data Scientist",
      responsibilities: "Backend engineer & db designer, namecheap host and API design",
      email: "janehuynh@utexas.edu",
      linkedin: "https://www.linkedin.com/in/jane-huynh",
    },
    {
      name: "Perry Ehimuh",
      role: "Frontend Engineer",
      avatar_url: "/images/perry_pic.jpg",
      bio: "CS Major Senior at UT Austin",
      responsibilities: "UI/UX Design, and Frontend Developer",
      email: "perryehimuh@gmail.com",
      linkedin: "https://www.linkedin.com/in/perry-ehimuh/",
    },
    {
      name: "Yifan Guo",
      role: "Backend Engineer",
      avatar_url: "/images/tony_pic.jpg",
      bio: "Senior Computer Science student UT Austin",
      responsibilities: "backend developer, database design",
      email: "yifan.guo3517@gmail.com",
      linkedin: "https://www.linkedin.com/in/tony-guo-012c",
    },
    {
      name: "Ethan Do",
      role: "Backend Engineer",
      avatar_url: "/images/ethan_pic.png",
      bio: "Junior CS Student, UT Austin",
      responsibilities: "Backend Engineer",
      email: "ethando767243@gmail.com",
      linkedin: "https://www.linkedin.com/in/ethan-do",
    },
    {
      name: "John Bukoski",
      role: "Technical Reporter",
      avatar_url: "/images/john_pic.jpg",
      bio: "Senior CS Student @ UT Austin",
      responsibilities: "Technical Reporter, iOS developer",
      email: "jtbukoski@gmail.com",
      linkedin: "https://www.linkedin.com/in/john-bukoski/",
    },
  ];


const About = () => {
   const [loading, setLoading] = useState(true);
   const [users, setUsers] = useState([...users_init]);
   const [data, setData] = useState();

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
         <div className="about-page">
         <Container className="p-4">
            <section id="team">
               <h2 className="section-heading">Our Team</h2>
               <Row xs={1} sm={2} md={3} className="g-3">
                  {users.map((user, index) => {
                     return (
                        <Col key={`item-${index}`}>
                           <AboutCard user={user} gitlab={loading ? null : data.members[index]} loading={loading} />
                        </Col>
                     );
                  })}
               </Row>
            </section>

            

            <section className="mb-16">

               <StatsCard stats={loading ? null : data.totals} loading={loading} />
               <ToolsCarousel />

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
     </div>
  </PageContainer>
);
};

export default About;
