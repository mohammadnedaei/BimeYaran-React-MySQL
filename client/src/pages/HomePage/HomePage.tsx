import Header from "../../components/Header/Header";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hook/useDocumentTitle";

const HomePage = () => {
  useDocumentTitle("بیمه یاران | خرید آنلاین بیمه");

  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="bg-white">
        <div className="relative isolate px-6 pt-20 lg:px-8">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#7cc9fc] to-[#99a8ff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 ">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                معرفی پنل جدید بیمه یاران! {""}
                <a
                  style={{
                    position: "relative",
                    left: "-2px"
                  }}
                  href="#"
                  className="font-semibold text-indigo-600"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  بیشتر بخوانید
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">بیمه یاران؛ مدیریت و خرید آنلاین بیمه</h3>
              <p className="mt-6 text-lg leading-8 text-gray-600">در چند دقیقه، بیمه مورد نظر خود را با سامانه هوشمند بیمه یاران، خریداری کنید و از خسارات در امان باشید</p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button
                  onClick={() => {
                    navigate("/signin");
                  }}
                  className="m-btn"
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  ثبت درخواست
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(80%-30rem)]" aria-hidden="true">
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#fc6dc8] to-[#fc6d76] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
