import Header from "../../components/Header/Header";
import { CheckIcon } from "@heroicons/react/20/solid";
import "./FireInsurance.css";
import useDocumentTitle from "../../hook/useDocumentTitle";
import { useNavigate } from "react-router-dom";

const includedFeatures = ["طوفان، گردباد و تندباد", "ریزش سقف به‌دلیل سنگینی برف", "پوشش شکست شیشه", "سقوط هواپیما و هلیکوپتر یا قطعات آن‌ها"];
const FireInsurance = () => {
  const navigate = useNavigate();
  useDocumentTitle("بیمه آتش سوزی - بیمه یاران");
  return (
    <div>
      <Header />
      <div className="page-container bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto  sm:text-center">
            <img src="../../public/images/Fire-Insurance.webp" />
            <h2 className="mt-10 text-end text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">بیمه آتش سوزی</h2>
            <p className="text-end mt-6 text-lg leading-8 text-gray-600">ایران یکی از ۱۰ کشور آسیب پذیر جهان از نظر رخداد حوادث طبیعی محسوب می‌شود و متاسفانه آتش‌سوزی نیز یکی از حوادث رایج در کشور ماست. به‌طوری که روزانه بیش از 50 حادثه آتش سوزی در کشور رخ می‌دهد. چنین حوادثی علاوه بر خسارت‌های جانی دردناک ، خسارت‌های مالی فراوانی هم برای افراد به بار می‌آورند </p>
            <p className="text-end mt-6 text-lg leading-8 text-gray-600">همین موضوع باعث شده تا لزوم بیمه اموال برای جبران این خسارات بیش از پیش احساس شود. برای جبران خسارت‌های مالی ناشی از حوادث مرتبط با آتش‌سوزی شرکت های بیمه محصولی به‌نام بیمه آتش سوزی را ارائه می‌کنند</p>
            <p className="text-end mt-6 text-lg leading-8 text-gray-600">بیمه آتش سوزی، از زیر مجموعه های بیمه اموال است که زیان‌های مالی که بر اثر وقوع آتش سوزی به اموال و دارائی‌های منقول و غیرمنقول بیمه‌گذار وارد می شود، را تحت پوشش قرار می دهد. این بیمه نامه به‌نام بیمه زلزله و آتش سوزی هم فروخته می‌شود</p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-2 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-gray-100 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">ماهانه</p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">تومان</span>
                    <span className="text-5xl font-bold tracking-tight text-gray-900">۱۳۵,۰۰۰</span>
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
                عضویت ویژه بیمه آتش سوزی <img className="inline-block rounded-full ring-2 ring-white" src="../../public/images/vip.png" alt="" style={{ width: "5%" }} />
              </h3>
              <p className="text-end mt-6 text-base leading-7 text-gray-600">موقع خرید بیمه زلزله و آتش ‌سوزی بهتر است با توجه به موقعیت و متراژ ساختمان و همچنین نوع کاربری آن پوشش‌های اضافی مناسب را به بیمه نامه اضافه کنید </p>
              <div className="mt-10 flex items-center gap-x-4">
                <div className="h-px flex-auto bg-gray-100" />
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">ویژگی های بیمه آتش سوزی بیمه یاران</h4>
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
export default FireInsurance;
