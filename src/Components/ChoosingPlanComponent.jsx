import React from "react";
import hand from "../images/hand.png";
import "../css/style.css";
import { BrowserRouter, Route, Link } from "react-router-dom";

function ChoosingPlanComponent() {
  return (
    <>
      {/* choosing-plan */}
      <div className="container plan">
        <div className="plan-text">
          <p>Let's create a roadmap plan!!</p>
        </div>
        <div className="row plan-side">
          <div className="col-md-6 col-6 left-side text-center">
            <Link to="/create/daily" style={{ textDecoration: "none" }}>
              <div className="daily">
                <p>Create Plan</p>
              </div>
            </Link>
          </div>
          <div className="img-fluid col-md-6 col-6 text-center">
            <img src={hand} className="hand-image" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChoosingPlanComponent;
