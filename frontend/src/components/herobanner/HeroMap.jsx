import Map from "../map/Map.jsx";
import "./herobanner.css";
import Container from "react-bootstrap/Container";

const HeroMap = ({ spots, onSelect, query, onSearch, onSubmit }) => {
   return (
      <Container fluid className="map-hero-banner m-0 p-0 m-0">
         <div id="map"
         className="m-0 p-0 h-100 w-100">
            <Map spots={spots} onSelect={onSelect} query={query} onSearch={onSearch} onSubmit={onSubmit} />
         </div>
      </Container>
   );
};

export default HeroMap;
