import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "../Home/Home.css";
import Button from "../Home/Button";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
const DashboardNavbar = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);
  const [isHover, setIsHover] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [sponsors, setSponsors] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
  });
  const openModal = () => {
    setModalIsOpen(true);
    isOpen(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleClose = () => {
    setModalIsOpen(false);
  };

  const toggleSubMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleHoverStart = () => {
    setIsHover(true);
  };

  const handleHoverEnd = () => {
    setIsHover(false);
  };
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Bind the event listener
      window.addEventListener("click", handleClickOutside);
    }

    // Unbind the event listener on component unmount
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };
  let activationTime = "Unknown";
  let reactivationTime = "Unknown";
  let daysLeftForReactivation = "Unknown";

  if (data.activationTime) {
    // Calculate the activation time
    activationTime = new Date(data.activationTime).toLocaleString("en-IN", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Calculate the reactivation time (3 months from activation time)
    const threeMonthsFromActivation = new Date(data.activationTime);
    threeMonthsFromActivation.setMonth(
      threeMonthsFromActivation.getMonth() + 3
    );
    const seventyFiveDaysFromActivation = new Date(data.activationTime);
    seventyFiveDaysFromActivation.setDate(
      seventyFiveDaysFromActivation.getDate() + 75
    );

    reactivationTime = seventyFiveDaysFromActivation.toLocaleString("en-IN", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Calculate the number of days left for reactivation
    const currentDate = new Date();
    const daysRemaining = Math.ceil(
      (seventyFiveDaysFromActivation - currentDate) / (1000 * 60 * 60 * 24)
    );
    if (daysRemaining > 0) {
      daysLeftForReactivation = `Reactivate in ${daysRemaining} days`;
    } else {
      daysLeftForReactivation = `Account has been reactivated`;
    }
  }
  // useEffect(() => {
  //   const fetchsponsors = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://mlm-eo5g.onrender.com/api/direct/${data.userId}`
  //       );
  //       setSponsors(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchsponsors();
  // }, [data.userId]);
  //Direct member code with pagination
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get(
          `https://mlm-eo5g.onrender.com/api/direct/${data.userId}`
        );
        setSponsors(response.data.data);
        setPagination({
          currentPage: response.data.currentPage,
          lastPage: response.data.lastPage,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchSponsors();
  }, [data.userId]);

  const handlePreviousPage = async () => {
    if (pagination.currentPage > 1) {
      const nextPage = pagination.currentPage - 1;
      const response = await axios.get(
        `https://mlm-eo5g.onrender.com/api/direct/${data.userId}?page=${nextPage}`
      );
      setSponsors(response.data.data);
      setPagination({
        currentPage: response.data.currentPage,
        lastPage: response.data.lastPage,
      });
    }
  };

  const handleNextPage = async () => {
    if (pagination.currentPage < pagination.lastPage) {
      const nextPage = pagination.currentPage + 1;
      const response = await axios.get(
        `https://mlm-eo5g.onrender.com/api/direct/${data.userId}?page=${nextPage}`
      );
      setSponsors(response.data.data);
      setPagination({
        currentPage: response.data.currentPage,
        lastPage: response.data.lastPage,
      });
    }
  };
  //Direct member code with pagination End
  // For User LogOut
  const handleLogout = () => {
    setIsOpen(false);
    const confirmLogout = window.confirm("Are you sure you want to logOut?");
    if (confirmLogout) {
      alert("LogOut SuccessFully!!!");
      localStorage.removeItem("hasAnimationShownBefore");
      localStorage.removeItem("token");
      window.location.href = "/v2/login";
    }
  };

  return (
    <>
      <div style={{ position: "relative" }} ref={navbarRef}>
        <button
          onClick={toggleNavbar}
          style={{
            position: "fixed",
            top: "10px",
            left: "240px",
            zIndex: 1007,
            fontSize: 30,
            color: isOpen ? "Orange" : "white",
            background: "none",
            border: "none",
          }}
        >
          {isOpen ? "✕" : ""}
        </button>
        <button
          onClick={toggleNavbar}
          style={{
            position: "fixed",
            top: "10px",
            left: "20px",
            zIndex: 1000,
            fontSize: 35,
            color: isOpen ? "Orange" : "white",
            background: "none",
            border: "none",
          }}
        >
          {isOpen ? "" : "☰"}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{
                x: "-100%",
                y: "-100%",
                backgroundColor: "black",
                width: "285px",
                height: "100vh",
                zIndex: 1000,
                borderBottomRightRadius: "7px",
              }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: "-100%", y: "-100%" }}
              transition={{ type: "tween", duration: 0.9 }}
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <p className="text-center text-amber-100 text-md m-3 mt-5 userDashboardText">
                Hello, {data.name}{" "}
              </p>

              <>
                {data.role === "admin" || data.role === "Admin" ? (
                  <>
                    <div>
                      <Link to={"/admin/dashboard"}>
                        <h6
                          className="text-center text-light"
                          style={{
                            textDecoration: "underline",
                          }}
                        >
                          Admin Dashboard
                        </h6>
                      </Link>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
              <div>
                <p className="text-center text-amber-100 text-md m-3 userDashboardText">
                  Account activated on : <br /> {activationTime}
                </p>
              </div>
              <div>
                <p className="text-center text-amber-100 text-md m-3 userDashboardText">
                  Reactivation Due on : <br /> {reactivationTime}
                </p>
              </div>
              <div>
                <p className="text-center text-amber-100 text-md m-3 userDashboardText">
                  {daysLeftForReactivation}
                </p>
              </div>
              <ul className="navbar-ul" style={{ marginTop: "-1px" }}>
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="nav-item"
                >
                  <a href="/profile">Profile</a>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="nav-item"
                >
                  <a href="/profile-update">Profile update</a>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="nav-item"
                >
                  <a href="/topUp-history">Wallet transfer</a>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="nav-item"
                  onClick={openModal}
                >
                  <p>Direct Member</p>
                </motion.li>
                <div className="flex-item">
                  <motion.div
                    className="menu-item"
                    onClick={toggleSubMenu}
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                  >
                    <motion.li
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="nav-item"
                    >
                      <p style={{ textTransform: "uppercase" }}>All History</p>
                    </motion.li>
                    <motion.div
                      className="sub-menu"
                      initial="exit"
                      animate={isHover || isDropdownOpen ? "enter" : "exit"}
                      variants={subMenuAnimate}
                    >
                      <div className="sub-menu-background" />
                      <div className="sub-menu-container">
                        <a href="/withdrawal" className="sub-menu-item">
                          Withdrawal History{" "}
                        </a>
                        <a href="/topUp" className="sub-menu-item">
                          Top-Up History{" "}
                        </a>
                        <a href="/deposithistory" className="sub-menu-item">
                          Deposit History{" "}
                        </a>{" "}
                        <br />
                        <a href="/fundHistory" className="sub-menu-item">
                          Fund History
                        </a>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
                ;
              </ul>
              <div
                className="d-flex justify-content-start gap-5 "
                style={{ marginLeft: "20px", marginTop: "-30px" }}
              >
                <Button onClick={handleLogout}>LogOut</Button>
              </div>
              <p className="text-amber-100 italic ml-3">Version 2.0</p>
            </motion.nav>
          )}
        </AnimatePresence>
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
            {/* Modal Content */}
            <div className="table-responsive pt-3 pb-3 mb-3">
              <table
                className="table table-striped table-warning table-bordered"
                style={{ width: "18rem" }}
              >
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>UserId</th>
                    <th>Mobile No</th>
                    <th>Status</th>
                    <th>Package</th>
                  </tr>
                </thead>
                <tbody>
                  {sponsors.map((sponsor, index) => (
                    <tr key={sponsor._id}>
                      <td>{index + 1}</td>
                      <td>{sponsor.name}</td>
                      <td>{sponsor.email}</td>
                      <td>{sponsor.userId}</td>
                      <td>{sponsor.mobile}</td>
                      <td>{sponsor.is_active ? "Active" : "Inactive"}</td>
                      <td>{sponsor.package}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination d-flex justify-content-center align-items-center">
              <button className="btn btn-dark m-1" disabled={pagination.currentPage === 1} onClick={handlePreviousPage}>Previous</button>
              <h6 className="m-1 text-light bold italic">
                {pagination.currentPage}/{pagination.lastPage}
              </h6>
              <button className="btn btn-dark m-1" disabled={pagination.currentPage === pagination.lastPage} onClick={handleNextPage}>Next</button>
            </div>
            {/* Modal Content end*/}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default DashboardNavbar;
