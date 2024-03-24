import { ThemeProvider, createTheme } from "@mui/material";
import Form from "./Form"; // Import Form component
import Mapping from "./Mapping"; // Import Mapping component
import { usePoliceData } from "./helper/PoliceData"; // Import custom hook for fetching police data
import { useState } from "react";
import { MapProvider } from "react-map-gl";

// Define theme for MUI components
const themeLight = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#002856",
      light: "#358EFF",
      dark: "#001C3C",
      contrastText: "#fff",
    },
    secondary: {
      main: "#cf0a2c",
      light: "#D83B56",
      dark: "#90071E",
      contrastText: "#fff",
    },
    background: {
      default: "#f1f1f1",
      paper: "#ffffff",
    },
  },
});

// Main App component
function App() {
  // State to store postcode input
  const [postcode, setPostcode] = useState("");

  // Fetch police data based on postcode using custom hook
  const { data, refetch, isFetching, location, error } =
    usePoliceData(postcode);

  // Render the component
  return (
    <ThemeProvider theme={themeLight}>
      <div style={{ position: "relative" }}>
        <MapProvider>
          <Mapping data={data} location={location} />

          <Form
            postcode={postcode}
            setPostcode={setPostcode}
            reFetch={refetch}
            isFetching={isFetching}
            error={error}
          />
        </MapProvider>
      </div>
    </ThemeProvider>
  );
}

export default App; // Export the App component
