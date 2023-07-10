import "./Users.css";
import Box from "@mui/material/Box";
import Drawer from "../../AppDrawer";
import useDocumentTitle from "../../../../hook/useDocumentTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
let users = [];
const Users = () => {
  useDocumentTitle("پنل کاربری بیمه یاران - کاربران ");
  const { state } = useLocation();
  const { user_type, user_email, user_id } = state;
  const [data, setData] = useState(false);
  useEffect(() => {
    Axios.post("http://localhost:3001/users").then((response) => {
      users = [];
      response.data.forEach((transData) => {
        users.push(transData);
        setData(true);
      });
    });
    console.log(users);
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Drawer user_type={user_type} user_email={user_email} user_id={user_id} />
      </Box>
      <div className="transactions-wrapper">
        <TableContainer className="table-container" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell className="table-cell" align="center">
                  <p>سطح کاربری</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>ایمیل</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>شماره کاربری</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.user_id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0
                    }
                  }}
                >
                  <TableCell align="center">{user.user_type == "user" ? <p className={user.user_type}>کاربر</p> : user.user_type == "admin" ? <p className={user.user_type}>مدیر</p> : user.user_type == "manager" ? <p className={user.user_type}>ناظر</p> : <p className={user.user_type}>رییس</p>}</TableCell>
                  <TableCell align="center">
                    <p>{user.email}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p>{user.user_id}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
export default Users;
