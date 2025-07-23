import { useMap, useMapEvents } from "react-leaflet";
import { BiCurrentLocation } from "react-icons/bi";
import "./map.css";
import { useState } from "react";
import { redIcon } from "./CustomMarkers";

const POSITION_CLASSES = {
   bottomleft: "leaflet-bottom leaflet-left",
   bottomright: "leaflet-bottom leaflet-right",
   topleft: "leaflet-top leaflet-left",
   topright: "leaflet-top leaflet-right",
};

const LocateControl = ({ position }) => {
   const map = useMap();

   const positionClass =
      (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;

   return (
      <div className={`${positionClass} locate-button`}>
         <div className="leaflet-touch leaflet-control leaflet-bar">
            <a role="button" onClick={() => map.locate()}>
               <BiCurrentLocation />
            </a>
         </div>
      </div>
   );
};

export default LocateControl;
