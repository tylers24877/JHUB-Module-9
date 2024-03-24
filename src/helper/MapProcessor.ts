import { useState } from "react";
import type { FeatureCollection } from "geojson";
import { Feature, Point } from "geojson";

// Custom hook to process map data
const useMapProcessor = () => {
  // State to store GeoJSON data
  const [geojson, setGeojson] = useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.4, 37.8] },
        properties: { id: "1", category: "test" },
      },
    ],
  });

  // Function to process data
  const process = (data: any) => {
    let count = 0; // Counter to limit the number of features

    setGeojson({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [-122.4, 37.8] },
          properties: { id: "1", category: "test" },
        },
      ],
    }); // Clear the previous GeoJSON data
    const updatedFeatures: any[] = [];

    // Loop through the data
    data?.forEach((item: any) => {
      if (count >= 100) return; // Exit loop if 100 features have been added

      // Create a feature object
      const feature: Feature<Point, { id: string; category: string }> = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            parseFloat(item.location.longitude),
            parseFloat(item.location.latitude),
          ],
        },
        properties: {
          id: item.id,
          category: item.category,
        },
      };

      // Update GeoJSON state by appending the new feature
      updatedFeatures.push(feature); // Append the new feature
      count++;
    });
    // Update GeoJSON state with the updated features
    setGeojson({
      type: "FeatureCollection",
      features: updatedFeatures,
    });
  };
  // Return GeoJSON data and the process function
  return { geojson, process };
};

export { useMapProcessor }; // Export the custom hook
