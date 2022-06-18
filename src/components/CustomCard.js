import React from "react";
import { Card } from "@mui/material";

const CustomCard = (props) => {
  return (
    <Card
      {...props}
      sx={{
        flexGrow: 1,
        height: "100%",
        overflowY: "scroll",
        p: 1,
        pt: 2,
        ...props.sx,
      }}
    >
      {props.children}
    </Card>
  );
};

export default CustomCard;
