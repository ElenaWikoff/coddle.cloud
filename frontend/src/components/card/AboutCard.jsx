import Card from "react-bootstrap/Card";
import { Link } from "react-router";
import { capitalizeEachWord } from "../../utils/functions.jsx";
import Placeholder from 'react-bootstrap/Placeholder';
import "./card.css";

const AboutCard = ({ user, loading }) => {
   return (
      <>
         {!loading && user ? (
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
         ) : (
            <Card className="h-100">
               <Card.Body>
                  <Placeholder as={Card.Title} animation="glow">
                     <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation="glow">
                     <Placeholder xs={6} />
                     <Placeholder xs={8} />
                     <Placeholder xs={6} />
                  </Placeholder>
               </Card.Body>
            </Card>
         )}
      </>
   );
};

export default AboutCard;
