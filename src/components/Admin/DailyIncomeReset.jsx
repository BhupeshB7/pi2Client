import React, { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import Button from "../Home/Button";
import axios from "axios";
const  DailyIncomeReset = () => {
  const [isReset, setIsReset] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const resetDailyIncome = async () => {
    const resetConfirm = window.confirm(
      "Are you sure you want to reset daily income?"
    );
    if (resetConfirm) {
      try {
        setIsReset(true);
        const response = await axios.put(
          "https://piserver-ljd1.onrender.com/api/task/resetDailyIncome"
        );
        setSuccessMessage(response.data.message); // Setting success message
        setErrorMessage("");
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } catch (error) {
        setIsReset(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setErrorMessage(error.response.data.error); // Setting error message
        } else {
          setErrorMessage("An error occurred while resetting daily income.");
        }
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } finally {
        setIsReset(false);
      }
    }
  };

  return (
    <>
      <Container className="pt-2 pb-2 d-flex justify-content-center align-items-center">
        <div className="resetdailyIncome_box">
          <p className="text-zinc-600 text-start ">Reset Daily Income</p>
          {successMessage && (
            <h6 className="text-green-800 text-start bg-green-100 p-2 m-1">
              {successMessage}
            </h6>
          )}
          {errorMessage && (
            <h6 className="text-red-700 text-start bg-red-100 p-2 m-1">
              {errorMessage}
            </h6>
          )}
          <Button onClick={resetDailyIncome} className="btn btn-primary">
            {isReset ? "please wait..." : "Reset"}
          </Button>
        </div>
      </Container>
    </>
  );
};

export default DailyIncomeReset;
