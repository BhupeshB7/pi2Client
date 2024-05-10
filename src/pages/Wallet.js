import React, { useState, useEffect } from "react";
import spinner from "../assets/spinner2.gif";
import { Container, Row, Col } from "react-bootstrap";
import { FaRupeeSign, FaUser } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import TransferForm from "./TransferForm";
import Menu from "../components/Dashboard/BottomMenu";
function Setting() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
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
  const totalIncome = data.selfIncome + data.teamIncome + data.rewards;

  return (
    <>
      {data.isBlocked ? (
        <>
          <h3 className="text-center text-danger m-3">
            Sorry, your Account is now, Blocked.Please Contact us to Admin
          </h3>
        </>
      ) : (
        <>
          <div>
            {token ? (
              <div className=" bg-zinc-900 bg-[linear-gradient(to_right,#8080800a_2px,transparent_2px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:21px_30px]">
                <div>
                  <h5
                    className="text-warning text-center pt-5  m-2fw-bold"
                    style={{ fontFamily: "cursive" }}
                  >
                    Hello, {data.name}
                  </h5>
                  <h6 className="text-light" style={{ paddingLeft: "15px" }}>
                    <b style={{ fontFamily: "poppins", fontSize: "36px" }}>"</b>{" "}
                    Welcome to the Wallet...
                  </h6>
                  {/* Balance section End */}
                  {/* section 1 */}
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
                        <div className="income_card1">
                          <div className="income_subCard">
                            <div className="symbol">
                              <FaRupeeSign />
                            </div>
                            <div className="wallet_symbol-head">
                              <p className="wallet-text text-amber-100">
                                Total Balance
                              </p>
                              <p className="text-center text-xl text-amber-100">
                                {data.balance}
                              </p>
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
                        className="d-flex justify-content-center align-items-center p-2"
                      >
                        <div className="income_card1">
                          <div className="income_subCard">
                            <div className="symbol">
                              <FaRupeeSign />
                            </div>
                            <div className="wallet_symbol-head">
                              <p className="wallet-text text-amber-100">
                                TopUp Balance
                              </p>
                              <p className="text-center text-xl text-amber-100">
                                {data.topupWallet}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                  {/* section 2 */}
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
                        <div className="income_card1">
                          <div className="income_subCard">
                            <div className="symbol">
                              <FaRupeeSign />
                            </div>
                            <div className="wallet_symbol-head">
                              <p className="wallet-text text-amber-100">
                                Total Wallet
                              </p>
                              <p className="text-center text-xl text-amber-100">
                                {data.income}
                              </p>
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
                        className="d-flex justify-content-center align-items-center p-2"
                      >
                        <div className="income_card1">
                          <div className="income_subCard">
                            <div className="symbol">
                              <FaRupeeSign />
                            </div>
                            <div className="wallet_symbol-head">
                              <p className="wallet-text text-amber-100">
                                Total  Withdrawal
                              </p>
                              <p className="text-center text-xl text-amber-100">
                                {data.withdrawal}
                              </p>
                            </div>
                          </div>
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
                        className="d-flex justify-content-center align-items-center p-2"
                      >
                        <div className="income_card">
                          <div className="col-12 col-sm-9 col-md-5 col lg-4 ">
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
                      ></Col>
                    </Row>
                  </Container>

                  {/* Balance section End */}
            
                  <Container>
                    <TransferForm sourceUserId={data.userId} />
                  </Container>
                  <Menu />
                </div>
              </div>
            ) : (
              <>
                <h6 className="text-center text-secondary">
                  Re login to continue...
                </h6>
                <Link to="/login" style={{ textDecoration: "underline" }}>
                  <p className="text-center text-primary">Login</p>
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Setting;
