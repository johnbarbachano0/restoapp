import * as React from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

const MainList = ({ lists, open }) => {
  return (
    <>
      {lists?.map((list, i) => (
        <Tooltip key={i} title={!open ? list?.item : ""} placement="right">
          <ListItemButton onClick={() => list?.action()}>
            <ListItemIcon>{list?.icon}</ListItemIcon>
            <ListItemText primary={list?.item} />
          </ListItemButton>
        </Tooltip>
      ))}
    </>
  );
};

export default MainList;
