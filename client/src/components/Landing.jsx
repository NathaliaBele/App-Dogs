import React from "react";
import { Link } from "react-router-dom";
import '../index.css'
import './Landing.css'

export default function Landing() {
  return (
    <div className='container'>
      
        <button className='button'>
          <Link to="/home">Home</Link>
        </button>
      
    </div>
  );
}
