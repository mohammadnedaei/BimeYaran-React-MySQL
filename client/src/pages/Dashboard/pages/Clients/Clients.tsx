import "../Users/Users.css";
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
let clients = [];
const Clients = () => {
  useDocumentTitle("پنل کاربری بیمه یاران - مشتریان ");
  const { state } = useLocation();
  const { user_type, user_email, user_id } = state;
  const [data, setData] = useState(false);
  useEffect(() => {
    Axios.post("http://localhost:3001/clients").then((response) => {
      clients = [];
      response.data.forEach((transData) => {
        clients.push(transData);
        setData(true);
      });
    });
    console.log(clients);
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
                  <p>تاریخ تولد</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>شماره تلفن</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>آدرس</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>نام خانوادگی</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>نام</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>شماره کاربری</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>شماره مشتری</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow
                  key={client.user_id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0
                    }
                  }}
                >
                  <TableCell align="center">
                    <p>{client.client_birthday}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p>{client.client_phone}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p>{client.client_address}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p>{client.client_fname}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p>{client.client_name}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p>{client.user_id}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p>{client.client_id}</p>
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
export default Clients;
