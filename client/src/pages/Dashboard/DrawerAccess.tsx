import UserListItems from "./UserListItems";
import AdminListItems from "./AdminListItems";
import ManagerListItems from "./ManagerListItems";
import List from "@mui/material/List";
import * as React from "react";

const DrawerAccess = (props) => {
  return (
    <div style={{ height: "1px" }}>
      <List style={{ overflow: "hidden" }} component="nav">
        {props.user_type == "user" ? (
          <UserListItems email={props.user_email} type={props.user_type} id={props.user_id} />
        ) : props.user_type == "admin" ? (
          <div>
            <UserListItems email={props.user_email} type={props.user_type} id={props.user_id} /> <AdminListItems email={props.user_email} type={props.user_type} id={props.user_id} />
          </div>
        ) : props.user_type == "manager" ? (
          <div>
            <UserListItems email={props.user_email} type={props.user_type} id={props.user_id} />
            <AdminListItems email={props.user_email} type={props.user_type} id={props.user_id} />
            <ManagerListItems email={props.user_email} type={props.user_type} id={props.user_id} />
          </div>
        ) : (
          <UserListItems email={props.user_email} type={props.user_type} id={props.user_id} />
        )}
      </List>
    </div>
  );
};
export default DrawerAccess;
