import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Captcha.css"; // Import CSS file
import { FaCheck } from "react-icons/fa";
import { BiError } from "react-icons/bi";
function Captcha({ onVerification }) {
  const [captcha, setCaptcha] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [matchSuccess, setMatchSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    refreshCaptcha();
  }, []);

  const refreshCaptcha = () => {
    axios
      .post(`${apiUrl}/captcha/refresh`)
      .then((response) => {
        setCaptcha(response.data.captcha);
        setMatchSuccess(false); // Reset match success status
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Error refreshing captcha:", error);
      });
  };

  const handleInputChange = (event) => {
    setInputCaptcha(event.target.value);
    setErrorMessage(""); // Reset error message when user starts typing
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/captcha/verify`, {
        userInput: inputCaptcha,
      });

      if (response.data.success) {
        setMatchSuccess(true);
        setErrorMessage("");
        onVerification(true);
      } else {
        setErrorMessage(response.data.message);
        onVerification(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Invalid captcha format");
        onVerification(false);
      } else {
        console.error("Error verifying captcha:", error.message);
        setErrorMessage("Error verifying captcha. Please try again later.");
        onVerification(false);
      }
    }
  };

  return (
    <>
          {errorMessage && <p className="error-message"><BiError  size={24} color="red" style={{marginRight:"5px"}} />{errorMessage}</p>}
          {matchSuccess && (
            <p className="success-message"><FaCheck size={24} color="green" style={{marginRight:"5px"}} /> Captcha Verified successfully!</p>
          )}
    <div className="captcha-container">
      <div className="captcha-form">
        <div className="captcha-refresh">
          {/* <p className="captcha-code"> RHBRYY88 </p> */}
          <p className="captcha-code">{captcha} </p>
          <img
            src="https://cdn-icons-png.flaticon.com/128/3227/3227520.png"
            className="refresh-icon"
            onClick={refreshCaptcha}
          />
        </div>
        <div className="captcha-input">
          <input
            type="number"
            value={inputCaptcha}
            onChange={handleInputChange}
            className="captcha-text-input m-1"
            required
            maxLength={6}
            minLength={6}
            placeholder="Enter Captcha"
          />
        </div>
        <button class="button-30" onClick={handleSubmit} role="button">
          Verify
        </button>
      </div>
    </div>
    </>
  );
}

export default Captcha;
