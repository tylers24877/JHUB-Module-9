import { Fragment } from "react/jsx-runtime";
import ReactMapGL, { Marker } from "react-map-gl";
import { useMapProcessor } from "./helper/MapProcessor";
import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";

// Mapping component
const Mapping = ({
  data, // array of data used for mapping
  location, // object containing latitude and longitude
}: {
  data: any[]; // data array
  location: {
    latitude: string;
    longitude: string;
  }; // location object with latitude and longitude strings
}) => {
  // Custom hook to process map data
  const { geojson, process } = useMapProcessor();

  // State to manage view state of the map
  const [viewState, setViewState] = useState({
    latitude: 51.5074, // default latitude (London)
    longitude: 0.1278, // default longitude (London)
    zoom: 13, // default zoom level
  });

  // Effect to process data when it changes
  useEffect(() => {
    process(data);
  }, [data]); // error: 'process' is missing in the dependency array  can be ignored

  // Effect to update map view when location changes
  useEffect(() => {
    if (location.latitude && location.longitude) {
      setViewState({
        latitude: parseFloat(location.latitude), // update latitude
        longitude: parseFloat(location.longitude), // update longitude
        zoom: 13, // reset zoom level
      });
    }
  }, [location]);

  // Render Mapping component
  return (
    <Fragment>
      {/* ReactMapGL component to render map */}
      <ReactMapGL
        mapLib={import("mapbox-gl")} // import mapbox-gl library
        {...viewState} // spread view state props
        onMove={(evt) => setViewState(evt.viewState)} // handle map movement
        style={{ width: "100%", height: 300 }} // map container style
        mapStyle="mapbox://styles/mapbox/streets-v9" // map style
      >
        {/* Render markers on the map */}
        {geojson.map((feature: any, index: number) => {
          return (
            <Marker
              key={feature.properties.id} // unique key for marker
              longitude={feature.geometry.coordinates[0]} // longitude of marker
              latitude={feature.geometry.coordinates[1]} // latitude of marker
              anchor="bottom" // anchor position of marker
            >
              {/* Tooltip to display information */}
              <Tooltip
                title={`${feature.properties.month}: ${feature.properties.category}`} // tooltip content
              >
                <PlaceIcon />
              </Tooltip>
            </Marker>
          );
        })}
      </ReactMapGL>
    </Fragment>
  );
};

export default Mapping; // Export Mapping component
