import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import "./Dashboard.css";
import LogoutIcon from "@mui/icons-material/Logout";
const userListItems = (props) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => {
          navigate("/dashboard", {
            state: {
              user_email: props.email,
              user_type: props.type,
              user_id: props.id
            }
          });
        }}
      >
        <p className="drawer-list-item-text">داشبورد</p>
        <div className="drawer-list-item-icon">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
        </div>
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/dashboard/buy", {
            state: {
              user_email: props.email,
              user_type: props.type,
              user_id: props.id
            }
          });
        }}
      >
        <p className="drawer-list-item-text">سفارش بیمه</p>
        <div className="drawer-list-item-icon">
          <ListItemIcon>
            <ContactEmergencyIcon />
          </ListItemIcon>
        </div>
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/dashboard/damage", {
            state: {
              user_email: props.email,
              user_type: props.type,
              user_id: props.id
            }
          });
        }}
      >
        <p className="drawer-list-item-text">درخواست خسارت</p>
        <div className="drawer-list-item-icon">
          <ListItemIcon>
            <AddBusinessIcon />
          </ListItemIcon>
        </div>
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/dashboard/changepassword", {
            state: {
              user_email: props.email,
              user_type: props.type,
              user_id: props.id
            }
          });
        }}
      >
        <p className="drawer-list-item-text">تغییر رمز عبور</p>
        <div className="drawer-list-item-icon">
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
        </div>
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/", { replace: true });
          navigate(0);
        }}
      >
        <p className="drawer-list-item-text">خروج از حساب</p>
        <div className="drawer-list-item-icon">
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
        </div>
      </ListItemButton>
    </React.Fragment>
  );
};
export default userListItems;
