import React, { useState, useEffect } from "react";
import { Box, Switch, Typography } from "@mui/material";

const CustomSwitch = ({ value, label, onChange, disabled, ...props }) => {
  const [checked, setChecked] = useState(value);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    onChange(event.target.checked);
  };

  useEffect(() => {
    setChecked(value);
  }, [value]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        ...props.sx,
      }}
    >
      <Switch checked={checked} onChange={handleChange} disabled={disabled} />
      <Typography sx={{ fontSize: "1rem", position: "relative", top: 7 }}>
        {label}
      </Typography>
    </Box>
  );
};

export default CustomSwitch;
