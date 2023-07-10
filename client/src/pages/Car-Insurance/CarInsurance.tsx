import Header from "../../components/Header/Header";
import { CheckIcon } from "@heroicons/react/20/solid";
import "./CarInsurance.css";
import useDocumentTitle from "../../hook/useDocumentTitle";
import { useNavigate } from "react-router-dom";

const includedFeatures = ["پوشش نوسانات قیمت", "پوشش سرقت در جای قطعات", "پوشش شکست شیشه", "پوشش بلایای طبیعی"];
const CarInsurance = () => {
  const navigate = useNavigate();
  useDocumentTitle("بیمه اتوموبیل - بیمه یاران");
  return (
    <div>
      <Header />
      <div className="page-container bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto  sm:text-center">
            <img src="../../public/images/Car-Insurance.webp" />
            <h2 className="mt-10 text-end text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">بیمه اتوموبیل</h2>
            <p className="text-end mt-6 text-lg leading-8 text-gray-600">بیمه بدنه یکی از انواع پرطرفدار بیمه خودرو است که خسارات مربوط به بدنه و اموال ‌وسیله نقلیه را پوشش می دهد. بیمه بدنه برخلاف بیمه شخص ثالث اختیاری است. شخص بیمه‌گذار می‌تواند با پرداخت مبلغ مشخصی به عنوان حق بیمه بدنه به شرکت بیمه، وسیله نقلیه خود را در برابر خطراتی از قبیل تصادف، واژگونی، آتش سوزی و حتی سرقت تحت پوشش قرار دهد</p>
            <p className="text-end mt-6 text-lg leading-8 text-gray-600">خدمات و پوشش‌های بیمه بدنه خودرو در شرکت‌های بیمه مختلف، متفاوت است و همین امر انتخاب بیمه بدنه را برای صاحبان خودرو دشوار می‌سازد. بهترین راه حل، استعلام بیمه بدنه از شرکت‌های بیمه معتبر و مقایسه و خرید آنلاین بیمه بدنه است</p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-2 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-gray-100 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">ماهانه</p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">تومان</span>
                    <span className="text-5xl font-bold tracking-tight text-gray-900">۹۴۵,۰۰۰</span>
                  </p>
                  <a
                    onClick={() => {
                      navigate("/signin");
                    }}
                    className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    ثبت نام
                  </a>
                  <p className="mt-6 text-xs leading-5 text-gray-600">دریافت وام بدون نیاز به ضامن</p>
                </div>
              </div>
            </div>
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-end text-2xl font-bold tracking-tight text-gray-900">
                عضویت ویژه بیمه اتوموبیل <img className="inline-block rounded-full ring-2 ring-white" src="../../public/images/vip.png" alt="" style={{ width: "5%" }} />
              </h3>
              <p className="text-end mt-6 text-base leading-7 text-gray-600">پوشش‌های بیمه بدنه به دو دسته پوشش‌ اصلی و پوشش‌ اضافی تقسیم می ‌شوند.پوشش‌ های اضافی را باید در زمان خرید بیمه بدنه انتخاب و جداگانه خریداری شوند </p>
              <div className="mt-10 flex items-center gap-x-4">
                <div className="h-px flex-auto bg-gray-100" />
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">ویژگی های بیمه اتوموبیل بیمه یاران</h4>
              </div>
              <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                {includedFeatures.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CarInsurance;
