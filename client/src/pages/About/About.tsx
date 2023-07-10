import Header from "../../components/Header/Header";
import useDocumentTitle from "../../hook/useDocumentTitle";
import Axios from "axios";
import { useEffect, useState } from "react";

const About = () => {
  const [usersCount, setUsersCount] = useState("");
  const [branchesCount, setBranchesCount] = useState("");
  const [contractsCount, setContractsCount] = useState("");
  const stats = [
    { name: "شعبه سراسر کشور", value: branchesCount },
    { name: "کاربران", value: "+" + usersCount },
    { name: "قرارداد بسته شده", value: contractsCount }
  ];
  useEffect(() => {
    Axios.post("http://localhost:3001/total-users").then((response) => {
      setUsersCount(response.data[0]["COUNT(*)"]);
      console.log(response);
    });
    Axios.post("http://localhost:3001/total-branches").then((response) => {
      setBranchesCount(response.data[0]["COUNT(*)"]);
      console.log(response);
    });
    Axios.post("http://localhost:3001/total-contracts").then((response) => {
      setContractsCount(response.data[0]["COUNT(*)"]);
      console.log(response);
    });
  }, []);

  useDocumentTitle("درباره ما - بیمه یاران");
  return (
    <div>
      <Header color={"white"} />
      <div style={{ height: "100vh" }} className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img src="/images/company.webp" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center" />
        <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            }}
          />
        </div>
        <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            }}
          />
        </div>
        <div className="text-end mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mt-20 mx-auto max-w-6xl lg:mx-0">
            <h2 className="text-end text-4xl font-bold tracking-tight text-white sm:text-6xl">درباره ما</h2>
            <p className="text-end mt-6 text-lg leading-8 text-gray-300">قصد خرید بیمه را دارید؟ نگران فرآیند‌های سخت خرید و استفاده از بیمه نباشید. بیمه یاران به عنوان همراهی آگاه در کنار شما است تا بتوانید با دانش کافی بهترین بیمه‌ را انتخاب کنید</p>
            <p className="text-end mt-6 text-lg leading-8 text-gray-300">بیمه یاران در تمام مراحل خرید و استفاده از بیمه همراه شما است. به کمک بیمه یاران می‌توانید قبل از خرید، درباره انواع مختلف بیمه و پوشش‌های آن اطلاعات کامل را کسب کنید و سپس خدمات و قیمت‌های شرکت‌های گوناگون بیمه‌ای را با یکدیگر مقایسه نمایید. فرآیند خرید با بیمه یاران بسیار سریع و ساده انجام می‌شود. تمام مراحل آنلاین است و هیچ نیازی به مراجعه حضوری ندارید و این‌گونه در زمان صرفه‌جویی می‌کنید</p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.name} className="flex flex-col-reverse">
                  <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                  <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
