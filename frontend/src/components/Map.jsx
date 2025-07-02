import { useEffect, useState } from "react";
import {
   MapContainer,
   TileLayer,
   Marker,
   Popup,
   useMap,
   useMapEvents,
} from "react-leaflet";
import { LatLngBounds } from "leaflet";
import { capitalizeEachWord } from "../utils/functions";

function getCentroid(spots) {
   let sumX = 0;
   let sumY = 0;
   const n = spots.length;
   spots.forEach((spot) => {
      sumX += spot.coordinates[0];
      sumY += spot.coordinates[1];
   });
   const centroid = [sumX / n, sumY / n];
   return centroid;
}

const SpotMarkers = ({ spots, onSelect }) => {
   const map = useMap();

   useEffect(() => {
      if (spots.length > 0) {
         const bounds = new LatLngBounds(
            spots.map((spot) => {
               const x = spot.coordinates[0];
               const y = spot.coordinates[1];
               return [x, y];
            })
         );
         map.fitBounds(bounds);
      }
   }, []);

   return (
      <>
         {spots &&
            spots.map((spot, index) => {
               return (
                  <Marker
                     key={`spot-${index}`}
                     position={spot.coordinates}
                     eventHandlers={{ click: () => onSelect(spot) }}
                  >
                     <Popup>
                        {capitalizeEachWord(spot.feature_name)}
                        <br />
                        {`(${spot.coordinates[0].toFixed(
                           2
                        )}, ${spot.coordinates[1].toFixed(2)})`}
                     </Popup>
                  </Marker>
               );
            })}
      </>
   );
};

const Map = ({ spots, onSelect }) => {
   const centroid = getCentroid(spots);

   return (
      <MapContainer center={centroid} zoom={13} className="w-100 h-100">
         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         <SpotMarkers spots={spots} onSelect={onSelect} />
      </MapContainer>
   );
};

export default Map;
