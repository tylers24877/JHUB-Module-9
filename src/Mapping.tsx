import { Fragment } from "react/jsx-runtime";
import ReactMapGL, {
  Layer,
  NavigationControl,
  Popup,
  Source,
  useMap,
} from "react-map-gl";
import { useMapProcessor } from "./helper/MapProcessor";
import { useEffect, useState } from "react";
import type { CircleLayer, MapLayerMouseEvent } from "react-map-gl";

const layerStyle: CircleLayer = {
  id: "places",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};

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
  const [hoverInfo, setHoverInfo] = useState<any>(null);
  const { mapA } = useMap();

  // Effect to process data when it changes
  useEffect(() => {
    process(data);
  }, [data]); // error: 'process' is missing in the dependency array  can be ignored

  // Effect to update map view when location changes
  useEffect(() => {
    if (location.latitude && location.longitude) {
      mapA?.flyTo({
        center: [parseFloat(location.longitude), parseFloat(location.latitude)],
        zoom: 13,
      });
    }
  }, [location, mapA]);

  useEffect(() => {
    const handleMouseMove = (event: MapLayerMouseEvent) => {
      const segment = (event.features && event.features[0]) || null;
      setHoverInfo({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        category: segment?.properties?.category,
      });
    };

    const handleMouseLeave = () => {
      setHoverInfo(null);
    };

    if (mapA) {
      mapA.on("mousemove", "places", handleMouseMove);
      mapA.on("mouseleave", "places", handleMouseLeave);
    }

    return () => {
      if (mapA) {
        mapA.off("mousemove", "places", handleMouseMove);
        mapA.off("mouseleave", "places", handleMouseLeave);
      }
    };
  }, [mapA]);

  const selectedSegment = (hoverInfo && hoverInfo?.category) || "";

  // Render Mapping component
  return (
    <Fragment>
      {/* ReactMapGL component to render map */}
      <ReactMapGL
        id="mapA" // map container id
        mapLib={import("mapbox-gl")} // import mapbox-gl library
        style={{ width: "100%", height: "100vh" }} // map container style
        mapStyle="mapbox://styles/mapbox/standard" // map style
        initialViewState={{
          latitude: 51.5074, // default latitude (London)
          longitude: 0.1278, // default longitude (London)
          zoom: 13, // default zoom level
        }}
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
        {selectedSegment && (
          <Popup
            longitude={hoverInfo?.longitude}
            latitude={hoverInfo?.latitude}
            anchor="bottom"
            closeButton={false}
          >
            {selectedSegment}
          </Popup>
        )}
        <NavigationControl />
      </ReactMapGL>
    </Fragment>
  );
};

export default Mapping; // Export Mapping component
