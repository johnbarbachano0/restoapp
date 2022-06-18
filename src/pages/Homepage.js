import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MainList from "../components/MainList";
import useCommon from "../components/useCommon";
//Icons
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
//Components
import AppearanceButton from "../components/AppearanceButton";
import CustomAppbar from "../components/CustomAppbar";
import CustomDrawer from "../components/CustomDrawer";
import CustomToolbar from "../components/CustomToolbar";
import Menu from "../components/Modules/Menu";
import UserInfo from "../components/Modules/UserInfo";
import ConfirmModal from "../components/ConfirmModal";
//Redux
import { useDispatch } from "react-redux";
import { setLogout } from "../features/AuthSlice";

const Homepage = () => {
  const [confirm, setConfirm] = useState(false);
  const dispatch = useDispatch();
  const { isMid } = useCommon();
  const modules = [
    {
      id: 1,
      item: "Menu",
      icon: <RestaurantMenuIcon />,
      display: <Menu />,
      action: () => setModule(1),
    },
    {
      id: 2,
      item: "User",
      icon: <AccountCircleIcon />,
      display: <UserInfo />,
      action: () => setModule(2),
    },
  ];

  const logout = [
    {
      id: 1,
      item: "Logout",
      icon: <ExitToAppRoundedIcon />,
      action: () => setConfirm(true),
    },
  ];

  const [module, setModule] = useState(1);
  const [open, setOpen] = useState(false);

  //Functions
  const toggleDrawer = () => setOpen(!open);
  const getModule = (id) => modules?.filter((list) => list?.id === id)?.shift();
  const logoutUser = () => dispatch(setLogout());
  const handleClose = () => setConfirm(false);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Appbar */}
      <CustomAppbar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
              color: "#fff",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" noWrap sx={{ flexGrow: 1 }}>
            {getModule(module)?.item}
          </Typography>
          <AppearanceButton />
        </Toolbar>
      </CustomAppbar>

      {/* Drawer */}
      <CustomDrawer variant="permanent" open={open}>
        <CustomToolbar>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </CustomToolbar>
        <Divider />
        <List component="nav">
          <MainList lists={modules} open={open} />
          <Divider sx={{ my: 1 }} />
          <MainList lists={logout} open={open} />
          <Divider sx={{ my: 1 }} />
        </List>
      </CustomDrawer>

      {/* Module Display */}
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          pt: isMid ? 6 : 7, //add top padding so appbar will not cover modules
        }}
      >
        {getModule(module)?.display}
      </Box>

      {/* Confirm Modal */}
      <ConfirmModal
        open={confirm}
        message={"Logout"}
        onClose={handleClose}
        onConfirm={logoutUser}
      />
    </Box>
  );
};

export default Homepage;
