import Header from "../../components/Header/Header";
import { CheckIcon } from "@heroicons/react/20/solid";
import "./LifeInsurance.css";
import useDocumentTitle from "../../hook/useDocumentTitle";
import { useNavigate } from "react-router-dom";

const includedFeatures = ["میانگین سود مشارکت : 20.4 درصد", "هزینه پزشکی بر اثر حادثه : 18,000,000 تومان", "میزان افزایش حق بیمه در هر سال : 15 درصد", "مبلغ دریافتی شما بعداز 10 سال : 58,400,000 تومان"];
const LifeInsurance = () => {
  const navigate = useNavigate();
  useDocumentTitle("بیمه عمر - بیمه یاران");
  return (
    <div>
      <Header />
      <div className="page-container bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto  sm:text-center">
            <img src="../../public/images/Life-Insurance.webp" />
            <h2 className="mt-10 text-end text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">بیمه عمر</h2>
            <p className="text-end mt-6 text-lg leading-8 text-gray-600">افراد در شرایط مختلف زندگی به دنبال اطمینان خاطر مالی برای خودشان و عزیزانشان هستند. بیمه عمر یا همان بیمه آتیه‌ساز یکی از راه‌های مطمئن برای سرمایه‌گذاری با سود تضمینی، به دنبال تامین آتیه و کاهش دغدغه و نگرانی افراد در طول زندگی است. باتوجه به شرایط اقتصادی موجود، داشتن یک پس‌انداز مناسب برای دوران بازنشستگی و همچنین تأمین نیازهای خانواده در سال‌های آینده اهمیت زیادی دارد</p>
            <p className="text-end mt-6 text-lg leading-8 text-gray-600">هزینه‌های سنگینی مثل هزینه تحصیل، ازدواج و راه‌اندازی کسب و کار فرزندان و در کنار آن مخارج زیاد زندگی در دوران بازنشستگی، اهمیت داشتن یک پشتوانه مالی محکم را بیش از پیش مشخص می‌کند. حتی در شرایط وقوع حوادث برای سرپرست خانواده، با داشتن سرمایه و کمی دوراندیشی، بازماندگان دغدغه مالی نخواهند داشت</p>
            <p className="text-end mt-6 text-lg leading-8 text-gray-600">در بیمه عمر افراد با پرداخت مبلغ معینی به عنوان حق‌بیمه، علاوه بر سرمایه‌گذاری با سود تضمینی، از پوشش‌های متنوع و کاربردی هم بهره‌مند می‌شوند و اگر خدای نکرده فوت کنند، بازماندگانشان سرمایه فوتشان را دریافت می‌کنند. در واقع بیمه عمر یک پشتوانه مالی محکم برای دوران پیری، بازنشستگی یا بعد از فوت برای بازماندگان است</p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-2 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-gray-100 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">ماهانه</p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">تومان</span>
                    <span className="text-5xl font-bold tracking-tight text-gray-900">۶۷۵,۰۰۰</span>
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
                عضویت ویژه بیمه عمر <img className="inline-block rounded-full ring-2 ring-white" src="../../public/images/vip.png" alt="" style={{ width: "5%" }} />
              </h3>
              <p className="text-end mt-6 text-base leading-7 text-gray-600">معمولا شرکت‌های بیمه برای ثبت‌نام بیمه عمر یک‌سری شرایط و محدودیت‌ها دارند؛ مثلا مدت مشخصی را برای قرارداد بیمه‌نامه درنظر می‌گیرند یا محدودیت سنی برای خرید بیمه‌نامه دارند</p>
              <div className="mt-10 flex items-center gap-x-4">
                <div className="h-px flex-auto bg-gray-100" />
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">ویژگی های بیمه عمر بیمه یاران</h4>
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
export default LifeInsurance;
