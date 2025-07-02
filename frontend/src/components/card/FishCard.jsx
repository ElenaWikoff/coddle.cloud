import Card from "react-bootstrap/Card";
import { Link } from "react-router";
import { capitalizeEachWord } from "../../utils/functions.jsx";
import "./card.css";

const FishCard = ({ fish, inCarousel = false }) => {
   return (
      <Card
         key={`card-${fish.id}`}
         className={`${inCarousel ? "in-carousel" : ""} h-100`}
         as={Link}
         to={`/fish-species/${fish.id}`}
      >
         <div className="image-wrapper">
            <Card.Img
               variant="top"
               src={
                  fish.image_attribution
                     ? `/images/fish/${fish.id}.png`
                     : `/images/fish/placeholder.png`
               }
            />
         </div>
         <Card.Body>
            <Card.Title>{capitalizeEachWord(fish.common_name)}</Card.Title>
            {!inCarousel && (
               <Card.Subtitle>
                  {fish.scientific_name[0].toUpperCase() +
                     fish.scientific_name.slice(1)}
               </Card.Subtitle>
            )}
         </Card.Body>
      </Card>
   );
};

export default FishCard;
