import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import Video from "./assets/planeta4.mp4";

export default function LandingPage() {
  return (
    <div className="main">
      <video className="video" src={Video} autoPlay loop muted></video>
      <div>
        <h1 className="titulo">Country App</h1>
        <Link to="/home">
          <button className="button">Explore</button>
        </Link>
      </div>
    </div>
  );
}
