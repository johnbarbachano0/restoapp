import React from "react";
import { Box, Icon, Typography } from "@mui/material";

const HeadLabel = (props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      {props.icon && <Icon sx={{ color: "#3AB0FF" }}>{props.icon}</Icon>}
      <Typography sx={{ color: "#3AB0FF", ...props?.sx }}>
        {props.children}
      </Typography>
    </Box>
  );
};

export default HeadLabel;
