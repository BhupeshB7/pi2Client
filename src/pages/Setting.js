import React, { useState, useEffect } from "react";
import spinner from "../assets/spinner2.gif";
import { BsWhatsapp } from "react-icons/bs";
import QRCodeGenerator from "./QRCodeGenerator";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Menu from "../components/Dashboard/BottomMenu";
import { FaExchangeAlt, FaPowerOff, FaUser } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
function Setting() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [copied, setCopied] = useState(false);
  //for navigate user
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://mlm-eo5g.onrender.com/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log(result); // check the response data
      setData(result);
      setIsLoading(false);
    };
    fetchData();
  }, [token]);

  const referralLink = `https://powerfullindia.com/v2/register?ref=${data.userId}`;
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
    const message = ` https://powerfullindia.com/v2/register?ref=${data.userId}`;
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
          height="100px"
          width="100px"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </h6>
    );
  }

  // For User LogOut
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };
  // For User LogOut
  const handleLogin = () => {
    window.location.href = "/login";
  };
  return (
    <div>
      {token ? (
        <div className=" bg-zinc-900 bg-[linear-gradient(to_right,#8080800a_2px,transparent_2px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:21px_30px]">
          <div>
            <h5
              className="text-warning text-center pt-5 fw-bold"
              style={{ fontFamily: "sans-serif" }}
            >
              Hello, {data.name}
            </h5>
            <div className="mt-3">
              <h6 className="text-amber-200" style={{ marginLeft: "20%" }}> PROFILE </h6>
            </div>
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
                  <div className="content_card" onClick={()=>{window.location.href="/profile"}}>
                    <div className="symbol">
                      <FaUser />
                    </div>

                    <p className="content_text today_income">PROFILE</p>
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
                  <div className="content_card" onClick={()=>{window.location.href="/profile-update"}}>
                    <div className="symbol">
                      <RxUpdate />
                    </div>
                    <p className="content_text">PROFILE-UPDATE</p>
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
                  className="d-flex justify-content-center align-items-center mt-1 pl-5 pr-5"
                >
                  <div className="content_card" onClick={()=>{window.location.href="/change-password"}}>
                    <div className="symbol">
                      <FaExchangeAlt />
                    </div>

                    <p className="content_text today_income">CHANGE PASSWORD</p>
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
                  {isLoggedIn?(
                    <>
                  <div className="content_card">
                    <div className="symbol">
                      <FaPowerOff onClick={handleLogout} />
                    </div>
                    <p className="content_text">LOGOUT</p>
                  </div>
                    </>
                  ):(
                    <>
                    </>
                  )}
                </Col>
              </Row>
            </Container>

            
            {/* Referral Section */}
            <Container className="mt-4" style={{ marginBottom: "100px" }}>
              <Row>
                <Col>
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
                                <div className="text-light">Copied!</div>
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
                </Col>
              </Row>
            </Container>
            {/* Referal section End */}
            <Menu />
          </div>
        </div>
      ) : (
        <h3>Re login to continue...</h3>
      )}
    </div>
  );
}

export default Setting;
