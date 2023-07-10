import "./Damage.css";
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
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Axios from "axios";
import { Button } from "@mui/material";
let contracts = [];
const Damage = () => {
  const { state } = useLocation();
  const { user_type, user_email, user_id } = state;
  useDocumentTitle("پنل کاربری بیمه یاران - درخواست خسارت ");
  const handleDamage = (contract_id) => {
    Axios.post("http://localhost:3001/check-client-id", {
      user_id: user_id
    }).then((response) => {
      let cl_id = response.data[0]["client_id"];
      Axios.post("http://localhost:3001/add-repay", {
        contract_id: contract_id,
        client_id: cl_id,
        repay_status: "pending"
      }).then((response) => {
        console.log(response);
      });
    });
  };
  const [data, setData] = useState(false);
  useEffect(() => {
    contracts = [];
    Axios.post("http://localhost:3001/check-client-id", {
      user_id: user_id
    }).then((response) => {
      let cli_id = response.data[0]["client_id"];
      Axios.post("http://localhost:3001/user-contract", {
        client_id: cli_id
      }).then((response) => {
        response.data.forEach((transData) => {
          contracts.push(transData);
          setData(true);
        });
      });
      console.log(contracts);
    });
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
                  <p>درخواست خسارت</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>نوع بیمه</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>کد شعبه</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>شماره بیمه</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contracts.map((contract) => (
                <TableRow
                  key={contract.contract_id}
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
                        handleDamage(contract.contract_id);
                      }}
                      className="m-btn"
                      color="secondary"
                      variant="contained"
                      startIcon={<AttachMoneyIcon />}
                    >
                      درخواست خسارت
                    </Button>
                  </TableCell>
                  <TableCell align="center">{contract.insurance_id == 1 ? <p>بیمه اتوموبیل</p> : contract.insurance_id == 2 ? <p>بیمه آتش</p> : <p>بیمه عمر</p>}</TableCell>
                  <TableCell align="center">
                    <p>{contract.branch_id}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p>{contract.contract_id}</p>
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
export default Damage;
