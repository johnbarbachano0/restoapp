import React from "react";
import { Box, InputAdornment, IconButton, TextField } from "@mui/material";

//Icons
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";

const Filter = ({ onChange, onClear, ...props }) => {
  return (
    <Box sx={{ minWidth: "50%", maxWidth: 300 }}>
      <TextField
        label="Filter..."
        variant="outlined"
        fullWidth
        autoFocus
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FilterListIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => onClear()}
                sx={{
                  "&:hover": { cursor: "pointer", color: "red" },
                  transition: "1s",
                }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ my: 1 }}
      />
    </Box>
  );
};

export default Filter;
