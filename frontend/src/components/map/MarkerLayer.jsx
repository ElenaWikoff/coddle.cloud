import { useEffect, useMemo, useState } from "react";
import { LayersControl, Marker, Popup, useMap, LayerGroup } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import { capitalizeEachWord } from "../../utils/functions";
import {
   blueIcon,
   goldIcon,
   orangeIcon,
   greenIcon,
   violetIcon,
} from "./CustomMarkers";
import "./map.css";

const SpotMarker = ({ spot, onSelect }) => {
   const getIcon = (type) => {
      switch (type) {
         case "river":
            return goldIcon;
         case "creek":
            return orangeIcon;
         case "lake":
            return greenIcon;
         case "pond":
            return violetIcon;
         case "ocean":
         default:
            return blueIcon;
      }
   };

   return (
      <Marker
         position={spot.coordinates}
         eventHandlers={{
            click: () => onSelect(spot),
            touch: () => onSelect(spot),
         }}
         icon={getIcon(spot.type)}
      >
         <Popup>
            <strong>{capitalizeEachWord(spot.location_name)}</strong>
            <br />
            {capitalizeEachWord(spot.feature_name)}
            <br />
            {`${spot.city}, ${spot.state}`}
            <br />
            {`(${spot.coordinates[0].toFixed(
               2
            )}, ${spot.coordinates[1].toFixed(2)})`}
         </Popup>
      </Marker>
   );
};

const MarkerLayer = ({ spots, onSelect }) => {
   const map = useMap();

   const splitByType = () => {
      const types = ["river", "creek", "lake", "pond", "ocean"];
      let result = [];
      types.forEach((type) => {
         const slice = spots.filter((spot) => spot.type === type);
         const object = {
            type,
            spots: [...slice],
         };
         result.push(object);
      });
      console.log(result);
      return result;
   };

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
      <LayersControl position="topright">
         {spots &&
            spots.length > 0 &&
            splitByType().map((split) => {
               return (
                  <LayersControl.Overlay
                     key={`layer-overlay-${split.type}`}
                     checked
                     name={`${capitalizeEachWord(split.type)}`}
                  >
                     <LayerGroup>
                        {split.spots.map((spot, index) => {
                           return (
                              <SpotMarker
                                 key={`${split.type}-spot-${index}`}
                                 spot={spot}
                                 onSelect={onSelect}
                              />
                           );
                        })}
                     </LayerGroup>
                  </LayersControl.Overlay>
               );
            })}
      </LayersControl>
   );
};

export default MarkerLayer;
