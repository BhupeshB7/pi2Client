import React from 'react'
import { IoCall } from "react-icons/io5";
import { ImWhatsapp } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
const Blocked = () => {
  return (
    <div>
        <div
            className="m-3 d-flex align-items-center justify-content-center"
            style={{ height: "750px" }}
          >
            <div
              className=" blockeduser d-flex align-items-center justify-content-center p-2"
              style={{
                width: "100%",
                height: "350px",
                background: "white",
                borderRadius: "6px",
              }}
            >
              <div>
                <h5 className="text-danger" style={{ fontSize: "18px" }}>
                  Sorry, Your account is <b>Blocked</b>
                </h5>
                <h6 className="text-secondary">Please contact us </h6>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-5 contact-section-1">
                <h3 style={{ color: "#01b7ff", textDecoration: "underline" }}>
                  Supports
                </h3>
                <div
                  className="contact-us mt-5"
                  style={{ marginLeft: "-15px" }}
                >
                  <div className="row">
                    <div className="col-3">
                      <Link
                        to={"tel:+91 9565404470"}
                        className="contact-icon col-2"
                      >
                        <IoCall className="contact-svg" />
                      </Link>
                    </div>

                    <div className="col-3">
                      <Link
                        to={"mailto:powerfulindia850@gmail.com"}
                        className="contact-icon col-2"
                      >
                        <MdEmail className="contact-svg" />
                      </Link>
                    </div>

                    <div className="col-3">
                      <Link
                        to={
                          "https://wa.me/919565404470/?text=Hi!%20I'm%20interested%20to%20know%20more."
                        }
                        className="contact-icon col-2"
                      >
                        <ImWhatsapp className="contact-svg" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Blocked