import React from "react";
import Background from "./Background";
import { Container, Row } from "react-bootstrap";
import {motion} from "framer-motion"
import ContactForm from "../../pages/ContactUs";
import { ImLocation, ImWhatsapp } from "react-icons/im";
import { IoCall, IoRefresh } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import Accordion from "./Accordion";
import Footer from "./Footer";
const About = ({contactInfoList}) => {
  return (
    <div className=" bg-zinc-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:17px_34px]">
      <Container>
        <Row className="d-flex justify-content-center align-items-center"> 
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            <motion.p className="text-center text-amber-100 p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeIn", duration: 0.5 }}>
              {" "}
              We are a team of passionate and dedicated professionals who are
              committed to helping individuals and communities achieve their
              dreams through our unique MLM program. Our mission is to empower
              people to succeed in the ever-evolving world of entrepreneurship.
               </motion.p>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 about-col-section-2 about-col-section">
            <img
              src="https://img.freepik.com/free-vector/connected-world-concept-illustration_114360-3027.jpg?size=626&ext=jpg&ga=GA1.2.393936886.1688825666&semt=sph"
              width="80%"
              height="60%"
              style={{ borderRadius: "8px", mixBlendMode: "multiply" }}
            />
          </div>
        </Row>
      </Container>
      {/* Contact-us-section */}
      <div className="head-container">
        <h3>Contact Us</h3>
      </div>
      <div className="container" style={{ marginBottom: "40px" }}>
        <div className="row contact-row" style={{ marginTop: "20px" }}>
          <div className="col-sm-10 col-11 col-md-6 col-lg-5 contact-section-1">
            <h3 className="text-amber-100">Get In Touch...</h3>
            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae deleniti illum labore, voluptatum iusto dolor? Totam vitae ratione consectetur necessitatibus?</p> */}
            <div className="contact-us">
              <div className="row">
                <div className="contact-icon col-2 text-amber-100">
                  <ImLocation className="contact-svg" />
                </div>
                <div className="contact-details col-10">
                  <a href="/" className="p-text">
                    Rajasthan
                  </a>
                  {/* <a href="tel:+91 8581869783" className="p-text">+91 8581869783</a> */}
                </div>
              </div>
              <div className="row">
                <div className="contact-icon col-2">
                  <IoCall className="contact-svg" />
                </div>
                <div className="contact-details col-10">
                  <a href={`tel:${contactInfoList.mobile}`} className="p-text">
                    {contactInfoList.mobile}
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="contact-icon col-2">
                  <MdEmail className="contact-svg" />
                </div>
                <div className="contact-details col-10">
                  <a
                    href={`mailto:${contactInfoList.email}`}
                    className="p-text"
                  >
                    {contactInfoList.email}
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="contact-icon col-2">
                  <ImWhatsapp className="contact-svg" />
                </div>
                <div className="contact-details col-10">
                  <a
                    href={`https://wa.me/${contactInfoList.whatsAppNumber}/?text=Hi!%20I'm%20interested%20to%20know%20more.`}
                    className="p-text"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-sm-12 col-12 col-md-6 col-lg-7 "
            style={{ marginLeft: "-30px" }}
          >
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Contact-us-section-End */}
      <Accordion />
      <Footer />
    </div>
  );
};

export default About;
