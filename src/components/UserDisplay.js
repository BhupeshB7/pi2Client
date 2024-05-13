import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsWhatsapp } from "react-icons/bs";
import Modal from "react-modal";
import {
  FaTimes,
  FaPlusCircle,
  FaRupeeSign,
  FaTasks,
  FaUser,
} from "react-icons/fa";
import { IoTimer } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import "./Dashboard.css";
import logo from "../assets/PI1.png";
import spinner from "../assets/spinner2.gif";
// import ram from "../assets/RAM.mp4";
import { MdOutlineTransferWithinAStation, MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { ImWhatsapp } from "react-icons/im";
import { BsTelegram } from "react-icons/bs";
import { MdGroups2 } from "react-icons/md";
import { HiOutlineArrowUpTray } from "react-icons/hi2";
import { RiExchangeFundsLine } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import QRCodeGenerator from "../pages/QRCodeGenerator";
import ControlledCarousel from "./CarouselComponent";
import ParticleComponent from "./Task/ParticleComponent";
import FileInput from "../extra/App";
import DisplayImage from "../extra/DisplayImage";
import TeamTaskReport from "./TteamTaskReport";
import { Col, Container, Row } from "react-bootstrap";
import Button from "./Home/Button";
import TeamTable from "./TeamTable";
import TimerComponent from "./TimerComponent";
import ReTopup from "./ReTopup";
import Award from "../pages/Awards/Award";
import Blocked from "./Dashboard/Blocked";
import DashboardNavbar from "./Dashboard/DashoardNavbar";
import BottomMenu from "./Dashboard/BottomMenu";
const getTokenExpireTime = () => {
  const tokenExpire = localStorage.getItem("tokenExpire");
  return tokenExpire ? parseInt(tokenExpire) : null;
};

const isTokenExpired = () => {
  const expireTime = getTokenExpireTime();
  return expireTime ? expireTime < Date.now() : true;
};
//
const HappyNewYearAnimation = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div style={{ width: "100%", height: "800px" }}>
        {/* <div
          style={{
            height: "100%",
            paddingBottom: "177.77777777777777%",
            position: "relative",
            width: "100%",
          }}
        >
          <iframe
            title="Happy New Year Animation"
            src={ram}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            style={{ left: 0, position: "absolute", top: 0 }}
            autoplay // add autoplay attribute
            muted // add muted attribute
          ></iframe>
          
        </div> */}
        <h6 className="text-secondary text-center">Loading...</h6>
      </div>
    </div>
  );
};

