import React from "react";
import logo from "../images/logo.png";
import "../css/style.css";

function HeaderComponent() {
  return (
    <>
      {/* main-bar */}
      <div className="container-fluid main-bar">
        <div className="row">
          <div className="col-md-4 col-4 text-right">
            <img src={logo} width={70} height={70} />
          </div>
          <div className="col-md-4 col-4 text-center">
            <p className="main-text">Life RoadMap</p>
          </div>
          <div className="col-md-4 col-4">
            <img src={logo} width={70} height={70} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderComponent;
