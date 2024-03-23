import {
  Divider,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Form from "./Form"; // Import Form component
import Mapping from "./Mapping"; // Import Mapping component
import { usePoliceData } from "./helper/PoliceData"; // Import custom hook for fetching police data
import { useState } from "react";

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
      <div>
        {/* Grid container for layout */}
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }} // Set minimum height
        >
          {/* Grid item for main content */}
          <Grid item xs={12} sm={8} md={6} lg={4}>
            {/* Paper component for styling */}
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                textAlign: "center",
                // Set width
                width: "100%",
                maxWidth: "400px", // Adjust maximum width for mobile
              }}
            >
              {/* Typography for heading */}
              <Typography variant="h5" mb={1}>
                Crime History
              </Typography>
              {/* Divider for separation */}
              <Divider />
              {/* Form component for postcode input */}
              <Form
                postcode={postcode}
                setPostcode={setPostcode}
                reFetch={refetch}
                isFetching={isFetching}
              />
              {error && (
                <Typography sx={{ pt: 2, pb: 2 }} variant="body1" color="error">
                  Error, please try again. Use a post code like LE13 1DD
                </Typography>
              )}
              {/* Divider for separation */}
              <Divider />
              {/* Spacer */}
              <div style={{ paddingTop: 10 }} />
              {/* Mapping component for displaying map */}
              <Mapping data={data} location={location} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App; // Export the App component
