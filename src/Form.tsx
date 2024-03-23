import { Button, TextField } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

const Form = ({
  isFetching,
  reFetch,
  setPostcode,
  postcode,
}: {
  isFetching: boolean;
  reFetch: () => void;
  setPostcode: (value: string) => void;
  postcode: string;
}) => {
  const onSubmit = () => {
    reFetch();
  };
  return (
    <Fragment>
      <TextField
        fullWidth
        label="Postcode"
        variant="outlined"
        margin="normal"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        disabled={isFetching}
        onClick={onSubmit}
        color="primary"
      >
        Request
      </Button>
    </Fragment>
  );
};
export default Form;
