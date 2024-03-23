import { useState } from "react";

// Function to fetch location data based on postcode
const postcodeAPI = async (postcode: string) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${postcode}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch postcode data");
  }

  const data = await response.json();
  return data;
};

// Function to fetch police data based on latitude and longitude
const policeDataAPI = async (lat: string, lng: string) => {
  const response = await fetch(
    `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch police data");
  }

  const data = await response.json();
  return data;
};

// Custom hook to fetch police data based on postcode
const usePoliceData = (postcode: string) => {
  const [isFetching, setIsFetching] = useState(false);
  const [policeData, setPoliceData] = useState([] as any[]);
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [error, setError] = useState(false);

  const refetchAll = async () => {
    try {
      setIsFetching(true);
      setError(false);
      const postcodeData = await postcodeAPI(postcode);
      const policeData = await policeDataAPI(
        postcodeData?.[0]?.lat,
        postcodeData?.[0]?.lon
      ); // Function to fetch police data
      setLocation({
        latitude: postcodeData?.[0]?.lat,
        longitude: postcodeData?.[0]?.lon,
      });

      setPoliceData(policeData);
    } catch (e) {
      console.error("Error fetching data", e);
      setError(true);
    }
    setIsFetching(false);
  };
  return {
    data: policeData,
    isFetching,
    refetch: refetchAll,
    location,
    error,
  };
};

export { usePoliceData }; // Export the custom hook
