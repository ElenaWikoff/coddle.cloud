import { useState } from "react";
import {
   useMapEvents,
   Marker,
   Popup,
} from "react-leaflet";
import { redIcon } from "./CustomMarkers";

const LocationMarker = () => {
   const [position, setPosition] = useState(null);
   const map = useMapEvents({
      locationfound(e) {
         setPosition(e.latlng);
         map.flyTo(e.latlng, 10);
      },
   });

   return position === null ? null : (
      <Marker position={position} icon={redIcon}>
         {/* <Popup>You're Location</Popup> */}
      </Marker>
   );
};

export default LocationMarker;