const Dashboard = ({ contactInfoList }) => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    // Check if the flag is present in local storage
    const hasAnimationShownBefore = localStorage.getItem(
      "hasAnimationShownBefore"
    );

    if (hasAnimationShownBefore) {
      // Animation has been shown before, don't show it again
      setShowAnimation(false);
    } else {
      // Set a timer to hide the animation after 5 seconds
      const timer = setTimeout(() => {
        setShowAnimation(false);
        // Set the flag in local storage to indicate that the animation has been shown
        localStorage.setItem("hasAnimationShownBefore", true);
      }, 1000);

      // Clear the timer when the component is unmounted
      return () => clearTimeout(timer);
    }
  }, []);
  return (
    <div>
      {showAnimation ? (
        <HappyNewYearAnimation />
      ) : (
        <Dashboard1 contactInfoList={contactInfoList} />
      )}
    </div>
  );
};
//
const Dashboard1 = ({ contactInfoList }) => {
  // State declarations
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [data, setData] = useState([]);
  const [realTimeDate, setRealTimeDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [dailyIncome, setDailyIncome] = useState("");
  // For Direct
  const [isDirectModelOpen, setIsDirectModelOpen] = useState(false);
  // const [isTeamModelOpen, setIsTeamModelOpen] = useState(false);
  const [teamStructure, setTeamStructure] = useState([]);
  const [currentDownline, setCurrentDownline] = useState([]);
  const [visitedDownlines, setVisitedDownlines] = useState([]);
  const [rank, setRank] = useState("Loading...");
  const [activeUsersByLevel, setActiveUsersByLevel] = useState([]);
  //for fund move
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(500);
  // For deposit

  // const [activeUserData, setActiveUserData] = useState([]);

  // For Withdrawal
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState("");
  const [userStatus, setUserStatus] = useState(null);
  const [showTopUpButton, setShowTopUpButton] = useState(false);
  const [topupButton, setTopupButton] = useState(true);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [imagePresent, setImagePresent] = useState(false);
  const [mlmAward, setmlmAward] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenFundMove, setModalIsOpenFundMove] = useState(false);
  const [modalIsOpenWithdrawal, setModalIsOpenWithdrawal] = useState(false);
  const handleMLMAwards = () => {
    setmlmAward(!mlmAward);
  };
  // Callback function to set the imagePresent state when an image is successfully uploaded
  const handleImageUploadSuccess = () => {
    setImagePresent(true);
  };
  // useEffect hooks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mlm-eo5g.onrender.com/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        // const userLevel = getUserLevel(result.level);
        // setLevel(userLevel);
        // Store userId in localStorage
        if (result.userId) {
          localStorage.setItem("GamerUserId", result.userId);
          localStorage.setItem("GameAccountName", result.accountHolderName);
          localStorage.setItem("GamerIFSCCODE", result.ifscCode);
          localStorage.setItem("GameAccountNo", result.accountNo);
          localStorage.setItem("GameGPay", result.GPay);
        }
        if (result.role) {
          const userrole = result.role;
          // console.log(userrole);
          if (userrole === "admin") {
            localStorage.setItem("check", "nfwnwen");
          }
        }
        setData(result);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    if (data.userId && data.updatedAt) {
      const convertTimestamp = () => {
        const date = new Date(data.updatedAt);
        const realTime = date.toLocaleString();
        setRealTimeDate(realTime);
      };

      convertTimestamp();
    }
  }, [data]);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        // const response = await fetch(`https://mlm-eo5g.onrender.com/api/daily-level-income/users/${data.userId}`);
        const response = await fetch(
          `https://mlm-eo5g.onrender.com/api/daily-level-income/users/${data.userId}`,
          {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
            method: "GET",
          }
        );
        const dailyLevel = await response.json();
        setDailyIncome(dailyLevel.dailyIncome);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIncome();
  }, [data.userId]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://mlm-eo5g.onrender.com/api/users/teamStructureRank/${data.userId}`
  //     )
  //     .then((response) => {
  //       const data = response.data;
  //       if (data.rank === "Fresher") {
  //         setRank("FRESHER");
  //       } else {
  //         // setRank(`Congratulations! You have achieved the rank: ${data.rank}.`);
  //         setRank(`${data.rank}.`);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setRank("An error occurred while fetching the data.");
  //     });
  // }, [data.userId]);
  useEffect(() => {
    axios
      .get(
        `https://mlm-eo5g.onrender.com/api/users/teamStructureRank/${data.userId}`
      )
      .then((response) => {
        const responseData = response.data;

        setRank(responseData.rank);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setRank("An error occurred while fetching the data.");
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false regardless of success or error
      });
  }, [data.userId]);
  useEffect(() => {
    // Call the backend API to get the team structure
    axios
      .get(
        `https://mlm-eo5g.onrender.com/api/users/teamStructure/${data.userId}`
      )
      .then((response) => {
        setActiveUsersByLevel(response.data);
      })
      .catch((error) => {
        console.error("Error fetching team structure:", error);
      });
  }, [data.userId]);

  useEffect(() => {
    const fetchTeamStructure = async (userId) => {
      try {
        const response = await axios.get(
          `https://mlm-eo5g.onrender.com/api/users/team/${userId}`
        );
        setTeamStructure(response.data);
        setCurrentDownline(response?.data?.downline);
      } catch (error) {
        console.error("Error fetching team structure:", error);
      }
    };
    fetchTeamStructure(data.userId);
  }, [data.userId]);

  useEffect(() => {
    // fetchTopupAmount(data.userId);
    const fetchTopupAmount = async (userID) => {
      try {
        const response = await axios.get(
          `https://mlm-eo5g.onrender.com/api/deposit/topUpuserAmount/${userID}`
        );
        console.log("API Response:", response.data);
        console.log(data.userId);

        const { deposit } = response.data;

        if (!deposit) {
          console.log("User not found!");
          return;
        }

        const { depositAmount, isApproved } = deposit;
        console.log("Deposit Amount:", depositAmount);
        // setTopUpAmount(response.data);
        setTopUpAmount(depositAmount);
        setIsApproved(isApproved);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopupAmount(data.userId);
    // console.log(data.userId)
  }, [data.userId]);

  useEffect(() => {
    if (isTokenExpired()) {
      setIsTokenValid(false);
      // redirect to homepage
      window.location.href = "/v2/login";
    }
  }, []);

  const handleWithdrawalSubmit = (e) => {
    e.preventDefault();
    // Disable the withdraw button to prevent multiple clicks
    document.getElementById("withdrawButton").disabled = true;
    const amount = Number(withdrawalAmount); // convert string to number
    fetch(
      `https://mlm-eo5g.onrender.com/api/withdraw/user/${data.userId}`,
      // `http://localhost:5500/api/withdraw/user/${data.userId}`,
      {
        // fetch(`http://localhost:5000/api/withdraw/user/${data.userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          ifscCode: data.ifscCode,
          accountNo: data.accountNo,
          accountHolderName: data.accountHolderName,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // display success message or update user balance
          toast.success("Withdrawal successful");
        } else {
          // display error message
          toast.error(`Withdrawal failed: ${data.error}`);
          // toast.error('Sunday Closed')
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(`Withdrawal failed: ${error.message}`);
        // toast.error('Sunday closed!!!')
      })
      .finally(() => {
        // Re-enable the withdraw button after receiving the response
        document.getElementById("withdrawButton").disabled = false;
      });
  };

  //Fund move API and Function start
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  // const handleFundMoveSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       `https://mlm-eo5g.onrender.com/api/transfer/${data._id}`,
  //       { amount: parseFloat(amount) }
  //     );
  //     setMessage(response.data.message);
  //     alert(response.data.message);
  //   } catch (error) {
  //     setMessage(error.response.data.error);
  //   }
  // };
  const handleFundMoveSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://mlm-eo5g.onrender.com/api/transfer/${data._id}`,
        { amount: parseFloat(amount) }
      );

      if (response.data.error) {
        // Handle error messages
        setMessage(response.data.error);
        alert(response.data.error);
      } else {
        // Handle success message
        setMessage(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      // Handle network or unexpected errors
      setMessage(data.error);
    }
  };

  //Fund move API and Function End

  const handleClick = async () => {
    try {
      const response = await fetch(
        "https://mlm-eo5g.onrender.com/api/deposit/topUpActivate/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );
      const data = await response.json();
      setTopupButton(false); // Hide the button after getting the user status
      if (data.status === "not_found") {
        alert("user not found!");
        setUserStatus(null);
        setTopupButton(true);
      } else {
        // setUserStatus(data.status);
        // setUserStatus(data.name + " is " + (data.status));
        setShowTopUpButton(data.status === false);
        if (data.status === true) {
          setUserStatus("Name:" + data.name + "\nuserId is Active");
        } else {
          setUserStatus("Name:" + data.name + "\n, Account Status  Inactive");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleActivateUser = async () => {
  //   if (data.topupWallet < 850) {
  //     alert("Insufficient funds for Activation");
  //     return;
  //   }
  //   try {
  //     const response = await fetch(
  //       `https://mlm-eo5g.onrender.com/api/deposit/topUpUserID/${data.userId}`,
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
  //       // display success message or update user balance
  //       alert("Account  Activated Successfully");
  //       window.location.href = "/dashboard";
  //     } else {
  //       // display error message
  //       alert(`Activation Failed: ${responseData.error}`);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert(`Activation failed: ${error.message}`);
  //   }
  // };

  // Rendering
  const handleActivateUser = async (amount) => {
    if (!amount) {
      alert("Please select an amount.");
      return;
    }
    if (data.topupWallet < amount) {
      alert("Insufficient funds for Activation");
      return;
    }
    try {
      const response = await fetch(
        `https://mlm-eo5g.onrender.com/api/deposit/topUpUserID/${data.userId}`,
        // `https://mlm-eo5g.onrender.com/api/deposit/topUpUserID/${data.userId}`,
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


  const navigate = useNavigate();

  if (isLoading) {
    return (
      <h6
        className="text-center"
        style={{
          marginTop: "-70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <img
          src={spinner}
          alt="spinner"
          height="90px"
          width="90px"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </h6>
    );
  }

  const handleTasks = () => {
    navigate("/tasks");
  };

  

  // For User LogOut
  const handleLogin = () => {
    window.location.href = "/login";
  };

  // The rest of your component's code...

  const customModalStyles = {
    content: {
      width: "100%", // Set the width of the modal here
      height: "400px",
      left: "1px",
      zIndex: "9999",
      position: "absolute", // or "fixed" depending on your layout
      top: "auto",
      bottom: "0px",
      borderRadius: "4px",
    },
  };

  if (isLoading) {
    return (
      <h6
        className="text-center"
        style={{
          marginTop: "-70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <img
          src={spinner}
          alt="spinner"
          height="90px"
          width="90px"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </h6>
    );
  }

  // const handleViewMore = (downline) => {
  //   setCurrentDownline(downline);
  // };
  const handleViewMore = (downline) => {
    setVisitedDownlines((prevVisited) => [...prevVisited, currentDownline]); // Save the current downline in the visitedDownlines array
    setCurrentDownline(downline);
  };

  const handleViewBack = () => {
    const lastVisitedDownline = visitedDownlines.pop(); // Retrieve the last visited downline from the array
    setCurrentDownline(lastVisitedDownline);
    setVisitedDownlines([...visitedDownlines]); // Update visitedDownlines by removing the last element
  };

  // referral link
  const referralLink = `https://powerfullindia.com/v2/register?ref=${data.userId}`;
  // const referralLink = `https://globalsuccesspoint.in/register?ref=${data.userId}`;

  // const handleCopy = () => {
  //   navigator.clipboard.writeText(referralLink);
  //   setCopied(true);
  //   alert('copied')
  // };
  // const handleCopy = async () => {
  //   try {
  //     await navigator.clipboard.writeText(referralLink);
  //     setCopied(true);
  //   } catch (error) {
  //     console.error('Failed to copy: ', error);
  //     alert('Failed to copy: ', error);
  //   }
  // };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(referralLink)
        .then(() => setCopied(true))
        .catch((error) => console.error("Failed to copy: ", error));
    } else {
      fallbackCopyTextToClipboard(referralLink);
    }
  };

  const handleWhatsAppClick = () => {
    const message = `https://powerfullindia.com/v2/register?ref=${data.userId}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Set the textarea off-screen
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      setCopied(successful);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }

    document.body.removeChild(textArea);
  };

  const levelCounts = [1, 10, 70, 350, 800, 2000];
  const levelRanks = [
    "Fresher",
    "Bronze",
    "Silver",
    "Gold",
    "Royal Star",
    "Diamond",
  ];

  const depositFormPage = () => {
    window.location.href = "/depositform";
  };
  const totalIncome = data.selfIncome + data.teamIncome + data.rewards;
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleClose = () => {
    setModalIsOpen(false);
  };
  const openModalFundMove = () => {
    setModalIsOpenFundMove(true);
  };

  const closeModalFundMove = () => {
    setModalIsOpenFundMove(false);
  };
  const handleCloseFundMove = () => {
    setModalIsOpenFundMove(false);
  };
  const openModalWithdrawal = () => {
    setModalIsOpenWithdrawal(true);
  };

  const closeModalWithdrawal = () => {
    setModalIsOpenWithdrawal(false);
  };
  const handleCloseWithdrawal = () => {
    setModalIsOpenWithdrawal(false);
  };
  return (
    <div className=" bg-zinc-900 bg-[linear-gradient(to_right,#8080800a_2px,transparent_2px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:21px_30px]">
      <div>
        {data.isBlocked ? (
          <>
            <Blocked />
          </>
        ) : (
          <>
            <div className="dashboard-bg" style={{ zIndex: "1000" }}>
              {token && isTokenValid ? (
                <>
                  <div>
                    <DashboardNavbar data={data}/>
                  </div>

                  {/* Dashboard-Navbar */}

                  {/*  */}
                  <div className="container-fluid dashboard">
                    <ControlledCarousel />
                    {token ? (
                      <div className="border-wrapper mt-2 d-flex flex-column justify-content-center align-items-center dashboard-profile-center">
                        <div className="dashboard-profile ">
                          <h6
                            className="text-center d-flex text-amber-100"
                            style={{
                              justifyContent: "center",
                              letterSpacing: "2px",
                            }}
                          >
                            Hello, {data.name}
                          </h6>
                          <h6
                            className="text-center fw-bold "
                            style={{ color: "cyan" }}
                          >
                            UserID: {data.userId}
                          </h6>
                          <h6
                            className="text-center "
                            style={{ color: "#aaa" }}
                          >
                            Email: {data.email}
                          </h6>
                          <h6 className="text-center" style={{ color: "#ccc" }}>
                            SponsorID: {data.sponsorId}
                          </h6>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h6 className="text-center text-secondary">
                          Re login to continue...
                        </h6>
                        <Link
                          to="/v2/login"
                          className="text-center text-primary"
                          style={{ textDecoration: "underline" }}
                        >
                          Login
                        </Link>
                      </>
                    )}

                    <div className="id-status" style={{ letterSpacing: "2px" }}>
                      <ReTopup topupWallet={data.topupWallet} />
                      <h6 className=" mt-2 text-light ms-5 fw-bold">
                        ID Status: {data.is_active ? "Active" : "Inactive"}
                      </h6>
                    </div>
                    <div
                      className="dashboard-rank"
                      style={{ letterSpacing: "2px" }}
                    >
                      <div className="text-light ms-5 fw-bold">
                        {isLoading ? (
                          <p className="text-light">Loading...</p>
                        ) : (
                          <div>
                            <h6 className="fw-400">Rank: {rank}</h6>
                            {/* Render other team structure data */}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Balance Section */}

                    <div
                      className="row mt-1 rowBalanceCard "
                      style={{
                        color: "white",
                      }}
                    >
                      <div className="team_structure_text">
                        <h6
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          style={{ opacity: ".9" }}
                        >
                          TEAM STRUCTURE
                        </h6>
                      </div>
                      <TeamTaskReport userId={data.userId} />
                      <Container>
                        <Row className="d-flex justify-content-center align-items-center">
                          <Col
                            xs={12}
                            sm={10}
                            md={6}
                            lg={6}
                            xl={6}
                            className="d-flex justify-content-center align-items-center mt-1 pl-5 pr-5"
                          >
                            <div className="content_card">
                              <div className="symbol">
                                <FaRupeeSign />
                              </div>

                              <p className="content_text today_income">
                                TODAY INCOME
                              </p>
                              <h6 className="money">{data.dailyIncome} </h6>
                            </div>
                          </Col>
                          <Col
                            xs={12}
                            sm={10}
                            md={6}
                            lg={6}
                            xl={6}
                            className="d-flex justify-content-center align-items-center mt-1 pl-5 pr-5 "
                          >
                            <div
                              className="content_card"
                              onClick={handleTasks}
                              userID={data.userId}
                            >
                              <div className="symbol">
                                <FaTasks />
                              </div>
                              <p className="content_text">TODAY'S TASK</p>
                            </div>
                          </Col>
                        </Row>
                      </Container>

                      <Container>
                        <Row className="d-flex justify-content-center align-items-center">
                          <Col
                            xs={12}
                            sm={10}
                            md={6}
                            lg={6}
                            xl={6}
                            className="d-flex justify-content-center align-items-center mt-1 pl-5 pr-5 "
                          >
                            <Link
                              to="/depositform"
                              onClick={() => depositFormPage}
                              className="content_card"
                            >
                              <div className="symbol">
                                <FaPlusCircle />
                              </div>
                              <h6 className="content_text"> DEPOSIT</h6>
                            </Link>
                          </Col>
                          <Col
                            xs={12}
                            sm={10}
                            md={6}
                            lg={6}
                            xl={6}
                            className="d-flex justify-content-center align-items-center mt-1 pl-5 pr-5 "
                          >
                            <div
                              onClick={openModalWithdrawal}
                              className="content_card"
                            >
                              <div className="symbol">
                                {" "}
                                <MdOutlineTransferWithinAStation />
                              </div>
                              <h6 className="content_text"> WITHDRAWAL</h6>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                    {/* Balance section End */}
                    <Container>
                      <Row className="d-flex justify-content-center align-items-center">
                        <Col
                          xs={12}
                          sm={10}
                          md={6}
                          lg={6}
                          xl={6}
                          className="d-flex justify-content-center align-items-center p-2"
                        >
                          <div className="income_card">
                            <div>
                              <div className=" incomeCard">
                                <div className="text-center  text-amber-100 text-xl ">
                                  INCOME
                                </div>
                                <div className="income_card1">
                                  <div className="income_subCard">
                                    {/* Your Total Income: {data.income} Rs */}
                                    <div className="symbol">
                                      <FaRupeeSign />
                                    </div>
                                    <p className="text-center text-xl text-amber-100">
                                      {totalIncome}{" "}
                                    </p>
                                  </div>
                                  <div className="income_subCard">
                                    {/* Your Total Income: {data.income} Rs */}
                                    <div className="symbol">
                                      <img
                                        src="https://cdn.iconscout.com/icon/premium/png-512-thumb/reward-3065890-2547950.png?f=webp&w=256"
                                        alt="reward"
                                        height="30px"
                                        width="30px"
                                      />
                                    </div>
                                    <p className="text-center text-xl text-amber-100">
                                      {data.rewards}{" "}
                                    </p>
                                  </div>
                                </div>
                                <div className="income_card1">
                                  <div className="income_subCard">
                                    {/* Your Total Income: {data.income} Rs */}
                                    <div className="symbol">
                                      <FaUser />
                                    </div>
                                    <p className="text-center text-xl text-amber-100">
                                      {data.selfIncome}{" "}
                                    </p>
                                  </div>
                                  <div className="income_subCard">
                                    {/* Your Total Income: {data.income} Rs */}
                                    <div className="symbol">
                                      <RiTeamFill />
                                    </div>
                                    <p className="text-center text-xl text-amber-100">
                                      {" "}
                                      {data.teamIncome}{" "}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col
                          xs={12}
                          sm={10}
                          md={6}
                          lg={6}
                          xl={6}
                          className="d-flex justify-content-center align-items-center mt-1 pl-4 pr-4"
                        >
                          {/* Referral Section */}
                          <div className="">
                            <div>
                              <div className="referralCard">
                                <p className="text-center text-xl text-amber-100">
                                  Referral Link
                                </p>
                                <div>
                                  <div className="form_input">
                                    <input
                                      type="text"
                                      value={referralLink}
                                      readOnly
                                      style={{ color: "#eee" }}
                                    />
                                  </div>
                                  <div className="referral-button">
                                    <button
                                      className="referral-button"
                                      onClick={handleCopy}
                                    >
                                      {copied ? (
                                        <div className="text-light">
                                          Copied!
                                        </div>
                                      ) : (
                                        <>
                                          {/* <h6 className='text-dark' style={{paddingTop:"5px"}}>COPY LINK</h6> */}
                                          <img
                                            src="https://cdn-icons-png.flaticon.com/128/1828/1828249.png"
                                            height="25px"
                                            width="25px"
                                            alt=""
                                          />
                                        </>
                                      )}
                                    </button>

                                    <div
                                      style={{
                                        margin: "15px",
                                        display: "inline",
                                      }}
                                    >
                                      {/* <a className='text-success' href={`https://api.whatsapp.com/send?text=${encodeURIComponent(referralLink)}`} target="_blank"> */}

                                      <BsWhatsapp
                                        style={{
                                          height: "28px",
                                          width: "28px",
                                          color: "green",
                                        }}
                                        onClick={handleWhatsAppClick}
                                      />
                                      <div>
                                        <QRCodeGenerator userId={data.userId} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/*  */}
                              </div>
                            </div>
                          </div>
                          {/* Referal section End */}
                        </Col>
                      </Row>
                    </Container>

                    {/* Balance section End */}
                    {/* Topup and fund section */}
                    <Container>
                      <Row>
                        <Col
                          xs={12}
                          sm={10}
                          md={6}
                          lg={6}
                          xl={6}
                          className="d-flex justify-content-center align-items-center p-2"
                        >
                          <div className="income_card1">
                            <div className="income_subCard" onClick={openModal}>
                              <div className="symbol">
                                <HiOutlineArrowUpTray />
                              </div>
                              <p className="topUptext ">TopUp</p>
                            </div>
                            <div
                              className="income_subCard"
                              onClick={openModalFundMove}
                            >
                              <div className="symbol">
                                <RiExchangeFundsLine />
                              </div>
                              <p className="topUptext ">Fund Move</p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                    {/* Topup and fund section */}
                    {/* Team Structure Start */}
                    {/* Modal */}
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog ">
                        <div className="modal-content teamStructure_background">
                          <div className="modal-header">
                            <h5
                              className="modal-title text-warning"
                              id="exampleModalLabel"
                            >
                              TEAM STRUCTURE
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <div
                            className="modal-body"
                            style={{ overflowX: "auto" }}
                          >
                            <table className="table table-bordered">
                              <thead className="fw-300">
                                <tr className="text-light">
                                  <th>S.No</th>
                                  <th>Level</th>
                                  <th>Active</th>
                                  <th style={{ width: "60px" }}>InActive</th>
                                  <th>Target Team</th>
                                  <th>Rank</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.keys(activeUsersByLevel).map(
                                  (level, index) => (
                                    <tr key={level}>
                                      <td className="text-warning text-center">
                                        {index + 1}
                                      </td>
                                      <td
                                        className=" text-center"
                                        style={{ color: "#fccb90" }}
                                      >
                                        {level}
                                      </td>
                                      <td className="text-light text-center">
                                        {activeUsersByLevel[level].active}
                                      </td>
                                      <td
                                        className="text-center"
                                        style={{ color: "#fccb90" }}
                                      >
                                        {activeUsersByLevel[level].inactive}
                                      </td>
                                      <td className="text-light text-center">
                                        {levelCounts[index]}
                                      </td>
                                      <td
                                        className=" text-center"
                                        style={{ color: "#fccb90" }}
                                      >
                                        {levelRanks[index]}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                          <div className="modal-footer"></div>
                        </div>
                      </div>
                    </div>

                    {/* Team Structure End */}
                    {/* Withdrawal */}
                    <Modal
                      className="ModalOverlay"
                      overlayClassName="Overlay"
                      isOpen={modalIsOpenWithdrawal}
                      onRequestClose={closeModalWithdrawal}
                      contentLabel="All Reward Details"
                    >
                      <div className="ModalContent">
                        <div
                          className="CloseButton"
                          onClick={handleCloseWithdrawal}
                        >
                          <FaTimes />
                        </div>
                        {/* withdrawal content */}
                        <div className="content_container">
                          <form onSubmit={handleWithdrawalSubmit}>
                            <div
                              className="formInput"
                              style={{
                                paddingTop: "20px",
                                marginBottom: "8px",
                              }}
                            >
                              <label style={{ fontSize: "17px" }}>
                                Account No:
                              </label>
                              {/* <input>value={data.accountNo}</input> */}
                              <input
                                type="text"
                                value={data.accountNo}
                                disabled
                              />
                              <label style={{ fontSize: "17px" }}>
                                IFSC CODE:
                              </label>
                              {/* <input>value={data.ifscCode}</input> */}
                              <input
                                type="text"
                                value={data.ifscCode}
                                disabled
                              />

                              <label style={{ fontSize: "17px" }}>
                                Account Holder Name:
                              </label>
                              {/* <input>value={data.GPay}</input> */}
                              <input
                                type="text"
                                value={data.accountHolderName}
                                disabled
                              />

                              <label>Withdraw Amount</label>
                              <input
                                type="number"
                                value={withdrawalAmount}
                                onChange={(e) =>
                                  setWithdrawalAmount(e.target.value)
                                }
                              />
                              <Button
                                id="withdrawButton"
                                disabled={!withdrawalAmount}
                              >
                                Withdraw
                              </Button>
                            </div>
                          </form>
                          <ToastContainer />
                        </div>
                        {/* withdrawal content */}
                      </div>
                    </Modal>

                    <Modal
                      className="ModalOverlay"
                      overlayClassName="Overlay"
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      contentLabel="All Reward Details"
                    >
                      <div className="ModalContent">
                        <div className="CloseButton" onClick={handleClose}>
                          <FaTimes />
                        </div>
                        <div style={{ height: "100%" }}>
                          <div
                            className="d-flex align-tems-center"
                            style={{ flexDirection: "row-reverse" }}
                          >
                            {/* TopUp content */}

                            <div>
                              <div className="mb-3">
                                <>
                                  <h6 className="text-amber-200 text-center mt-3 text-md">
                                    Balance :{" "}
                                    <b className="text-xl">
                                      {data.topupWallet}
                                    </b>
                                  </h6>
                                  <div className="topUpForm mt-2 mb-3">
                                    <label
                                      htmlFor="userId"
                                      style={{ fontSize: "15px" }}
                                    >
                                      UserID
                                    </label>
                                    <input
                                      className="topUPClass"
                                      type="text"
                                      value={userId}
                                      onChange={(e) =>
                                        setUserId(e.target.value)
                                      }
                                      placeholder="Enter User ID"
                                      required
                                      min={"1"}
                                      minLength={"1"}
                                    />
                                    {topupButton && (
                                      <Button
                                        className="text-amber-200"
                                        onClick={handleClick}
                                        disabled={!userId}
                                      >
                                        Check Status
                                      </Button>
                                    )}
                                    <div className="content-para d-flex">
                                      {userStatus === null ? (
                                        <p>Click the button to check status.</p>
                                      ) : (
                                        <div className="topUPContent">
                                          {/* <p className="text-danger">
                                    User Already Activated!.
                                  </p> */}
                                          <h6 className="text-amber-200 text-center p-1">
                                            {userStatus}
                                          </h6>{" "}
                                          {showTopUpButton ? (
                                            <>
                                              <div>
                                                <p className="text-white">Select a Package to top up</p>
                                                <div className="select_package_box">

                                                <div className="select_package">
                                                  <button onClick={() =>
                                                      setSelectedAmount(500)
                                                    }
                                                  >
                                                    500{" "}
                                                  <b className="text-xl">{selectedAmount === 500 && "✓"}</b>  
                                                  </button>
                                                </div>
                                                <div className="select_package">
                                                  <button onClick={() =>
                                                      setSelectedAmount(1000)
                                                    }
                                                  >
                                                    1000{" "}
                                                 <b className="text-xl"> 
                                                  {selectedAmount === 1000 &&"✓"}
                                                  </b>
                                                  </button>
                                                </div>
                                                </div>
                                                <div>
                                                  <Button onClick={() =>
                                                      handleActivateUser(
                                                        selectedAmount
                                                      )
                                                    }
                                                  >
                                                    TopUp Now
                                                  </Button>
                                                </div>
                                              </div>
                                              
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      )}
                                      <div></div>
                                    </div>
                                    {/* <button className="form_button topUp_button">Search</button> */}
                                  </div>
                                </>
                              </div>
                            </div>
                            {/* TopUp content */}
                          </div>
                        </div>
                      </div>
                    </Modal>
                    {/* Fund Move */}
                    <Modal
                      className="ModalOverlay"
                      overlayClassName="Overlay"
                      isOpen={modalIsOpenFundMove}
                      onRequestClose={closeModalFundMove}
                      contentLabel="All Reward Details"
                    >
                      <div className="ModalContent">
                        <div
                          className="CloseButton"
                          onClick={handleCloseFundMove}
                        >
                          <FaTimes />
                        </div>
                        {/*Fund Move code  */}
                        <form
                          onSubmit={handleFundMoveSubmit}
                          className="fundMove"
                        >
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            {message && (
                              <p className="text-amber-300 m-3">{message}</p>
                            )}
                            <label style={{ fontSize: "17px" }}>
                              Total Income
                            </label>
                            {/* <input>value={data.accountNo}</input> */}
                            <input type="text" value={data.income} disabled />
                            <label style={{ fontSize: "17px" }}>
                              Total Balance
                            </label>
                            {/* <input>value={data.ifscCode}</input> */}
                            <input type="text" value={data.balance} disabled />
                            <label style={{ fontSize: "17px" }}>
                              TopUp Wallet
                            </label>
                            <input value={data.topupWallet} disabled />
                            <label style={{ fontSize: "17px" }}>
                              Enter Amount:
                            </label>
                            <input
                              type="text"
                              value={amount}
                              onChange={handleAmountChange}
                            />

                            <Button type="submit">Submit</Button>
                          </div>
                        </form>
                        {/*Fund Move code  */}
                      </div>
                    </Modal>
                    {/* Fund Move */}
                    {/*Withdrawal section end  */}

                    {/* Extra information */}

                    {/* New Support */}
                    <div className="col-sm-12 col-md-6 col-lg-5 contact-section-1">
                      <h3 className="text-amber-200 text-md underline">
                        Supports
                      </h3>

                      <div
                        className="contact-us mt-5"
                        style={{ marginLeft: "-15px" }}
                      >
                        <div className="row">
                          <div className="col-3">
                            <Link
                              to={`tel:${contactInfoList.mobile}`}
                              className="contact-icon col-2"
                            >
                              <IoCall className="contact-svg" />
                            </Link>
                          </div>

                          <div className="col-3">
                            <Link
                              to={`mailto:${contactInfoList.email}`}
                              className="contact-icon col-2"
                            >
                              <MdEmail className="contact-svg" />
                            </Link>
                          </div>

                          <div className="col-3">
                            <Link
                              to={`https://wa.me/${contactInfoList.mobile}/?text=Hi!%20I'm%20interested%20to%20know%20more.`}
                              className="contact-icon col-2"
                            >
                              <ImWhatsapp className="contact-svg" />
                            </Link>
                          </div>

                          <div className="col-3">
                            {/* <img src="https://cdn-icons-png.flaticon.com/128/1828/1828249.png" height='45px' width='45px' alt="" /> */}
                            <Link
                              to={contactInfoList.telegramLink}
                              className="contact-icon col-2"
                            >
                              <BsTelegram className="contact-svg" />
                            </Link>
                          </div>
                        </div>

                        <div>
                          <h6
                            className="text-center text-amber-200"
                            style={{ textDecoration: "underline" }}
                          >
                            Join WhatsApp Group
                          </h6>
                          <div className="m-1 p-3">
                            <Link
                              to={contactInfoList.whatsAppGroupLink} // Assuming groupLink is a property in contactInfo
                              className="contact-icon col-2"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <MdGroups2 className="contact-svg" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="awards-timeUpdate">
                    <div className="awards">
                      <button
                        onClick={handleMLMAwards}
                        className="button-83 retopUp_container retopUp_container-button"
                      >
                        Awards
                      </button>
                    </div>
                  </div>
                  {mlmAward ? (
                    <>
                      <Award />
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="time_update" style={{paddingBottom:"100px"}}>
                    <IoTimer className="menu_icon" />
                    <h6> {realTimeDate}</h6>
                  </div>
                  <BottomMenu />
                  {/*  */}
                </>
              ) : (
                <h1>Your session has expired. Please log in again.</h1>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
