import { useLocation } from "react-router-dom";
import useDocumentTitle from "../../../../hook/useDocumentTitle";
import Box from "@mui/material/Box";
import Drawer from "../../AppDrawer";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Avatar, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { blue, red } from "@mui/material/colors";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ConstructionIcon from "@mui/icons-material/Construction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import "./Branches.css";
import AddIcon from "@mui/icons-material/Add";

let branches = [];
const BranchList = () => {
  return (
    <div className="mt-60 flex-col p-20 branch-items-container container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8">
      {branches.map((branch) => (
        <div key={branch.branch_id} className="rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 rounded border-gray-300  dark:border-gray-700 ">
          <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
            {branch.branch_type == "sales" ? (
              <Avatar style={{ margin: "auto" }} sx={{ bgcolor: blue[500] }}>
                <ReceiptIcon />
              </Avatar>
            ) : branch.branch_type == "damage" ? (
              <Avatar style={{ margin: "auto" }} sx={{ bgcolor: red[500] }}>
                <ConstructionIcon />{" "}
              </Avatar>
            ) : (
              <div>
                <div
                  style={{
                    display: "inline-block",
                    width: "70px"
                  }}
                >
                  <Avatar style={{ margin: "auto" }} sx={{ bgcolor: blue[500] }}>
                    <ReceiptIcon />
                  </Avatar>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    width: "70px"
                  }}
                >
                  <Avatar style={{ margin: "auto" }} sx={{ bgcolor: red[500] }}>
                    <ConstructionIcon />
                  </Avatar>
                </div>
              </div>
            )}
            <h2 className="mt-3">شعبه {branch.branch_name}</h2>
          </div>
          <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
            <h2>{branch.branch_address}</h2>
            <h2 className="mt-2">{branch.branch_phone}</h2>
          </div>
          <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
            <h2>کد شعبه: {branch.branch_id}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};
const Branches = () => {
  const navigate = useNavigate();
  const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  const englishNumbers = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g];
  const [branchName, setBranchName] = useState("");
  const [branchId, setBranchId] = useState("");
  const [branchPhone, setBranchPhone] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [branchType, setBranchType] = useState("");
  const [wrongInfo, setWrongInfo] = useState(false);
  useDocumentTitle("پنل کاربری بیمه یاران - شعبه ها");
  const { state } = useLocation();
  const { user_type, user_email, user_id } = state;
  const [data, setData] = useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleEditClickOpen = () => {
    setOpenEdit(true);
    setBranchId("");
    setBranchPhone("");
    setBranchAddress("");
    setBranchType("");
  };
  const handleEditClickClose = () => {
    setOpenEdit(false);
    setBranchId("");
    setBranchPhone("");
    setBranchAddress("");
    setBranchType("");
  };
  const handleDeleteClickOpen = () => {
    setOpenDelete(true);
    setBranchId("");
    setBranchPhone("");
    setBranchAddress("");
    setBranchType("");
  };
  const handleDeleteClickClose = () => {
    setOpenDelete(false);
    setBranchId("");
    setBranchPhone("");
    setBranchAddress("");
    setBranchType("");
  };
  const handleRegisterClickOpen = () => {
    setOpenRegister(true);
    setBranchId("");
    setBranchPhone("");
    setBranchAddress("");
    setBranchType("");
  };
  const handleRegisterClickClose = () => {
    setOpenRegister(false);
    setBranchId("");
    setBranchPhone("");
    setBranchAddress("");
    setBranchType("");
  };
  useEffect(() => {
    Axios.post("http://localhost:3001/branches").then((response) => {
      branches = [];
      response.data.forEach((branchData) => {
        branches.push(branchData);
        setData(true);
      });
    });
    console.log(branches);
  }, []);

  const handleAddBranch = () => {
    if (branchName != "" && branchId != "" && branchPhone != "" && branchAddress != "" && branchType != "انتخاب نمایندگی" && branchType != "") {
      setOpenRegister(false);
      setWrongInfo(false);
      let bType = "";
      if (branchType == "نمایندگی فروش") {
        bType = "sales";
      } else if (branchType == "نمایندگی خسارت") {
        bType = "damage";
      } else {
        bType = "sales,damage";
      }
      let branch_t = branchId;
      for (var i = 0; i < 10; i++) {
        branch_t = branch_t.replace(persianNumbers[i], String(i)).replace(englishNumbers[i], String(i));
      }
      Axios.post("http://localhost:3001/register-branch", {
        branch_id: Number(branch_t),
        branch_name: branchName,
        branch_phone: branchPhone,
        branch_address: branchAddress,
        branch_type: bType
      }).then((response) => {
        console.log(response);
        navigate(0);
      });
    } else {
      setWrongInfo(true);
    }
  };

  const handleEditBranch = () => {
    if (branchName != "" && branchId != "" && branchPhone != "" && branchAddress != "" && branchType != "انتخاب نمایندگی" && branchType != "") {
      let bType = "";
      if (branchType == "نمایندگی فروش") {
        bType = "sales";
      } else if (branchType == "نمایندگی خسارت") {
        bType = "damage";
      } else {
        bType = "sales,damage";
      }
      let branch_t = branchId;
      for (var i = 0; i < 10; i++) {
        branch_t = branch_t.replace(persianNumbers[i], String(i)).replace(englishNumbers[i], String(i));
      }
      Axios.post("http://localhost:3001/check-branch", {
        branch_id: Number(branch_t)
      }).then((response) => {
        if (response.data == true) {
          console.log(response);
          setOpenEdit(false);
          setWrongInfo(false);
          Axios.post("http://localhost:3001/edit-branch", {
            branch_id: Number(branch_t),
            branch_name: branchName,
            branch_phone: branchPhone,
            branch_address: branchAddress,
            branch_type: bType
          }).then((response) => {
            console.log(response);
            navigate(0);
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

  const handleDeleteBranch = () => {
    if (branchId != "") {
      setOpenDelete(false);
      setWrongInfo(false);
      let branch_t = branchId;
      for (var i = 0; i < 10; i++) {
        branch_t = branch_t.replace(persianNumbers[i], String(i)).replace(englishNumbers[i], String(i));
      }
      Axios.post("http://localhost:3001/delete-branch", {
        branch_id: Number(branch_t)
      }).then((response) => {
        console.log(response);
        navigate(0);
      });
    } else {
      setWrongInfo(true);
    }
  };
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Drawer user_type={user_type} user_email={user_email} user_id={user_id} />
        <div style={{ position: "absolute", top: "20%", left: "45%" }}>
          <Button onClick={handleRegisterClickOpen} className="m-btn" variant="contained" startIcon={<AddIcon />}>
            ثبت شعبه
          </Button>
        </div>
        <div style={{ position: "absolute", top: "20%", left: "25%" }}>
          <Button onClick={handleDeleteClickOpen} className="m-btn" variant="outlined" color="error" startIcon={<DeleteIcon />}>
            حذف شعبه
          </Button>
        </div>
        <div style={{ position: "absolute", top: "20%", left: "34.5%" }}>
          <Button onClick={handleEditClickOpen} className="m-btn" variant="outlined" startIcon={<ModeEditIcon />}>
            ویرایش بیمه
          </Button>
        </div>
        <BranchList />
      </Box>
      <Dialog fullScreen={fullScreen} open={openRegister} onClose={handleRegisterClickClose} aria-labelledby="responsive-dialog-title">
        <h1 className="branch-title">ثبت شعبه بیمه جدید</h1>
        <DialogContent>
          <div className="md:flex items-center">
            <div className="md:w-72 flex flex-col contact-item">
              <label className="text-end leading-none text-gray-800">کد بیمه</label>
              <input
                onChange={(e) => {
                  setBranchId(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input email address"
                type="name"
                className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300"
                placeholder="1"
              />
            </div>
            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
              <label className="text-end leading-none text-gray-800">نام بیمه</label>
              <input
                onChange={(e) => {
                  setBranchName(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input name"
                type="name"
                className="text-end leading-none text-gray-900 p-3 mt-4 bg-gray-100 placeholder-gray-300"
                placeholder="بیمه آزادگان"
              />
            </div>
          </div>
          <div className="md:flex items-center mt-8">
            <div className="md:w-72 flex flex-col">
              <label className="text-end leading-none text-gray-800"> شماره تماس بیمه</label>
              <input
                onChange={(e) => {
                  setBranchPhone(e.target.value);
                }}
                tabIndex={0}
                role="input"
                aria-label="Please input company name"
                type="name"
                className="text-end leading-none text-gray-900 p-3 mt-4 bg-gray-100 placeholder-gray-300 "
                placeholder="+۲۱۳۴۵۴۵۶۷"
              />
            </div>
            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
              <label className="text-end leading-none text-gray-800">آدرس بیمه</label>
              <input
                onChange={(e) => {
                  setBranchAddress(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input name"
                type="name"
                className="text-end leading-none text-gray-900 p-3 mt-4 bg-gray-100 placeholder-gray-300"
                placeholder="...خیابان مدنی"
              />
            </div>
          </div>
          <div className="mt-10" style={{ textAlign: "end" }}>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              نوع بیمه را انتخاب کنید
            </label>
            <select
              onChange={(e) => {
                setBranchType(e.target.value);
              }}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option style={{ textAlign: "end" }} selected>
                انتخاب نمایندگی
              </option>
              <option style={{ textAlign: "end" }}>نمایندگی فروش</option>
              <option style={{ textAlign: "end" }}>نمایندگی خسارت</option>
              <option style={{ textAlign: "end" }}>نمایندگی فروش و خسارت</option>
            </select>
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
            <Button onClick={handleAddBranch} autoFocus>
              <p>ثبت</p>
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      <Dialog fullScreen={fullScreen} open={openEdit} onClose={handleEditClickClose} aria-labelledby="responsive-dialog-title">
        <h1 className="branch-title">تغییر شعبه</h1>
        <DialogContent>
          <div className="md:flex items-center">
            <div className="md:w-72 flex flex-col contact-item">
              <label className="text-end leading-none text-gray-800">کد بیمه</label>
              <input
                onChange={(e) => {
                  setBranchId(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input email address"
                type="name"
                className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300"
                placeholder="1"
              />
            </div>
            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
              <label className="text-end leading-none text-gray-800">نام بیمه</label>
              <input
                onChange={(e) => {
                  setBranchName(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input name"
                type="name"
                className="text-end leading-none text-gray-900 p-3 mt-4 bg-gray-100 placeholder-gray-300"
                placeholder="بیمه آزادگان"
              />
            </div>
          </div>
          <div className="md:flex items-center mt-8">
            <div className="md:w-72 flex flex-col">
              <label className="text-end leading-none text-gray-800"> شماره تماس بیمه</label>
              <input
                onChange={(e) => {
                  setBranchPhone(e.target.value);
                }}
                tabIndex={0}
                role="input"
                aria-label="Please input company name"
                type="name"
                className="text-end leading-none text-gray-900 p-3 mt-4 bg-gray-100 placeholder-gray-300 "
                placeholder="+۲۱۳۴۵۴۵۶۷"
              />
            </div>
            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
              <label className="text-end leading-none text-gray-800">آدرس بیمه</label>
              <input
                onChange={(e) => {
                  setBranchAddress(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input name"
                type="name"
                className="text-end leading-none text-gray-900 p-3 mt-4 bg-gray-100 placeholder-gray-300"
                placeholder="...خیابان مدنی"
              />
            </div>
          </div>
          <div className="mt-10" style={{ textAlign: "end" }}>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              نوع بیمه را انتخاب کنید
            </label>
            <select
              onChange={(e) => {
                setBranchType(e.target.value);
              }}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option style={{ textAlign: "end" }} selected>
                انتخاب نمایندگی
              </option>
              <option style={{ textAlign: "end" }}>نمایندگی فروش</option>
              <option style={{ textAlign: "end" }}>نمایندگی خسارت</option>
              <option style={{ textAlign: "end" }}>نمایندگی فروش و خسارت</option>
            </select>
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
            <Button onClick={handleEditBranch} autoFocus>
              <p>ثبت</p>
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      <Dialog fullScreen={fullScreen} open={openDelete} onClose={handleDeleteClickClose} aria-labelledby="responsive-dialog-title">
        <h1 className="branch-title">حذف شعبه</h1>
        <DialogContent>
          <div className="md:flex items-center">
            <div className="md:w-72 flex flex-col contact-item">
              <label className="text-end leading-none text-gray-800">کد بیمه</label>
              <input
                onChange={(e) => {
                  setBranchId(e.target.value);
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
            <Button onClick={handleDeleteBranch} autoFocus>
              <p>ثبت</p>
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};
export default Branches;
