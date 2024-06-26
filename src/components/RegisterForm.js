import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import ReCAPTCHA from 'react-google-recaptcha';
import logo from "../assets/newpilogo.jpg";
import congrats from "../assets/congrats.png";
import "./LoginSuccess.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Container } from "react-bootstrap";
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    sponsorId: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  function onClickHome() {
    navigate("/");
  }
  function onLogin() {
    navigate("/v2/login");
  }
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [sponsorId, setSponsorId] = useState("");
  const [sponsorName, setSponsorName] = useState("");

  // const [emailId, setEmailId] = useState('');
  const [errors, setErrors] = useState("");
  //show password
  const [showPassword, setShowPassword] = useState(false);
  const [verified, setVerified] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //for Form Validation
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //captcha verification
  function onChange(value) {
    // console.log("Captcha value:", value);
    setVerified(true);
  }
  //for registration Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const ref = searchParams.get('ref');

  //   if (ref) {
  //     handleChange(ref);
  //   }
  // }, [location.search]);
  // Get the ref parameter from the URL

  const fetchSponsorName = async () => {
    try {
      const sponsorResponse = await axios.get(
        // `https://piserver-ljd1.onrender.com/api/users/getSponsorName/${formData.sponsorId}`
        `https://mlm-psi.vercel.app/api/users/getSponsorName/${formData.sponsorId}`
      );
      setSponsorName(sponsorResponse.data.name);
      // alert(sponsorName);
    } catch (error) {
      // Handle any errors when fetching the sponsor's name
      console.error("Error fetching sponsor name:", error);
      setSponsorName(""); // Clear the sponsor name on error
    }
  };
  useEffect(() => {
    fetchSponsorName();
  }, []);
  const searchParams = new URLSearchParams(window.location.search);
  const ref = searchParams.get("ref");

  // If the ref parameter is present, set the sponsorId state with its value
  if (ref) {
    formData.sponsorId = ref;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.mobile.trim()) {
      setErrorMessage("Please enter mobile");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        // "https://piserver-ljd1.onrender.com/api/users/register",
        "https://mlm-psi.vercel.app/api/users/register",
        formData
      );
      setUserId(res.data.userId);
      setName(res.data.name);
      setPassword(res.data.password);
      setSponsorId(res.data.sponsorId);
      setFormData({
        name: "",
        email: "",
        password: "",
        mobile: "",
        sponsorId: "",
      });
      // setErrors({});
      console.log(res.data);
      setIsSubmitting(false);
      alert("User Registered SucceccFully!");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Email or mobile number already in use.");
      } else if (error.response && error.response.status === 404) {
        toast.error("Please Enter Valid SponserID");
      } else {
        setErrors("An error occurred. Please try again later.");
        toast.error("An error occurred. Please try again later.");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" bg-zinc-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:17px_34px]">
      
      {!userId ? (
        <div className="register_content ">
          <Container className="Register_Container">
              <div className="register">
                <form onSubmit={handleSubmit}>
                <div className="d-flex  justify-content-center align-items-center flex-row gap-3">
                  <div>
                  <img src={logo} height={"100px"} width={"100px"} alt="Logo" style={{borderRadius:"50%"}}/>
                  </div>
                  <div>
                    <p className="text-center text-amber-100">Welcome </p>
                    <p className="text-center text-amber-200">Register to continue</p>
                  </div>
                </div>
                  <div className=" ">
                    <div>
                      
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter Your Name"
                        className={`form-input ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Your Email"
                        // className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        onBlur={handleFocus}
                        focused={focused.toString()}
                      />
                      <span>Enter correct Email ID</span>
                    </div>
                    <div>
                      
                      <div>
                        <div className="password_input-container">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password "
                            name="password"
                            placeholder="Enter Password"
                            // className={`form-input input-field ${errors.password ? 'is-invalid' : ''}`}
                            value={formData.password}
                            onChange={handleChange}
                            minLength="5"
                            // required
                            onBlur={handleFocus}
                            focused={focused.toString()}
                            // pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                          />
                          <button
                            className="password-button "
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <AiFillEyeInvisible
                                style={{
                                  fontSize: "26px",
                                  color: " rgb(222, 155, 74)",
                                }}
                              />
                            ) : (
                              <AiFillEye
                                style={{
                                  fontSize: "26px",
                                  color: " rgb(222, 155, 74)",
                                }}
                              />
                            )}
                          </button>
                        </div>
                        <span className="text-danger">
                          {/* Password must contain 1 Capital, 1 Small letter, 1number

                      and 1 special character. */}
                          Enter Password
                        </span>
                      </div>
                    </div>
                    <div >
                      
                      <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        placeholder="Enter Mobile No"
                        // className={`form-input ${errors.mobile ? 'is-invalid' : ''}`}
                        value={formData.mobile}
                        onChange={handleChange}
                        pattern="[0-9]{1}[0-9]{9}"
                        onBlur={handleFocus}
                        focused={focused.toString()}
                        required
                      />
                      {errorMessage && (
                        <p
                          className="text-danger bg-white text-center"
                          style={{ borderRadius: "7px" }}
                        >
                          {errorMessage}
                        </p>
                      )}
                      <span>Mobile No should be 10 Digit, Or only number</span>
                    </div>
                    <div >
                      
                      {/* <input
                    type="text"
                    id="sponsorId"
                    name="sponsorId"
                    placeholder="Enter Sponsor ID"
                    className={`form-input ${
                      errors.sponsorId ? "is-invalid" : ""
                    }`}
                    value={formData.sponsorId}
                    onChange={handleChange}
                    required={!location.search}
                    readOnly={location.search ? true : false}
                    defaultValue={location.search.substring(1)}
                  /> */}

                      <input
                        type="text"
                        id="sponsorId"
                        name="sponsorId"
                        placeholder="Enter Sponsor ID"
                        className={`form-input ${
                          errors.sponsorId ? "is-invalid" : ""
                        }`}
                        value={formData.sponsorId}
                        onChange={handleChange}
                        required={!location.search}
                        onBlur={() => {
                          handleFocus();
                          fetchSponsorName(); // Fetch sponsor name when input loses focus
                        }}
                        readOnly={location.search ? true : false}
                        defaultValue={location.search.substring(1)}
                      />
                    </div>
                    {sponsorName ? (
                      <div className="sponsor-name">
                        Sponsor Name: {sponsorName}
                      </div>
                    ) : (
                      <div
                        className="text-center text-danger"
                        style={{ borderRadius: "5px" }}
                      >
                        Sponsor Name Not Found
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={!sponsorName}
                      className="btn-grad m-3"
                      style={{ letterSpacing: "4px", scale: "1.03" }}
                    >
                      {isSubmitting ? "processing..." : "Register"}
                    </Button>
                    <Link
                      style={{ color: "white", marginBottom: "8px" }}
                      to={"/v2/login"}
                    >
                      Already registered{" "}
                      <b style={{ textDecoration: "underline" }}>Login</b>
                    </Link>
                  </div>
                  <div style={{ height: "50px" }}></div>
                </form>
                <ToastContainer />
                {/* {userId && (
      <div className="user-display">
        <h2>User ID: {userId}</h2>
        <h3>Email Id: {emailId}</h3>
      </div>
    )}  */}
              </div>
          </Container>
        </div>
      ) : (
        <div style={{height:'100vh'}}>
        <div className="row loginSuccessCard pt-5">
          <div className="col-10 col-sm-10 col-md-6 col-lg-5 ">
            <div className="loginCardContainer  ">
              <div className="card-circle">
                <h2>✓</h2>
              </div>
              <div className="cardImage">
                <img src={congrats} height="200px" alt="" />
              </div>
              <div className="user-details">
                <h6 className="text-center text-success">
                  You have Successfully Completed your Registration process.
                </h6>
                <h6
                  className="text-center text-secondary"
                  style={{ fontWeight: "bold" }}
                >
                  Hello, {name}
                </h6>
                {/* <h6 className='text-center text-primary' style={{fontWeight:"bold"}}>UserID: {userId}</h6>
                            <h6 className='text-center text-info' style={{fontWeight:"bold"}}>SponsorID: {sponsorId}</h6>
                            <h6 className='text-center text-danger' style={{fontWeight:"bold"}}>Password: {password}</h6> */}
                <div
                  className="table_align mt-3"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <table
                    className=" responsive "
                    style={{
                      width: "280px",
                      boxShadow: "0  1px 6px rgba(0,0,0,0.35)",
                      borderRadius: "7px",
                    }}
                  >
                    <thead>
                      <tr
                        className="text-center text-secondary"
                        style={{ height: "35px" }}
                      >
                        <th>*USERID</th>
                        <td className="text-amber-100 fw-bold">{userId}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        className="text-center text-secondary"
                        style={{ height: "35px" }}
                      >
                        <th>SponsorID</th>
                        <td
                          className="text-secondary"
                          style={{ fontStyle: "700" }}
                        >
                          {sponsorId}
                        </td>
                      </tr>
                      <tr className="text-center" style={{ height: "35px" }}>
                        <th>Password</th>
                        <td className="text-danger">{password}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="loginSuccessButton">
                <button
                  className="m-4 btn btn-dark "
                  onClick={onClickHome}
                >
                  Go Home
                </button>
                {/* <button className='btn btn-outline-secondary' onClick={() => navigator.clipboard.writeText(userId)} >
                          Copy userId
                         </button> */}
                {/* <button className='btn btn-outline-secondary' onClick={() => {
                                navigator.clipboard.writeText(userId);
                                    alert('User Id is copied!');
                                    alert(userId);
                             }}>copy userId</button> */}
                {/* <button
                  className="btn btn-outline-secondary"
                  onClick={async () => {
                    try {
                      // Display userId in the console
                      console.log(userId);

                      // Attempt to copy userId to clipboard
                      await navigator.clipboard.writeText(userId);

                      // Display a success message
                      alert("User Id is copied!");
                    } catch (error) {
                      console.error("Unable to copy userId", error);
                      alert("Unable to copy userIds");
                    }
                  }}
                >
                  Copy userId
                </button> */}

                <button
                  className="m-2 btn btn-dark  btn-sm "
                  onClick={onLogin}
                  style={{padding:'8px 30px'}}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
