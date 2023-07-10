import Box from "@mui/material/Box";
import Drawer from "../../AppDrawer";
import useDocumentTitle from "../../../../hook/useDocumentTitle";
import "./Password.css";
import * as React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Button } from "@mui/material";
import Axios from "axios";

const Password = () => {
  const [wrongInfo, setWrongInfo] = useState(false);
  const [rightInfo, setRightInfo] = useState(false);
  useDocumentTitle("پنل کاربری بیمه یاران - تغییر پسورد");
  const { state } = useLocation();
  const { user_type, user_email, user_id } = state;
  const [data, setData] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const handleChangePassword = () => {
    if (password == repeatPassword) {
      setWrongInfo(false);
      setRightInfo(true);
      Axios.post("http://localhost:3001/change-password", {
        password: password,
        email: user_email
      }).then((response) => {
        console.log(response);
      });
    } else {
      setRightInfo(false);
      setWrongInfo(true);
    }
  };
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Drawer user_type={user_type} user_email={user_email} user_id={user_id} />
      </Box>
      <div className="password-wrapper">
        <div className="password-container">
          <div className="md:w-72 flex flex-col contact-item">
            <label className="text-end leading-none text-gray-800">تکرار رمز عبور </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              tabIndex={0}
              aria-label="Please input email address"
              type="password"
              className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300"
              placeholder="****"
            />
          </div>
          <div className="md:w-72 flex flex-col contact-item">
            <label className="text-end leading-none text-gray-800"> رمز عبور</label>
            <input
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
              tabIndex={0}
              aria-label="Please input email address"
              type="password"
              className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300"
              placeholder="****"
            />
          </div>
        </div>
        <div className="password-btn-container">
          <Button onClick={handleChangePassword} className="m-btn password-btn" variant="contained" color="info" startIcon={<VpnKeyIcon />}>
            تغییر رمز عبور
          </Button>
        </div>
        {wrongInfo ? (
          <div className="wrong-info mt-10 wrong-password">
            <p>مشخصات را کامل و درست وارد کنید</p>
          </div>
        ) : null}
        {rightInfo ? (
          <div className="right-info mt-10 right-password">
            <p>رمز اکانت شما با موفقیت تغییر کرد</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Password;
