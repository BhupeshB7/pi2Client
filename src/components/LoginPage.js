import React, { useRef, useState } from "react";
import logo from "../assets/PI2.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import spinner2 from "../assets/spinner2.gif";
import Captcha from "./Captcha";
import Background from "./Home/Background";
import { ca } from "date-fns/locale";
import { FaCheck } from "react-icons/fa";
const LoginForm = ({ setToken }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState(true);
  const [captchaResponse, setCaptchaResponse] = useState("");
  const [error, setError] = useState(null);
  //for Login Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleCaptchaVerification = (verified) => {
    setCaptchaVerified(verified);
  };
  // const BASE_URl = process.env.BASE_URL
const apiUrl = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(
        // "http://localhost:5500/api/auth/login",
        `${apiUrl}/api/auth/login`,
        // "https://mlm-psi.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, password, captchaResponse }),
        }
      );

      if (response.status === 400) {
        throw new Error("Invalid userId or password");
      }
      if (response.status === 401) {
        throw new Error("Invalid Captcha");
      }

      const { token } = await response.json();
      localStorage.removeItem("hasAnimationShownBefore");
      localStorage.setItem("token", token);
      // token will expire in 6 hours
      localStorage.setItem("tokenExpire", Date.now() + 21600000); //86400000 for 24
      //  setToken(token);
      setError(null);
      setIsSubmitting(false);
      toast.success("LogIn successfully!");
      // redirect to dashboard page
      window.location.href = "/dashboard";
    } catch (error) {
      setError(error.message);
      alert(error.message);
      setIsSubmitting(false);
    }
  };

  const handleCaptchaChange = (response) => {
    setCaptchaResponse(response);
  };
  const handleClickShowPassword = () => {
    setPassword1(!password1);
  };
  return (
    <>
    <Background/>
      <div
        className="loginBG"
        style={{
          // backgroundImage: "url('https://assets-global.website-files.com/5a9423a3f702750001758d4f/64ddbcac254f68d3f78c983e_%20-%2012-p-500.jpg')",  backgroundRepeat:'no-repeat',
          backgroundSize: "100% 100vh",
        }}
      >
        <div className=" login_Image">
          <div className="login_Image2">
            <div className="img">
              <img src={logo} height={"140px"} width={"150px"} alt="Logo" />
            </div>
          </div>
          <div className="form_container loginBG1">
            {/* <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?size=626&ext=jpg&uid=R102726883&ga=GA1.2.1717175719.1670043102&semt=sph" alt="" /> */}
            <form onSubmit={handleSubmit}>
              <div>
                {error && (
                  <div
                    className="error text-danger"
                    style={{ marginLeft: "10px" }}
                  >
                    {error}
                  </div>
                )}
                <div className="loginInput">
                  {/* <label>UserId:</label> */}
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/13983/13983903.png"
                    height="30px"
                    width="30px"
                    alt="user"
                    style={{ marginLeft: "20px" }}
                  />
                  <input
                    type="text"
                    placeholder="Enter userID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  />
                </div>
                <div className="loginInput">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/4353/4353113.png"
                    height="30px"
                    width="30px"
                    alt="password"
                    style={{ marginLeft: "20px" }}
                  />
        <div className="input__password">

                  <input
                    type={password1 ? "password" : "text"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="showPassword" >
                    {password1 ? (
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/5618/5618479.png"
                        height="30px"
                        width="30px"
                        alt="eye"
                        onClick={handleClickShowPassword}
                      />
                    ) : (
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/7354/7354237.png"
                        height="30px"
                        width="30px"
                        alt="eye"
                        onClick={handleClickShowPassword}
                      />
                    )}
                  </div>
        </div>
                </div>
                <div className="form_input">
                  {/* <ReCAPTCHA
                    style={{ background: "transparent", margin: "10px" }}
                    sitekey={"6LdxqJ0pAAAAAPDd-7cTDkPo01brJJpc1ezDcVF4"}
                    onChange={handleCaptchaChange}
                    ref={captchaRef}
                  /> */}

                </div>
              {!captchaVerified &&  <Captcha onVerification={handleCaptchaVerification}/>}
              {captchaVerified && (
                   <p className="success-message m-3"><FaCheck size={24} color="green" style={{margin:"5px"}} /> Captcha Verified successfully!</p>
                )}
                {captchaVerified && (
                  <>
                  <button
                    type="submit"
                    className="button-30 m-2 mt-3"
                    style={{letterSpacing: "4px",
                      transform: "scale(1.03)",
                    }}
                  >
                    {isSubmitting ? (
                      <img
                        src={spinner2}
                        height="30px"
                        width="30px"
                        alt="Loading"
                      />
                    ) : (
                      "LOGIN"
                    )}
                  </button>
                  <br/>
                  </>
                )}
                {!captchaVerified && (
                  <h6 className="text-center text-amber-100 m-2">Please verify the captcha first.</h6>
                )}
                
                <Link
                  to={"/v2/register"}
                  style={{ color: "#eee", marginLeft: "8px" }}
                >
                  Don't have an account yet?{" "}
                  <a
                    href="/v2/register"
                    style={{ textDecoration: "underline", color: "gray" }}
                  >
                    SignUp
                  </a>{" "}
                </Link>
                <br/>
                <Link
                  to={"/password-reset"}
                  style={{
                    marginBottom: "10px",
                    color: "#ddd",
                    marginLeft: "8px",
                  }}
                >
                  {" "}
                  <b style={{ textDecoration: "underline", fontWeight: "500" }}>
                    Forgot Password
                  </b>{" "}
                </Link>
              </div>
            </form>
          </div>

          <ToastContainer />
        </div>
      </div>
    </>
  );
};
export default LoginForm;
