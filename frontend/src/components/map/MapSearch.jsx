import { useEffect, useMemo, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import { capitalizeEachWord } from "../../utils/functions";
import { redIcon } from "./CustomMarkers";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { FaSearch } from "react-icons/fa";
import "./map.css";

const POSITION_CLASSES = {
   bottomleft: "leaflet-bottom leaflet-left",
   bottomright: "leaflet-bottom leaflet-right",
   topleft: "leaflet-top leaflet-left",
   topright: "leaflet-top leaflet-right",
};

const MapSearch = ({ position, query, onSearch, onSubmit }) => {
   const map = useMap();

   const filter = useMemo(() => (
      <div className="map-filter d-flex flex-column align-items-center">
         <Form onSubmit={(event) => onSubmit(event)}>
            <InputGroup>
               <Form.Control
                  type="text"
                  placeholder="Search"
                  value={query}
                  onChange={(event) => onSearch(event.target.value)}
                  controlid="mapSearch"
               />
               <Button variant="" type="submit" id="search-button">
                  <FaSearch />
               </Button>
            </InputGroup>
         </Form>
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

export default MapSearch;
