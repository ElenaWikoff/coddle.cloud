import {
   MapContainer,
   TileLayer,
   useMapEvents,
} from "react-leaflet";
import MarkerLayer from "./MarkerLayer";
import MapSearch from "./MapSearch";
import LocateControl from "./LocateControl";
import LocationMarker from "./LocationMarker";
import { useState } from "react";

function getCentroid(spots) {
   if (!spots || spots.length === 0) {
      return [0,0];
   }
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

const Map = ({ spots, onSelect, query, onSearch, onSubmit }) => {
   const centroid = getCentroid(spots);

   return (
      <MapContainer center={centroid} zoom={13} className="w-100 h-100" onLoca>
         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors. <a href="https://www.flaticon.com/free-icons/river" title="icons">River Icon created by Freepik - Flaticon</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         <MarkerLayer spots={spots} onSelect={onSelect} query={query} />
         <MapSearch position="bottomleft" query={query} onSearch={onSearch} onSubmit={onSubmit} />
         <LocateControl position="topleft" />
         <LocationMarker />
      </MapContainer>
   );
};

export default Map;
