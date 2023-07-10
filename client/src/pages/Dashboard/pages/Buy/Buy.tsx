import Box from "@mui/material/Box";
import Drawer from "../../AppDrawer";
import useDocumentTitle from "../../../../hook/useDocumentTitle";
import "./Buy.css";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import Axios from "axios";
import AddIcon from "@mui/icons-material/Add";
const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
const englishNumbers = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g];
import { green } from "@mui/material/colors";
import { CheckBox } from "@mui/icons-material";
let branches = [];
let insurances = [];
const body = { car: 1.2, motorcycle: 1.1, truck: 2.8, bus: 2.2 };
const third_party = { car: 1.3, motorcycle: 1.2, truck: 1.8, bus: 12 };
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  fontSize: "1.4rem",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "#deffe7",
  borderRadius: "10px",
  p: 5
};
const Buy = () => {
  const [name, setName] = useState("");
  const [fname, setFname] = useState("");
  const [age, setAge] = useState("");
  const [area, setArea] = useState("");
  const [carId, setCarId] = useState("");
  const [carValue, setCarValue] = useState("");
  const [carInsuranceType, setCarInsuranceType] = useState("");
  const [vehType, setVehType] = useState("");
  const [branch, setBranch] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [registered, setRegistered] = useState(false);
  const [type, setType] = useState("");
  const [wrongInfo, setWrongInfo] = useState(false);
  const [rightInfo, setRightInfo] = useState(false);
  useDocumentTitle("پنل کاربری بیمه یاران - سفارش بیمه");
  const { state } = useLocation();
  const { user_type, user_email, user_id } = state;
  const [branchData, setBranchData] = useState(false);
  const [insuranceData, setInsuranceData] = useState(false);
  useEffect(() => {
    Axios.post("http://localhost:3001/check-client", {
      user_id: user_id
    }).then((response) => {
      if (response.data == "F") {
        setRegistered(false);
        console.log("F");
      } else {
        setRegistered(true);
        setName(response.data[0].client_name);
        setFname(response.data[0].client_fname);
        setPhone(response.data[0].client_phone);
        setAddress(response.data[0].client_address);
        setBirthday(response.data[0].client_birthday);
      }
    });
    Axios.post("http://localhost:3001/branches").then((response) => {
      branches = [];
      response.data.forEach((branchData) => {
        branches.push(branchData);
        setBranchData(true);
      });
    });
    Axios.post("http://localhost:3001/insurances").then((response) => {
      insurances = [];
      response.data.forEach((insuranceData) => {
        insurances.push(insuranceData);
        setInsuranceData(true);
      });
    });
  }, []);
  const handleRightInfoClose = () => {
    setRightInfo(false);
  };
  const handleBuy = () => {
    if (name != "" && fname != "" && branch != "" && address != "" && phone != "" && birthday != "" && type != "") {
      let insurance_id = 0;
      if (type == "بیمه اتوموبیل") {
        insurance_id = 1;
      } else if (type == "بیمه آتش") {
        insurance_id = 2;
      } else if (type == "بیمه عمر") {
        insurance_id = 3;
      }
      let age_t = age;
      let area_t = area;
      for (var i = 0; i < 10; i++) {
        age_t = age_t.replace(persianNumbers[i], String(i)).replace(englishNumbers[i], String(i));
      }
      for (var i = 0; i < 10; i++) {
        area_t = area_t.replace(persianNumbers[i], String(i)).replace(englishNumbers[i], String(i));
      }
      let branch_id = 0;
      Axios.post("http://localhost:3001/check-branch-name", {
        branch_name: branch
      }).then((response) => {
        branch_id = response.data[0]["branch_id"];
      });
      if (registered) {
        Axios.post("http://localhost:3001/edit-client", {
          user_id: user_id,
          client_address: address,
          client_phone: phone,
          client_birthday: birthday
        }).then((response) => {
          console.log(response);
        });
      } else {
        Axios.post("http://localhost:3001/add-client", {
          user_id: user_id,
          client_name: name,
          client_fname: fname,
          client_address: address,
          client_phone: phone,
          client_birthday: birthday
        }).then((response) => {
          console.log(response);
        });
      }
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 2).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      Axios.post("http://localhost:3001/check-client-id", {
        user_id: user_id
      }).then((response) => {
        let cli_id = response.data[0]["client_id"];
        Axios.post("http://localhost:3001/add-contract", {
          client_id: cli_id,
          branch_id: branch_id,
          insurance_id: insurance_id,
          contract_status: "pending"
        }).then((response) => {
          console.log(response.data);
          if (response.data == "E") {
            setWrongInfo(true);
          } else {
            let insurance_price = 0;
            if (insurance_id == 3) {
              insurance_price = Number(age_t) * 22500;
              const currentDate = new Date();
              const year = currentDate.getFullYear();
              const month = String(currentDate.getMonth() + 3).padStart(2, "0");
              const day = String(currentDate.getDate()).padStart(2, "0");
              const expireDate = `${year}-${month}-${day}`;
              Axios.post("http://localhost:3001/add-health", {
                branch_id: branch_id,
                client_id: cli_id,
                health_age: age_t,
                health_date_start: formattedDate,
                health_date_expire: expireDate
              }).then((response) => {
                console.log(response);
              });
            } else if (insurance_id == 2) {
              insurance_price = Number(area_t) * 22500;
              const currentDate = new Date();
              const year = currentDate.getFullYear();
              const month = String(currentDate.getMonth() + 3).padStart(2, "0");
              const day = String(currentDate.getDate()).padStart(2, "0");
              const expireDate = `${year}-${month}-${day}`;
              Axios.post("http://localhost:3001/add-fire", {
                branch_id: branch_id,
                client_id: cli_id,
                fire_house_area: area_t,
                fire_date_start: formattedDate,
                fire_date_expire: expireDate
              }).then((response) => {
                console.log(response);
              });
            } else if (insurance_id == 1) {
              let insurance_type = 0;
              if (carInsuranceType == "بدنه") {
                insurance_type = 1;
                if (vehType == "سواری") {
                  insurance_price = body.car * Number(carValue);
                } else if (vehType == "موتور سیکلت") {
                  insurance_price = body.motorcycle * Number(carValue);
                } else if (vehType == "کامیون") {
                  insurance_price = body.truck * Number(carValue);
                } else if (vehType == "اتوبوس") {
                  insurance_price = body.bus * Number(carValue);
                }
              } else {
                insurance_type = 2;
                if (vehType == "سواری") {
                  insurance_price = third_party.car * Number(carValue);
                } else if (vehType == "موتور سیکلت") {
                  insurance_price = third_party.motorcycle * Number(carValue);
                } else if (vehType == "کامیون") {
                  insurance_price = third_party.truck * Number(carValue);
                } else if (vehType == "اتوبوس") {
                  insurance_price = third_party.bus * Number(carValue);
                }
              }
              const currentDate = new Date();
              const year = currentDate.getFullYear();
              const month = String(currentDate.getMonth() + 3).padStart(2, "0");
              const day = String(currentDate.getDate()).padStart(2, "0");
              const expireDate = `${year}-${month}-${day}`;
              Axios.post("http://localhost:3001/add-car", {
                branch_id: branch_id,
                client_id: cli_id,
                car_insurance_type: insurance_type,
                car_insurance_price: insurance_price,
                car_date_start: formattedDate,
                car_date_expire: expireDate,
                car_number: carId,
                car_type: vehType,
                car_value: carValue
              }).then((response) => {
                console.log(response);
              });
            }
            Axios.post("http://localhost:3001/add-transaction", {
              user_id: user_id,
              branch_id: branch_id,
              transaction_date: formattedDate,
              transaction_amount: insurance_price,
              insurance_id: insurance_id,
              transaction_type: "sales"
            }).then((response) => {
              console.log(response);
              Axios.post("http://localhost:3001/check-transaction", {
                user_id: user_id,
                insurance_id: insurance_id
              }).then((response) => {
                console.log(response);
                let trans_id = response.data[0]["transaction_id"];
                Axios.post("http://localhost:3001/complete-contract", {
                  client_id: cli_id,
                  insurance_id: insurance_id,
                  transaction_id: trans_id
                }).then((response) => {
                  console.log(response);
                  setWrongInfo(false);
                  setRightInfo(true);
                });
              });
            });
          }
        });
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
      <div className="buy-wrapper">
        {registered ? (
          <div className="buy-container">
            <div className="md:w-72 flex flex-col buy-item">
              <label className="text-end leading-none text-gray-800">نام خانوادگی </label>
              <input
                disabled
                value={fname}
                onChange={(e) => {
                  setFname(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input email address"
                type="name"
                className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300"
                placeholder=""
              />
            </div>
            <div className="md:w-72 flex flex-col buy-item">
              <label className="text-end leading-none text-gray-800">نام</label>
              <input
                disabled
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input email address"
                type="name"
                className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300"
                placeholder=""
              />
            </div>
          </div>
        ) : (
          <div className="buy-container">
            <div className="md:w-72 flex flex-col buy-item">
              <label className="text-end leading-none text-gray-800">نام خانوادگی </label>
              <input
                value={fname}
                onChange={(e) => {
                  setFname(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input email address"
                type="name"
                className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300"
                placeholder=""
              />
            </div>
            <div className="md:w-72 flex flex-col buy-item">
              <label className="text-end leading-none text-gray-800">نام</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input email address"
                type="name"
                className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300"
                placeholder=""
              />
            </div>
          </div>
        )}
        <div className="buy-container">
          <div className="md:w-72 flex flex-col buy-item">
            <label className="text-end leading-none text-gray-800">تلفن همراه </label>
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              tabIndex={0}
              aria-label="Please input email address"
              type="name"
              className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300"
              placeholder=""
            />
          </div>
          <div className="md:w-72 flex flex-col buy-item">
            <label className="text-end leading-none text-gray-800">آدرس</label>
            <input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              tabIndex={0}
              aria-label="Please input email address"
              type="name"
              className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300"
              placeholder=""
            />
          </div>
        </div>
        <div className="buy-container">
          <div className="md:w-72 flex flex-col buy-item">
            <label className="text-end leading-none text-gray-800">تاریخ تولد</label>
            <input
              value={birthday}
              onChange={(e) => {
                setBirthday(e.target.value);
              }}
              tabIndex={0}
              aria-label="Please input email address"
              type="date"
              className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300"
              placeholder="****"
            />
          </div>
          <div className="md:w-72 flex flex-col buy-item">
            <label htmlFor="countries" className="text-end block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              نوع بیمه را انتخاب کنید
            </label>
            <select
              onChange={(e) => {
                setType(e.target.value);
              }}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option style={{ textAlign: "end" }} selected>
                انتخاب نوع بیمه
              </option>
              {insurances.map((insurance) => (
                <option key={insurance.insurance_id} style={{ textAlign: "end" }}>
                  {insurance.insurance_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {type == "بیمه عمر" ? (
          <div className="buy-container">
            <div className="md:w-72 flex flex-col buy-item">
              <label className="text-end leading-none text-gray-800">سن</label>
              <input
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input email address"
                type="name"
                className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300"
                placeholder=""
              />
            </div>
          </div>
        ) : null}
        {type == "بیمه آتش" ? (
          <div className="buy-container">
            <div className="md:w-72 flex flex-col buy-item">
              <label className="text-end leading-none text-gray-800">متراژ خانه یا شرکت</label>
              <input
                value={area}
                onChange={(e) => {
                  setArea(e.target.value);
                }}
                tabIndex={0}
                aria-label="Please input email address"
                type="name"
                className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300"
                placeholder=""
              />
            </div>
          </div>
        ) : null}
        {type == "بیمه اتوموبیل" ? (
          <div>
            <div className="buy-container">
              <div className="md:w-72 flex flex-col buy-item">
                <label className="text-end leading-none text-gray-800">ارزش روز وسیله نقلیه</label>
                <input
                  value={carValue}
                  onChange={(e) => {
                    setCarValue(e.target.value);
                  }}
                  tabIndex={0}
                  aria-label="Please input email address"
                  type="name"
                  className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300"
                  placeholder=""
                />
              </div>
              <div className="md:w-72 flex flex-col buy-item">
                <label className="text-end leading-none text-gray-800">شماره شناسایی وسیله نقلیه</label>
                <input
                  value={carId}
                  onChange={(e) => {
                    setCarId(e.target.value);
                  }}
                  tabIndex={0}
                  aria-label="Please input email address"
                  type="name"
                  className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300"
                  placeholder=""
                />
              </div>
            </div>
            <div className="buy-container">
              <div className="md:w-72 flex flex-col buy-item">
                <label htmlFor="countries" className="text-end block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  نوع وسیله نقلیه را انتخاب کنید
                </label>
                <select
                  onChange={(e) => {
                    setVehType(e.target.value);
                  }}
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option style={{ textAlign: "end" }} selected>
                    انتخاب نوع وسیله نقلیه
                  </option>
                  <option style={{ textAlign: "end" }}>موتور سیکلت</option>
                  <option style={{ textAlign: "end" }}>سواری</option>
                  <option style={{ textAlign: "end" }}>کامیون</option>
                  <option style={{ textAlign: "end" }}>اتوبوس</option>
                </select>
              </div>
              <div className="md:w-72 flex flex-col buy-item">
                <label htmlFor="countries" className="text-end block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  نوع بیمه وسیله نقلیه را انتخاب کنید
                </label>
                <select
                  onChange={(e) => {
                    setCarInsuranceType(e.target.value);
                  }}
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option style={{ textAlign: "end" }} selected>
                    انتخاب نوع بیمه وسیله نقلیه
                  </option>
                  <option style={{ textAlign: "end" }}>بیمه بدنه</option>
                  <option style={{ textAlign: "end" }}>بیمه شخص ثالث</option>
                </select>
              </div>
            </div>
          </div>
        ) : null}
        <div className="buy-container">
          <div className="md:w-72 flex flex-col buy-item">
            <label htmlFor="countries" className="text-end block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              شعبه بیمه را انتخاب کنید
            </label>
            <select
              onChange={(e) => {
                setBranch(e.target.value);
              }}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option style={{ textAlign: "end" }} selected>
                انتخاب شعبه
              </option>
              {branches.map((branch) => (
                <option key={branch.branch_id} style={{ textAlign: "end" }}>
                  {branch.branch_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className="buy-btn-container">
            <Button onClick={handleBuy} className="m-btn buy-btn" variant="contained" color="info" startIcon={<AddIcon />}>
              ثبت سفارش
            </Button>
          </div>
          {wrongInfo ? (
            <div className="wrong-info mt-10 wrong-buy">
              <p>مشخصات را کامل و درست وارد کنید</p>
            </div>
          ) : null}
          <Modal open={rightInfo} onClose={handleRightInfoClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
              <div className="success-icon">
                <Avatar sx={{ bgcolor: green[400] }}>
                  <CheckBox />
                </Avatar>
              </div>
              <p className="text-end">
                <span>شما با موفقیت </span>
                <span> {type}</span>
                <span> را از شعبه </span>
                <span>{branch}</span>
                <span> خریداری کردید برای مشاهده وضعیت بیمه به داشبورد ( بخش بیمه های من ) مراجعه نمایید </span>
              </p>
              <p className="text-end">با تشکر</p>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default Buy;
