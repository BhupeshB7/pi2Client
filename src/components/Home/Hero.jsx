import React, { Suspense } from "react";
import Background from "./Background";
import Button from "./Button";
import HomeNavbar from "./HomeNavbar";
import "./Home.css";
import { motion } from "framer-motion";
import { Col, Container, Row } from "react-bootstrap";
import Loader from "./Loader";
const About = React.lazy(() => import("./About"));

const Hero = ({contactInfoList}) => {
  return (
    <>
      <div>
        <Background />
        <HomeNavbar />
        <section className=" d-flex flex-column justify-content-center align-items-center">
          <div className="custom-div">
            <motion.h1
              className="mt-5 header-text text-center text-amber-100 text-3xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeIn", duration: 1,delay:0.5 }}
            >
              Welcome to
            </motion.h1>
            <motion.h5 className="header-text text-center text-amber-200 text-2xl"
              initial={{ opacity: 0.2, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ease: "easeOut", duration:0.6,delay:0.3 }}>
              Powerfull India-2
            </motion.h5>
          </div>
          <div className="mt-3">
            <Button onClick={() => window.location.href = "/login"}>Login</Button>
          </div>
          <Button onClick={() => window.location.href = "/register"}>Let's started</Button>
          <Container>
            <Row className="d-flex justify-content-center align-items-center">
              <Col
                xs={12}
                sm={10}
                md={6}
                lg={6}
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <motion.p
                  className="text-center text-amber-200 text-md p-3"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ease: "easeInOut", duration: 0.5 }}
                >
                  “Network marketing gives you the opportunity to face your
                  fears, deal with them, overcome them, and bring out the winner
                  that you have living inside you.” – The Business of the 21st
                  Century
                </motion.p>
              </Col>
              <Col
                xs={12}
                sm={10}
                md={6}
                lg={6}
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <motion.img
                  className="image"
                  src="https://img.freepik.com/free-vector/businesswoman-office-with-e-mail-marketing-icons_24877-51312.jpg?t=st=1714415981~exp=1714419581~hmac=5b5484daebc88ab0f5149351cc071df151dcdb6fd4e95579cb82514c3e024f1a&w=740"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ease: "easeInOut", duration: 0.5, delay: 1 }}
                />
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <Suspense fallback={<div><Loader/></div>}>
      <About contactInfoList={contactInfoList} />
      </Suspense>
    </>
  );
};

export default Hero;
