import "./Transaction.css";
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
let transactions = [];
const Transactions = () => {
  useDocumentTitle("پنل کاربری بیمه یاران - تراکنش ها");
  const { state } = useLocation();
  const { user_type, user_email, user_id } = state;
  const [data, setData] = useState(false);
  useEffect(() => {
    Axios.post("http://localhost:3001/transactions").then((response) => {
      transactions = [];
      response.data.forEach((transData) => {
        transactions.push(transData);
        setData(true);
      });
    });
    console.log(transactions);
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
                  <p>نوع تراکنش</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>نوع بیمه</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>مبلغ تراکنش</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>تاریخ تراکنش</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>کد شعبه</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>شماره کاربری</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>شماره تراکنش</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  className={transaction.transaction_type}
                  key={transaction.transaction_id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0
                    }
                  }}
                >
                  {transaction.transaction_type == "sales" ? (
                    <TableCell align="center">
                      <p>فروش</p>
                    </TableCell>
                  ) : (
                    <TableCell align="center">
                      <p>پرداخت خسارت</p>
                    </TableCell>
                  )}
                  <TableCell align="center">{transaction.insurance_id == 1 ? <p>بیمه اتوموبیل</p> : transaction.insurance_id == 2 ? <p>بیمه آتش</p> : <p>بیمه عمر</p>}</TableCell>
                  <TableCell align="center">
                    <p>{transaction.transaction_amount}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p>{transaction.transaction_date}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p>{transaction.branch_id}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p>{transaction.user_id}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p>{transaction.transaction_id}</p>
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
export default Transactions;
