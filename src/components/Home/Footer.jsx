import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "./Button";
const Footer = () => {
  const footerLinks = [
    {
      name: "Home",
      link: "#",
    },
    {
      name: "About us",
      link: "#",
    },
    {
      name: "Contact us",
      link: "#",
    },
  ];
  return (
    <div>
      <section>
        <Container className="mt-3">
          <Row >
            <Col xs={12} sm={12} md={7} lg={7} >
              <ul className="d-flex justify-content-center flex-row align-items-center " style={{gap:'10px'}}>
                {footerLinks.map((link, index) => (
                  <li key={index} style={{padding:'15px'}} className="text-amber-100 text-sm text-center p-2 m-3">
                    <a style={{padding:'15px'}} href={link.link}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </Col>

            <Col xs={12} sm={12} md={5} lg={5} className="d-flex  justify-end">
              <Button onClick={()=>(window.location.href='/v2/login')}>Login</Button>
            </Col>
          </Row>
          <p className="text-center text-amber-200">&copy; 2024 Powerfull India</p>
          <p className="text-center text-amber-200 p-2">Developed by CodeCanvas</p>
        </Container>
      </section>
    </div>
  );
};

export default Footer;
