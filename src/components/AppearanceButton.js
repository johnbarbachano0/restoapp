import React, { useState, useEffect, useCallback } from "react";
import { IconButton } from "@mui/material";
import DarkIcon from "@mui/icons-material/ModeNight";
import LightIcon from "@mui/icons-material/LightMode";
import { setDark } from "../features/Appearance";
import { useSelector, useDispatch } from "react-redux";

const AppearanceButton = () => {
  const { dark } = useSelector((state) => state.appearance);
  const [mode, setMode] = useState(dark);
  const dispatch = useDispatch();
  const dispatchMode = useCallback(
    (mode) => {
      dispatch(setDark(mode));
    },
    [dispatch]
  );

  //Functions
  const handleMode = () => setMode((prev) => !prev);

  //Listeners
  useEffect(() => {
    dispatchMode(mode);
  }, [dispatchMode, mode]);

  return (
    <IconButton
      color="info"
      aria-label="set apperance button"
      component="span"
      onClick={handleMode}
      sx={{
        position: "fixed",
        right: 0,
        m: 1,
        zIndex: 10,
        transition: ".75s",
        opacity: 0.85,
        "&:hover": { opacity: 1, color: "yellow" },
      }}
    >
      {dark ? <DarkIcon /> : <LightIcon />}
    </IconButton>
  );
};

export default AppearanceButton;
