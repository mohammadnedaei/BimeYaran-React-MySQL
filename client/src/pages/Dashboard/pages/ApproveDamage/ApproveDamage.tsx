import "../Contracts/Contracts.css";
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
import { Button } from "@mui/material";
import { VerifiedUser } from "@mui/icons-material";
let damage = [];
const ApproveDamage = () => {
  const handleApprove = (repay_id) => {
    console.log(repay_id);
    Axios.post("http://localhost:3001/approve-damage", {
      repay_id: repay_id
    }).then((response) => {
      console.log(response);
      Axios.post("http://localhost:3001/get-repay", {
        repay_id: repay_id
      }).then((response) => {
        let cli_id = response.data[0]["client_id"];
        let contract_id = response.data[0]["contract_id"];
        console.log(response);
        Axios.post("http://localhost:3001/get-user", {
          client_id: cli_id
        }).then((response) => {
          console.log(response);
          let user_id = response.data[0]["user_id"];
          Axios.post("http://localhost:3001/get-contract", {
            contract_id: contract_id
          }).then((response) => {
            console.log(response);
            let branch_id = response.data[0]["branch_id"];
            let insurance_id = response.data[0]["insurance_id"];
            let transaction_id = response.data[0]["transaction_id"];
            Axios.post("http://localhost:3001/get-transaction", {
              transaction_id: transaction_id
            }).then((response) => {
              console.log(response);
              let insurance_price = response.data[0]["transaction_amount"];
              const currentDate = new Date();
              const year = currentDate.getFullYear();
              const month = String(currentDate.getMonth() + 2).padStart(2, "0");
              const day = String(currentDate.getDate()).padStart(2, "0");
              const formattedDate = `${year}-${month}-${day}`;
              Axios.post("http://localhost:3001/add-transaction", {
                user_id: user_id,
                branch_id: branch_id,
                transaction_date: formattedDate,
                transaction_amount: insurance_price,
                insurance_id: insurance_id,
                transaction_type: "damage"
              }).then((response) => {
                console.log(response);
              });
            });
          });
        });
      });
      // navigate(0);
    });
  };
  useDocumentTitle("پنل کاربری بیمه یاران - تایید خسارت ");
  const { state } = useLocation();
  const { user_type, user_email, user_id } = state;
  const [data, setData] = useState(false);
  useEffect(() => {
    Axios.post("http://localhost:3001/get-pending-damage").then((response) => {
      damage = [];
      response.data.forEach((transData) => {
        damage.push(transData);
        setData(true);
      });
    });
    console.log(damage);
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
                  <p>تایید خسارت</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>شماره بیمه</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>شماره مشتری</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {damage.map((dmg) => (
                <TableRow
                  key={dmg.repay_id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0
                    }
                  }}
                >
                  <TableCell align="center">
                    <Button
                      size="small"
                      onClick={() => {
                        handleApprove(dmg.repay_id);
                      }}
                      className="m-btn"
                      variant="contained"
                      startIcon={<VerifiedUser />}
                    >
                      تایید خسارت
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <p>{dmg.contract_id}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p>{dmg.client_id}</p>
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
export default ApproveDamage;
