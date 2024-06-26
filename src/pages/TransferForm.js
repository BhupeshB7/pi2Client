import React, { useState } from "react"
import axios from "axios";
import Button from "../components/Home/Button";
import { FaSearch } from "react-icons/fa";
import api from "../components/Task/Services";
const TransferForm = ({ sourceUserId }) => {
  const [targetUserId, setTargetUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
const apiUrl = process.env.REACT_API_API_URL
  const handleSearch = () => {
    if (!targetUserId) {
      setErrorMessage("Please enter a User ID.");
      setUserName("");
      setNotFound(false);
      return;
    }

    api
      .get(
        `/targetTransfer/name/${targetUserId}`
      )
      .then((response) => {
        if (response.data.name) {
          setUserName(response.data.name);
          setNotFound(false);
          setErrorMessage("");
        } else {
          setNotFound(true);
          setErrorMessage("User not found");
        }
      })
      .catch((error) => {
        console.error(error);
        setNotFound(true);
        setErrorMessage("User Not Found");
      });
  };
  const handleTransfer = async (e) => {
    e.preventDefault();
    if (sourceUserId === targetUserId) {
      setError("Please enter different user IDs. Both are the same user ID.");
      return;
    }
    try {
      // Send a request to the backend API
      const response = await api.post(
        `/transferTopupWallet`,
        {
          sourceUserId,
          targetUserId,
          amount: parseFloat(amount),
        }
      );

      // Display a success message
      setMessage(response.data.message);
      setError("");
      // Reset the form
      setTargetUserId("");
      setAmount("");
      // setMessage("");
      // Reload the page
      // window.location.reload();
    } catch (error) {
      // Display an error message if the transfer fails
      setMessage("");
      setError(error.response.data.error);
      // Reset the form
      setTargetUserId("");
      setAmount("");
      // console.log(error)
    }
  };

  return (
    <div>
      <h6 className="text-center text-warning m-2">
        Transfer Topup Wallet Amount
      </h6>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
      <div className="transferWallet">
        <div className=" ">
          <div>
            <label>User ID:</label>
            <br />
            <input type="text" value={sourceUserId} readOnly />
          </div>
          <div>
            <label>TransferAccount User ID:</label> <br />
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
                required
                className="target-user"
              />
              {/* <img
                src="https://cdn-icons-png.flaticon.com/128/954/954591.png"
                height="30px"
                width="30px"
                alt="search"
                className="search-icon"
                onClick={handleSearch}
              /> */}
              <FaSearch className="search-icon text-2xl text-amber-200"
                onClick={handleSearch} />
            </div>{" "}
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {!errorMessage && notFound ? (
            <p>User not found</p>
          ) : (
            userName && (
              <p className="text-center text-info">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/7641/7641727.png"
                  height="30px"
                  width="30px"
                  alt="verified"
                />{" "}
                User Name: {userName}
              </p>
            )
          )}

          <div>
            <label>Transfer Amount:</label> <br />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <Button
            variant="info"
            className="mt-2"
            type="submit"
            onClick={handleTransfer}
          >
            Transfer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransferForm;
