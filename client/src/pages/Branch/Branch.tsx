import Header from "../../components/Header/Header";
import useDocumentTitle from "../../hook/useDocumentTitle";
import Axios from "axios";
import { useEffect, useState } from "react";
import "./branch.css";
import { Avatar } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ConstructionIcon from "@mui/icons-material/Construction";
let branches = [];
const BranchList = () => {
  return (
    <div className="flex-col p-20 items-container mt-40 container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8">
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
const Branch = () => {
  const [data, setData] = useState(false);
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
  useDocumentTitle("شعب نمایندگی و فروش - بیمه یاران");
  return (
    <div>
      <Header />
      <BranchList />
    </div>
  );
};
export default Branch;
