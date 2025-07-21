import { useEffect, useMemo, useState } from "react";
import {
   LayersControl,
   Marker,
   Popup,
   useMap,
   LayerGroup,
} from "react-leaflet";
import { LatLngBounds } from "leaflet";
import { capitalizeEachWord } from "../../utils/functions";
import {
   blueWaterIcon,
   darkBlueWaterIcon,
   greenWaterIcon,
   lightGreenWaterIcon,
   whiteWaterIcon,
} from "./CustomMarkers";
import "./map.css";
import Highlighter from "react-highlight-words";
import DirectionsButton from "./DirectionsButton";

const SpotMarker = ({ spot, onSelect, query }) => {
   const getIcon = (type) => {
      switch (type) {
         case "river":
            return blueWaterIcon;
         case "creek":
            return whiteWaterIcon;
         case "lake":
            return greenWaterIcon;
         case "pond":
            return lightGreenWaterIcon;
         case "ocean":
         default:
            return darkBlueWaterIcon;
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
            <strong>
               <Highlighter
                  highlightClassName="highlight-text"
                  searchWords={[query]}
                  autoEscape={true}
                  textToHighlight={capitalizeEachWord(spot.location_name)}
               />
            </strong>
            <br />
            <Highlighter
               highlightClassName="highlight-text"
               searchWords={[query]}
               autoEscape={true}
               textToHighlight={capitalizeEachWord(spot.feature_name)}
            />
            <br />
            <Highlighter
               highlightClassName="highlight-text"
               searchWords={[query]}
               autoEscape={true}
               textToHighlight={`${spot.city}, ${spot.state}`}
            />
            <br />
            <Highlighter
               highlightClassName="highlight-text"
               searchWords={[query]}
               autoEscape={true}
               textToHighlight={`(${spot.coordinates[0].toFixed(
               2
            )}, ${spot.coordinates[1].toFixed(2)})`}
            />
            <br />
            <DirectionsButton coordinates={spot.coordinates} />
         </Popup>
      </Marker>
   );
};

const MarkerLayer = ({ spots, onSelect, query }) => {
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
                                 query={query}
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
