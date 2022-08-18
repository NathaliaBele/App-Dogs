import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
export default function Nav() {
  return (
    <div className="optionNavBar">
      <ul>
        <Link className="link" to="/Home"> Dogs</Link>
      </ul>
      <ul>
        <Link className="link" to="/CreateRace"> Add Dog</Link>
      </ul>
    </div>
  );
}
