import Card from "react-bootstrap/Card";
import { Link } from "react-router";
import { capitalizeEachWord } from "../../utils/functions.jsx";
import "./card.css";

const LureCard = ({ lure, inCarousel = false }) => {
   return (
      <Card
         className={`${inCarousel ? "in-carousel" : ""} h-100`}
         as={Link}
         to={`/lures/${lure.id}`}
      >
         <div className="image-wrapper">
            <Card.Img
               variant="top"
               src={lure.image_url}
            />
         </div>
         <Card.Body>
            <Card.Title>{capitalizeEachWord(lure.name)}</Card.Title>
            {!inCarousel && (
               <Card.Subtitle>
                  {capitalizeEachWord(lure.type)}
               </Card.Subtitle>
            )}
         </Card.Body>
      </Card>
   );
};

export default LureCard;
