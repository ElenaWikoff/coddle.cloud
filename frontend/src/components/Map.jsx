import { useEffect, useMemo, useState } from "react";
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
import Form from "react-bootstrap/Form";

const POSITION_CLASSES = {
   bottomleft: "leaflet-bottom leaflet-left",
   bottomright: "leaflet-bottom leaflet-right",
   topleft: "leaflet-top leaflet-left",
   topright: "leaflet-top leaflet-right",
};

const BOUNDS_STYLE = { weight: 1 };

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
                     eventHandlers={{
                        click: () => onSelect(spot),
                        touch: () => onSelect(spot),
                     }}
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

const FilterControl = ({ position, onClick }) => {
   const map = useMap();

   const filter = useMemo(() => (
      <div className="map-filter py-2 px-4 d-flex flex-column align-items-center">
         <h5 className="fw-light">Filter</h5>
         <Form>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
               <Form.Label>Feature</Form.Label>
               <Form.Check type="checkbox" label="River" />
               <Form.Check type="checkbox" label="Lake" />
               <Form.Check type="checkbox" label="Pond" />
            </Form.Group>
         </Form>
         <small>Under Construction</small>
      </div>
   ));

   const positionClass =
      (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
   return (
      <div className={`${positionClass}`}>
         <div
            className="leaflet-control leaflet-bar"
            style={{ backgroundColor: "white" }}
         >
            {filter}
         </div>
      </div>
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
         <FilterControl position="topright" />
      </MapContainer>
   );
};

export default Map;
