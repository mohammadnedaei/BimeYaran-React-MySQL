import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddTaskIcon from "@mui/icons-material/AddTask";
import "./Dashboard.css";
import Divider from "@mui/material/Divider";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
const AdminListItems = (props) => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Divider sx={{ my: 2 }} />
      <p style={{ textAlign: "center" }}>دسترسی مدیر</p>
      <Divider sx={{ my: 2 }} />
      <ListItemButton
        onClick={() => {
          navigate("/dashboard/users", {
            state: {
              user_email: props.email,
              user_type: props.type,
              user_id: props.id
            }
          });
        }}
      >
        <p className="drawer-list-item-text">کاربران</p>
        <div className="drawer-list-item-icon">
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
        </div>
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/dashboard/clients", {
            state: {
              user_email: props.email,
              user_type: props.type,
              user_id: props.id
            }
          });
        }}
      >
        <p className="drawer-list-item-text">مشتریان</p>
        <div className="drawer-list-item-icon">
          <ListItemIcon>
            <AssignmentIndIcon />
          </ListItemIcon>
        </div>
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/dashboard/contracts", {
            state: {
              user_email: props.email,
              user_type: props.type,
              user_id: props.id
            }
          });
        }}
      >
        <p className="drawer-list-item-text">بیمه نامه ها</p>
        <div className="drawer-list-item-icon">
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
        </div>
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/dashboard/ApproveContract", {
            state: {
              user_email: props.email,
              user_type: props.type,
              user_id: props.id
            }
          });
        }}
      >
        <p className="drawer-list-item-text">تایید بیمه نامه</p>
        <div className="drawer-list-item-icon">
          <ListItemIcon>
            <AddTaskIcon />
          </ListItemIcon>
        </div>
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/dashboard/ApproveDamage", {
            state: {
              user_email: props.email,
              user_type: props.type,
              user_id: props.id
            }
          });
        }}
      >
        <p className="drawer-list-item-text">تایید خسارت</p>
        <div className="drawer-list-item-icon">
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
        </div>
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/dashboard/transaction", {
            state: {
              user_email: props.email,
              user_type: props.type,
              user_id: props.id
            }
          });
        }}
      >
        <p className="drawer-list-item-text">تراکنش ها</p>
        <div className="drawer-list-item-icon">
          <ListItemIcon>
            <ReceiptLongIcon />
          </ListItemIcon>
        </div>
      </ListItemButton>
    </React.Fragment>
  );
};
export default AdminListItems;
