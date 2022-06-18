import React from "react";
import { Box, Button } from "@mui/material";

const SubmitButtons = (props) => {
  const handleSubmit = () => props.onSubmit();
  const handleClear = () => props.onClear();
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        width: "100%",
        ...props.sx,
      }}
    >
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ flex: 3, mr: 1, py: 1.5 }}
        disabled={props?.isLoading || !props.allowSubmit}
      >
        Submit
      </Button>
      <Button
        variant="contained"
        color="nuetral"
        sx={{ flex: 1, py: 1.5 }}
        onClick={handleClear}
        disabled={props?.isLoading}
      >
        {props?.reset ? "Reset" : "Clear"}
      </Button>
    </Box>
  );
};

export default SubmitButtons;
