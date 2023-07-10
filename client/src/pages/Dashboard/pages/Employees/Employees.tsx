import "./Employees.css";
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
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
let employees = [];
const Employees = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  const englishNumbers = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g];
  useDocumentTitle("پنل کاربری بیمه یاران - کارمندان");
  const { state } = useLocation();
  const { user_type, user_email, user_id } = state;
  const [wrongInfo, setWrongInfo] = useState(false);
  const [empId, setEmpId] = useState("");
  const [userId, setUserId] = useState("");
  const [empName, setEmpName] = useState("");
  const [nNum, setnNum] = useState("");
  const [salary, setSalary] = useState("");
  const [branch, setBranch] = useState("");
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleEditClickOpen = () => {
    setOpenEdit(true);
    setBranch("");
    setEmpId("");
    setUserId("");
    setnNum("");
    setSalary("");
    setEmpName("");
  };
  const handleEditClickClose = () => {
    setOpenEdit(false);
    setBranch("");
    setEmpId("");
    setUserId("");
    setnNum("");
    setSalary("");
    setEmpName("");
  };
  const handleDeleteClickOpen = () => {
    setOpenDelete(true);
    setBranch("");
    setEmpId("");
    setUserId("");
    setnNum("");
    setSalary("");
    setEmpName("");
  };
  const handleDeleteClickClose = () => {
    setOpenDelete(false);
    setBranch("");
    setEmpId("");
    setUserId("");
    setnNum("");
    setSalary("");
    setEmpName("");
  };
  const handleRegisterClickOpen = () => {
    setOpenRegister(true);
    setBranch("");
    setEmpId("");
    setUserId("");
    setnNum("");
    setSalary("");
    setEmpName("");
  };
  const handleRegisterClickClose = () => {
    setOpenRegister(false);
    setBranch("");
    setEmpId("");
    setUserId("");
    setnNum("");
    setSalary("");
    setEmpName("");
  };
  const [data, setData] = useState(false);
  useEffect(() => {
    Axios.post("http://localhost:3001/employees").then((response) => {
      employees = [];
      response.data.forEach((employeeData) => {
        employees.push(employeeData);
        setData(true);
      });
    });
    console.log(employees);
  }, []);

  const handleDeleteEmp = () => {
    if (empId != "") {
      setOpenDelete(false);
      setWrongInfo(false);
      let emp_t = empId;
      for (var i = 0; i < 10; i++) {
        emp_t = emp_t.replace(persianNumbers[i], String(i)).replace(englishNumbers[i], String(i));
      }
      Axios.post("http://localhost:3001/delete-employee", {
        emp_id: Number(emp_t)
      }).then((response) => {
        console.log(response);
        navigate(0);
      });
    } else {
      setWrongInfo(true);
    }
  };

  const handleRegisterEmp = () => {
    if (userId != "" && empName != "" && nNum != "" && salary != "" && branch != "") {
      let branch_t = branch;
      let user_t = userId;
      for (var i = 0; i < 10; i++) {
        user_t = user_t.replace(persianNumbers[i], String(i)).replace(englishNumbers[i], String(i));
      }
      for (var i = 0; i < 10; i++) {
        branch_t = branch_t.replace(persianNumbers[i], String(i)).replace(englishNumbers[i], String(i));
      }
      Axios.post("http://localhost:3001/check-user-id", {
        user_id: user_t
      }).then((response) => {
        if (response.data == true) {
          Axios.post("http://localhost:3001/check-branch-id", {
            branch_id: branch_t
          }).then((response) => {
            if (response.data == true) {
              setOpenRegister(false);
              setWrongInfo(false);
              Axios.post("http://localhost:3001/register-employee", {
                user_id: user_t,
                employee_name: empName,
                n_num: nNum,
                salary: salary,
                branch: branch
              }).then((response) => {
                console.log(response);
              });
              Axios.post("http://localhost:3001/promote-user", {
                user_id: Number(user_t)
              }).then((response) => {
                console.log(response);
              });
              // navigate(0)
            } else {
              setWrongInfo(true);
            }
          });
        } else {
          setWrongInfo(true);
        }
      });
    } else {
      setWrongInfo(true);
    }
  };

  const handleEditEmp = () => {
    if (empId != "" && empName != "" && nNum != "" && salary != "" && branch != "") {
      let branch_t = branch;
      let emp_t = empId;
      for (var i = 0; i < 10; i++) {
        emp_t = emp_t.replace(persianNumbers[i], String(i)).replace(englishNumbers[i], String(i));
      }
      for (var i = 0; i < 10; i++) {
        branch_t = branch_t.replace(persianNumbers[i], String(i)).replace(englishNumbers[i], String(i));
      }
      Axios.post("http://localhost:3001/check-emp-id", {
        emp_id: emp_t
      }).then((response) => {
        if (response.data == true) {
          Axios.post("http://localhost:3001/edit-employee", {
            emp_id: emp_t,
            employee_name: empName,
            n_num: nNum,
            salary: salary,
            branch: branch
          }).then((response) => {
            console.log(response);
          });
          navigate(0);
        } else {
          setWrongInfo(true);
        }
      });
    } else {
      setWrongInfo(true);
    }
  };
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Drawer user_type={user_type} user_email={user_email} user_id={user_id} />
      </Box>
      <div className="admins-wrapper">
        <div className="admins-wrapper-buttons">
          <div>
            <Button onClick={handleDeleteClickOpen} className="m-btn" variant="outlined" color="error" startIcon={<DeleteIcon />}>
              حذف کارمند
            </Button>
          </div>
          <div>
            <Button onClick={handleEditClickOpen} className="m-btn" variant="outlined" startIcon={<ModeEditIcon />}>
              ویرایش کارمند
            </Button>
          </div>
          <div>
            <Button onClick={handleRegisterClickOpen} className="m-btn" variant="contained" startIcon={<AddIcon />}>
              ثبت کارمند
            </Button>
          </div>
        </div>
        <TableContainer className="table-container" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell className="table-cell" align="center">
                  <p>شعبه فعالیت</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>حقوق</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>کد ملی</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>نام و نام خانوادگی</p>
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <p>شماره کارمندی</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow
                  key={employee.employee_id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0
                    }
                  }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {employee.employee_branch}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    <p>{employee.employee_salary}</p>
                  </TableCell>
                  <TableCell align="center">{employee.employee_num}</TableCell>
                  <TableCell align="center">
                    <p>{employee.employee_name}</p>
                  </TableCell>
                  <TableCell align="center">{employee.employee_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog fullScreen={fullScreen} open={openEdit} onClose={handleEditClickClose} aria-labelledby="responsive-dialog-title">
        <h1 className="emp-title">تغییر مشخصات کارمند</h1>
        <DialogContent>
          <div className="md:flex items-center">
            <div className="md:w-72 flex flex-col contact-item">
              <label className="text-end leading-none text-gray-800">شماره کارمندی</label>
              <input
                onChange={(e) => {
                  setEmpId(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input email address"
                type="name"
                className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300"
                placeholder="1"
              />
            </div>
            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
              <label className="text-end leading-none text-gray-800">نام کارمند</label>
              <input
                onChange={(e) => {
                  setEmpName(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input name"
                type="name"
                className="text-end leading-none text-gray-900 p-3 mt-4 bg-gray-100 placeholder-gray-300"
                placeholder="محمد ندایی "
              />
            </div>
          </div>
          <div className="md:flex items-center mt-8">
            <div className="md:w-72 flex flex-col">
              <label className="text-end leading-none text-gray-800">کد ملی</label>
              <input
                onChange={(e) => {
                  setnNum(e.target.value);
                }}
                tabIndex={0}
                role="input"
                aria-label="Please input company name"
                type="name"
                className="text-end leading-none text-gray-900 p-3 mt-4 bg-gray-100 placeholder-gray-300 "
                placeholder="۹۹۱۱۹۹۹"
              />
            </div>
            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
              <label className="text-end leading-none text-gray-800">حقوق</label>
              <input
                onChange={(e) => {
                  setSalary(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input name"
                type="name"
                className="text-end leading-none text-gray-900 p-3 mt-4 bg-gray-100 placeholder-gray-300"
                placeholder="۵۰۰۰۰۰۰"
              />
            </div>
          </div>
          <div className="mt-10" style={{ textAlign: "end" }}>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              کد شعبه فعالیت
            </label>
            <input
              onChange={(e) => {
                setBranch(e.target.value);
              }}
              tabIndex={0}
              aria-label="Please input name"
              type="name"
              className="text-end leading-none text-gray-900 p-3 mt-2 bg-gray-100 placeholder-gray-300"
              placeholder="۲"
            />
          </div>
          {wrongInfo ? (
            <div className="wrong-info mt-10">
              <p>مشخصات را کامل و درست وارد کنید</p>
            </div>
          ) : null}
        </DialogContent>
        <div style={{ margin: "auto" }}>
          <DialogActions>
            <Button autoFocus onClick={handleEditClickClose}>
              <p>لغو</p>
            </Button>
            <Button onClick={handleEditEmp} autoFocus>
              <p>ثبت</p>
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      <Dialog fullScreen={fullScreen} open={openRegister} onClose={handleRegisterClickClose} aria-labelledby="responsive-dialog-title">
        <h1 className="emp-title">ثبت کارمند جدید</h1>
        <DialogContent>
          <div className="md:flex items-center">
            <div className="md:w-72 flex flex-col contact-item">
              <label className="text-end leading-none text-gray-800">شماره کاربری</label>
              <input
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input email address"
                type="name"
                className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300"
                placeholder="1"
              />
            </div>
            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
              <label className="text-end leading-none text-gray-800">نام کارمند</label>
              <input
                onChange={(e) => {
                  setEmpName(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input name"
                type="name"
                className="text-end leading-none text-gray-900 p-3 mt-4 bg-gray-100 placeholder-gray-300"
                placeholder="محمد ندایی "
              />
            </div>
          </div>
          <div className="md:flex items-center mt-8">
            <div className="md:w-72 flex flex-col">
              <label className="text-end leading-none text-gray-800">کد ملی</label>
              <input
                onChange={(e) => {
                  setnNum(e.target.value);
                }}
                tabIndex={0}
                role="input"
                aria-label="Please input company name"
                type="name"
                className="text-end leading-none text-gray-900 p-3 mt-4 bg-gray-100 placeholder-gray-300 "
                placeholder="۹۹۱۱۹۹۹"
              />
            </div>
            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
              <label className="text-end leading-none text-gray-800">حقوق</label>
              <input
                onChange={(e) => {
                  setSalary(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input name"
                type="name"
                className="text-end leading-none text-gray-900 p-3 mt-4 bg-gray-100 placeholder-gray-300"
                placeholder="۵۰۰۰۰۰۰"
              />
            </div>
          </div>
          <div className="mt-10" style={{ textAlign: "end" }}>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              کد شعبه فعالیت
            </label>
            <input
              onChange={(e) => {
                setBranch(e.target.value);
              }}
              tabIndex={0}
              aria-label="Please input name"
              type="name"
              className="text-end leading-none text-gray-900 p-3 mt-2 bg-gray-100 placeholder-gray-300"
              placeholder="۲"
            />
          </div>
          {wrongInfo ? (
            <div className="wrong-info mt-10">
              <p>مشخصات را کامل و درست وارد کنید</p>
            </div>
          ) : null}
        </DialogContent>
        <div style={{ margin: "auto" }}>
          <DialogActions>
            <Button autoFocus onClick={handleRegisterClickClose}>
              <p>لغو</p>
            </Button>
            <Button onClick={handleRegisterEmp} autoFocus>
              <p>ثبت</p>
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      <Dialog fullScreen={fullScreen} open={openDelete} onClose={handleDeleteClickClose} aria-labelledby="responsive-dialog-title">
        <h1 className="emp-title">حذف شعبه</h1>
        <DialogContent>
          <div className="md:flex items-center">
            <div className="md:w-72 flex flex-col contact-item">
              <label className="text-end leading-none text-gray-800">شماره کارمندی</label>
              <input
                onChange={(e) => {
                  setEmpId(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input email address"
                type="name"
                className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300"
                placeholder="1"
              />
            </div>
          </div>
          {wrongInfo ? (
            <div className="wrong-info mt-10">
              <p>مشخصات را کامل و درست وارد کنید</p>
            </div>
          ) : null}
        </DialogContent>
        <div style={{ margin: "auto" }}>
          <DialogActions>
            <Button autoFocus onClick={handleDeleteClickClose}>
              <p>لغو</p>
            </Button>
            <Button onClick={handleDeleteEmp} autoFocus>
              <p>ثبت</p>
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};
export default Employees;
