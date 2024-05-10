import React from "react";
import { Col, Container, Row } from "react-bootstrap";
const Loader = () => {
  return (
    <div className=" bg-zinc-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:17px_34px]">
   <Container>
      <Row style={{ height: "30vh",marginTop: "-10vh" }}>
        <Col xs={12} sm={12} md={6} lg={6}>
          <div className="w-full max-w-md mx-auto animate-pulse p-9">
            <h1 className="h-2 bg-gray-300 rounded-lg w-52 dark:bg-gray-600" />
            <p className="w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700" />
            <p className="w-full h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
            <p className="w-64 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
            <p className="w-4/5 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
          </div>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          <div className="w-full bg-zinc-800 ">
            <div className="w-full h-44 bg-zinc-800 rounded-lg md:h-72" />
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Loader;
