import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

const Form = ({
  isFetching,
  reFetch,
  setPostcode,
  postcode,
  error,
}: {
  isFetching: boolean;
  reFetch: () => void;
  setPostcode: (value: string) => void;
  postcode: string;
  error: boolean;
}) => {
  const onSubmit = () => {
    reFetch();
  };
  return (
    <Fragment>
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          top: { md: 20, xs: 0 }, // Adjust this value as needed to position the form
          left: { md: 20, xs: 0 }, // Adjust this value as needed to position the form
          padding: { md: 2, xs: 0.5 },
          textAlign: "center",
          width: { xs: "100%", md: 200 }, // Width adjustments for mobile and desktop
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="h5">Crime History</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Postcode"
              variant="outlined"
              margin="normal"
              value={postcode}
              placeholder="LE13 1DD"
              onChange={(e) => setPostcode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            {error && (
              <Typography sx={{ pt: 2, pb: 2 }} variant="body1" color="error">
                Error, please try again.
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              disabled={isFetching || postcode.length === 0}
              onClick={onSubmit}
              color="primary"
            >
              Request
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};
export default Form;
