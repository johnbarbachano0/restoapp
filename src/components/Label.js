import { Typography } from "@mui/material";
import React from "react";

const Label = ({ label, value, type = 1, ...props }) => {
  return (
    <Typography variant="h8" component={"div"} sx={{ py: 0.5 }}>
      <Typography
        component={type === 1 ? "span" : "div"}
        sx={{ fontWeight: "bold" }}
      >
        {label}:{" "}
      </Typography>
      <Typography
        component={type === 1 ? "span" : "div"}
        sx={{ overflowWrap: "break-word" }}
      >
        {value}
      </Typography>
    </Typography>
  );
};

export default Label;
