import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="container">
      <div className="caja1"></div>

      <div className="caja2">
      <div className="welcome">Welcome to World of Doggys</div>
        <button className="button-landing">
          <Link to="/home">Get Started</Link>
        </button>
      </div>
    </div>
  );
}
