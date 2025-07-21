import { useState } from "react";
import Button from "react-bootstrap/Button";
import { FaCompass } from "react-icons/fa";
import { useMapEvents } from "react-leaflet";

const base_url = "https://www.google.com/maps/dir/?api=1";

const DirectionsButton = ({ coordinates }) => {
   const base_url = "https://www.google.com/maps/dir";
   const saddr = "Current+Location";
   const daddr = `${coordinates[0]},${coordinates[1]}`;
   const url = `${base_url}/${saddr}/${daddr}`

   return (
      <Button as="a" href={url} target="_blank" variant="dir">
         <FaCompass />
         &nbsp;Get Directions
      </Button>
   );
};

export default DirectionsButton;
