import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import useDocumentTitle from "../../hook/useDocumentTitle";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./SignIn.css";
import HomeIcon from "@mui/icons-material/Home";
const defaultTheme = createTheme();

const Signin = () => {
  const navigate = useNavigate();
  useDocumentTitle("ورود به پنل کاربری بیمه یاران");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [notValidEmail, setNotValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [notValidPassword, setNotValidPassword] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/check-email", {
      email: email
    }).then((response) => {
      if (response.data == true) {
        setValidEmail(true);
        setNotValidEmail(false);
        Axios.post("http://localhost:3001/check-password", {
          email: email,
          password: password
        }).then((response) => {
          console.log(response);
          if (response.data == true) {
            setValidPassword(true);
            setNotValidPassword(false);
            Axios.post("http://localhost:3001/check-user-type", {
              email: email
            }).then((response) => {
              setTimeout(() => {
                navigate("/dashboard", {
                  state: {
                    user_email: email,
                    user_type: response.data[0]["user_type"],
                    user_id: response.data[0]["user_id"]
                  }
                });
              }, [3000]);
            });
          } else {
            setValidPassword(false);
            setNotValidPassword(true);
          }
        });
      } else {
        setValidEmail(false);
        setNotValidEmail(true);
      }
    });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(../../public/images/login.webp)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <a className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
                <img className="signin-logo w-8 h-8 mr-2" src="/favicon/favicon-32x32.png" alt="logo" />
                ورود به پنل کاربری
              </a>
              <div className="w-full bg-white login-form-container shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <a
                  className="home-btn"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <HomeIcon />
                </a>
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <form onSubmit={handleLogin} className="text-end space-y-4 md:space-y-6">
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        آدرس ایمیل
                      </label>
                      <input
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        type="email"
                        name="email"
                        id="email"
                        className="text-end bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        رمز عبور
                      </label>
                      <input
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        type="password"
                        name="password"
                        id="password"
                        className="text-end bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    {notValidEmail ? (
                      <div className="wrong-info">
                        <p>ایمیل وارد شده در سیستم وجود ندارد</p>
                      </div>
                    ) : null}
                    {notValidPassword ? (
                      <div className="wrong-info">
                        <p>رمز عبور وارد شده صحیح نمی باشد</p>
                      </div>
                    ) : null}
                    {validPassword && validEmail ? (
                      <div className="right-info">
                        <p>با موفقیت وارد شدید در حال انتقال به پنل</p>
                      </div>
                    ) : null}
                    <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                      ورود
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      حساب کاربری ندارید؟{" "}
                      <a
                        onClick={() => {
                          navigate("/signup");
                        }}
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        ثبت نام کنید
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Signin;
