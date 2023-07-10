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
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Button } from "@mui/material";
import { VerifiedUser } from "@mui/icons-material";
let contracts = [];
const ApproveContract = () => {
  const navigate = useNavigate();
  const handleApprove = (contract_id) => {
    console.log(contract_id);
    Axios.post("http://localhost:3001/approve-contract", {
      contract_id: contract_id
    }).then((response) => {
      console.log(response);
      navigate(0);
    });
  };
  useDocumentTitle("پنل کاربری بیمه یاران - تایید بیمه نامه ها ");
  const { state } = useLocation();
  const { user_type, user_email, user_id } = state;
  const [data, setData] = useState(false);
  useEffect(() => {
    Axios.post("http://localhost:3001/get-pending-contracts").then((response) => {
      contracts = [];
      response.data.forEach((transData) => {
        contracts.push(transData);
        setData(true);
      });
    });
    console.log(contracts);
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
                  <p>وضعیت بیمه</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>نوع بیمه</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>شماره تراکنش</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>کد شعبه</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>شماره مشتری</p>
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
                        handleApprove(contract.contract_id);
                      }}
                      className="m-btn"
                      variant="contained"
                      startIcon={<VerifiedUser />}
                    >
                      تایید بیمه نامه
                    </Button>
                  </TableCell>
                  <TableCell align="center">{contract.insurance_id == 1 ? <p>بیمه اتوموبیل</p> : contract.insurance_id == 2 ? <p>بیمه آتش</p> : <p>بیمه عمر</p>}</TableCell>
                  <TableCell align="center">
                    <p>{contract.transaction_id}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p>{contract.branch_id}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p>{contract.client_id}</p>
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
export default ApproveContract;
