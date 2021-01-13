import React from "react";
import hand from "../images/hand.png";
import "../css/style.css";
import { Link } from "react-router-dom";

function CreatingPlanComponent() {
  return (
    <>
      {/* creating-plan */}
      <div className="container plan">
        <div className="plan-text">
          <p>Let's create a roadmap plan!!</p>
        </div>
        <div className="row plan-side">
          <div className="col-md-6 col-6 left-side text-center">
            <Link to="/create/daily" style={{ textDecoration: "none" }}>
              <div className="create-side">
                <p>Create &#x2795;</p>
              </div>
            </Link>
          </div>
          <div className="img-fluid col-md-6 col-6 text-center">
            <img src={hand} className="hand-image-side" />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatingPlanComponent;
