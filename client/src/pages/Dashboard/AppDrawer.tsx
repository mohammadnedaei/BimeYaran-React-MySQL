import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Avatar } from "@mui/material";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import Drawer from "@mui/material/Drawer";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import Divider from "@mui/material/Divider";
import LinesEllipsis from "react-lines-ellipsis";
import List from "@mui/material/List";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import GradeIcon from "@mui/icons-material/Grade";
import Toolbar from "@mui/material/Toolbar";
import { red, deepPurple, cyan, green } from "@mui/material/colors";

import MenuIcon from "@mui/icons-material/Menu";
const drawerWidth = 240;
import "./Dashboard.css";
import DrawerAccess from "./DrawerAccess";
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  })
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  })
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start"
}));

const AppDrawer = (props) => {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <AppBar position="fixed" open={open}>
        <Toolbar className="dashboard-toolbar">
          {open ? (
            <div style={{ margin: "auto" }}>
              <h1 style={{ display: "inline-block" }}>بیمه یاران</h1>
              <img style={{ display: "inline-block" }} className="w-8 h-8 mr-2" src="/favicon/favicon-32x32.png" alt="logo" />
            </div>
          ) : null}
          <div>
            <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerOpen} sx={{ ...(open && { display: "none" }) }}>
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth
          }
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <div>
            <div className="user-icon">
              {props.user_type == "user" ? (
                <Avatar sx={{ bgcolor: cyan[500] }}>
                  {" "}
                  <UserCircleIcon />
                </Avatar>
              ) : props.user_type == "admin" ? (
                <Avatar sx={{ bgcolor: green[500] }}>
                  <ManageAccountsIcon />
                </Avatar>
              ) : props.user_type == "manager" ? (
                <Avatar sx={{ bgcolor: red[500] }}>
                  {" "}
                  <LocalPoliceIcon />
                </Avatar>
              ) : (
                <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  <GradeIcon />
                </Avatar>
              )}
            </div>
            <div className="user-email">
              <LinesEllipsis text={props.user_email} maxLine="0" ellipsis="..." trimRight basedOn="words" />
            </div>
            {props.user_type == "user" ? <p className="user-role bg-sky-500 text-light">کاربر</p> : props.user_type == "admin" ? <p className="user-role bg-green-500 text-light">مدیر</p> : props.user_type == "manager" ? <p className="user-role bg-red-500 text-light">ناظر </p> : <p className="user-role bg-violet-600 text-light">رییس </p>}
          </div>
        </DrawerHeader>
        <Divider />
        <DrawerAccess user_email={props.user_email} user_type={props.user_type} user_id={props.user_id} />
      </Drawer>
    </div>
  );
};
export default AppDrawer;
