import * as React from "react";
import {
  AppBar,
  Box,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialog = ({ open, onClose, title, ...props }) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Box>
            <Typography
              sx={{ ml: 2, flex: 1, fontSize: 12 }}
              variant="h6"
              component="div"
            >
              {title}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          mt: 9,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props?.children}
      </Box>
    </Dialog>
  );
};

export default CustomDialog;
