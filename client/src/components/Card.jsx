import React from "react";
import { Link } from "react-router-dom";
import "../components/card.css";

export default function Card({ name, continent, image, id}) {
  return (
    <div className="card">
      <Link to={"countries/" + id}>
        <div className="container">
          <div className="flag">
            <img src={image} alt="img not found" width="200px" height="150px" />
          </div>
        </div>
        <div className="container-tittle">
          <div className="title">
            <h3>{name}</h3>
            <h5>{continent}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
}
