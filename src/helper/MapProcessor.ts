import { useState } from "react";

// Custom hook to process map data
const useMapProcessor = () => {
  // State to store GeoJSON data
  const [geojson, setGeojson] = useState<any[]>([]);

  // Function to process data
  const process = (data: any) => {
    let count = 0; // Counter to limit the number of features

    setGeojson([]); // Clear the previous GeoJSON data

    // Loop through the data
    data?.forEach((item: any) => {
      if (count >= 50) return; // Exit loop if 50 features have been added

      // Create a feature object
      const feature = {
        geometry: {
          coordinates: [
            parseFloat(item.location.longitude),
            parseFloat(item.location.latitude),
          ],
        },
        properties: {
          id: item.id,
          category: item.category,
          month: item.month,
        },
      };

      // Update GeoJSON state by appending the new feature
      setGeojson((prevGeojson) => [...prevGeojson, feature]);
      count++;
    });
  };
  // Return GeoJSON data and the process function
  return { geojson, process };
};

export { useMapProcessor }; // Export the custom hook
