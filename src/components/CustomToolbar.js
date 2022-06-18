import React from "react";
import Toolbar from "@mui/material/Toolbar";

const CustomToolbar = (props) => {
  return (
    <Toolbar
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        px: [1],
        ...props?.sx,
      }}
      {...props}
    >
      {props?.children}
    </Toolbar>
  );
};

export default CustomToolbar;
