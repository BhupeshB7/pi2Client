import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Button, Alert } from "react-bootstrap";

function ReTopup({ topupWallet }) {
  const [message, setMessage] = useState("");
  const [reTopUpRequired, setReTopUpRequired] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const usersID = localStorage.getItem("GamerUserId");
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [isValid, setIsValid] = useState(true);
const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchActivationStatus = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiUrl}/api/auth/checkActivation/${usersID}`
        );
        setMessage(response.data.message);
        setReTopUpRequired(response.data.reTopUpRequired);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivationStatus();

    return () => {
      // Clean-up function if needed
    };
  }, [usersID]);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const handleActivateUser = async (amount) => {
    if (!userId.trim()) {
      setIsValid(false);
      return;
    }
    if (!amount) {
      alert("Please select an amount.");
      return;
    }
    if (topupWallet < amount) {
      alert("Insufficient funds for Activation");
      return;
    }
    try {
      const response = await fetch(
        `${apiUrl}/api/deposit/topUpUserID/${userId}`,
        // `https://piserver-ljd1.onrender.com/api/deposit/topUpUserID/${data.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            amount,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Activation failed");
      }

      const responseData = await response.json();

      if (responseData.success) {
        // display success message or update user balance
        alert("Account Activated Successfully");
        window.location.href = "/dashboard";
      } else {
        // display error message
        alert(`Activation Failed: ${responseData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Activation failed: ${error.message}`);
    }
  };
  // const handleActivateUser = async () => {
  //   try {
  //     if (!userId.trim()) {
  //       setIsValid(false);
  //       return;
  //     }
  //    else if (topupWallet < 850) {
  //       alert("Insufficient funds for Activation");
  //       return;
  //     }
  //     setLoading(true); // Set loading state when sending request
  //     const response = await fetch(
  //       `https://piserver-ljd1.onrender.com/api/deposit/topUpUserID/${userId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           userId,
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.error || "Activation failed");
  //     }

  //     const responseData = await response.json();

  //     if (responseData.success) {
  //       // Display success message or update user balance
  //       alert("Account Activated Successfully");
  //       window.location.href = "/dashboard";
  //     } else {
  //       // Display error message
  //       setError(responseData.error);
  //     }
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false); // Set loading state to false after request is complete
  //   }
  // };

  return (
    <div>
      {reTopUpRequired && (
        <div className="retopUp-box">
          <div
            className="retopUp_container retopUp_container-box"
            onClick={handleModalOpen}
          >
            <h6 className="text-center" style={{ marginTop: "5px" }}>
              Re-TopUp
            </h6>
            <h6 className="text-center" style={{ marginTop: "-5px" }}>
              Now
            </h6>
          </div>
          {showModal && (
            <Modal
              className="ModalOverlay"
              overlayClassName="Overlay"
              isOpen={showModal}
              onRequestClose={handleModalClose}
              contentLabel="All Reward Details"
            >
              <div className="ModalContent">
                <div className="CloseButton" onClick={handleClose}>
                  <FaTimes />
                </div>
                <div className="retopUp_content">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/6897/6897039.png"
                    alt="warning_retopUP"
                    height="35px"
                    width="35px"
                  />
                  <p className="text-light">{message}</p>
                </div>
                <div className="retopUp_input">
                  <input
                    placeholder="Please, Enter Your UserId"
                    onChange={(e) => {
                      setUserId(e.target.value);
                      setIsValid(true); // Reset validation state when input changes
                    }}
                    required // adding the required attribute
                    className={!isValid ? "is-invalid" : ""}
                  />
                  {!isValid && (
                    <div className="invalid-feedback">
                      Please enter a User ID
                    </div>
                  )}
                  <div className="select_package_box">
                    <div className="select_package">
                      <button onClick={() => setSelectedAmount(500)}>
                        500{" "}
                        <b className="text-xl">
                          {selectedAmount === 500 && "✓"}
                        </b>
                      </button>
                    </div>
                    <div className="select_package">
                      <button onClick={() => setSelectedAmount(1000)}>
                        1000{" "}
                        <b className="text-xl">
                          {selectedAmount === 1000 && "✓"}
                        </b>
                      </button>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => handleActivateUser(selectedAmount)}
                    disabled={loading}
                  >
                    {loading ? (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Re-TopUp"
                    )}
                  </Button>
                </div>
                {error && (
                  <Alert variant="danger" dismissible>
                    {error}
                  </Alert>
                )}
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}

export default ReTopup;
