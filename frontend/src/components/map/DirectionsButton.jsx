import Button from "react-bootstrap/Button";
import { FaCompass } from "react-icons/fa";
const base_url = "https://www.google.com/maps/dir//";

const DirectionsButton = ({ coordinates }) => {
   return (
      <Button
         as="a"
         href={`${base_url}${coordinates[0]},${coordinates[1]}`}
         target="_blank"
         variant="dir"
      >
         <FaCompass />
         &nbsp;Get Directions
      </Button>
   );
};

export default DirectionsButton;
