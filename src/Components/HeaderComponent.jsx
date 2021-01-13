import React from "react";
import logo from "../images/logo.png";
import Image from "react-bootstrap/Image";
import "../css/style.css";

function HeaderComponent() {
  return (
    <>
      {/* main-bar */}
      <div className="container-fluid main-bar">
        <div className="row">
          <div className="col-md-4 col-4 text-right">
            <Image src={logo} style={{ height: "auto", width: "25%" }} />
          </div>
          <div className="col-md-4 col-4 text-center">
            <h1 className="main-text">Life RoadMap</h1>
          </div>
          <div className="col-md-4 col-4">
            <Image src={logo} style={{ height: "auto", width: "25%" }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderComponent;
