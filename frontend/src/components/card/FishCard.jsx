import Card from "react-bootstrap/Card";
import { Link } from "react-router";
import { capitalizeEachWord, getDistribution } from "../../utils/functions.jsx";
import Highlighter from "react-highlight-words";
import "./card.css";
import Tag from "./Tag.jsx";

const FishCard = ({ fish, query, inCarousel = false }) => {
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
          alt={
            fish.image_attribution
              ? `Illustration of a ${capitalizeEachWord(fish.common_name)}`
              : "Placeholder fish image"
          }
        />
      </div>
      <Card.Body>
        <Card.Title>
          <Highlighter
            highlightClassName="highlight-text"
            searchWords={[query]}
            autoEscape={true}
            textToHighlight={capitalizeEachWord(fish.common_name)}
          />
        </Card.Title>
        {!inCarousel && (
          <>
            <Card.Subtitle>
              <Highlighter
                className="fst-italic"
                highlightClassName="highlight-text"
                searchWords={[query]}
                autoEscape={true}
                textToHighlight={
                  fish.scientific_name[0].toUpperCase() +
                  fish.scientific_name.slice(1)
                }
              />
            </Card.Subtitle>
            <Card.Footer>
              <div className="tags-container">
                <Tag label={fish.environment} type="environment" />
                <Tag label={fish.type} type="type" />
                <Tag label={fish.distribution} type="distribution" />
              </div>
            </Card.Footer>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default FishCard;
