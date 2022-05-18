import { getCountryDetail } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import "./CardDetails.css";

const CardDetails = () => {
  const countryDetail = useSelector((state) => state.countryDetail);
  const dispatch = useDispatch();

  let { id } = useParams();
  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, [id]);
  console.log(countryDetail);

  return (
    <div className="mains">
      <div className="detail-container">
        <div>
          <img
            className="flag-detail"
            // width="250px"
            // height="200px"
            src={countryDetail.length && countryDetail[0].img}
            alt="No img"
          />
        </div>
        <div className="details-container">
          <h1> {countryDetail.length && countryDetail[0].name}</h1>
          <h3>{countryDetail.length && countryDetail[0].id}</h3>
          <h5>
            Continent: {countryDetail.length && countryDetail[0].continent}
          </h5>
          <h5>
            Subregion: {countryDetail.length && countryDetail[0].subregion}
          </h5>
          <h5>Capital: {countryDetail.length && countryDetail[0].capital}</h5>
          <h5>Area: {countryDetail.length && countryDetail[0].area} Km2</h5>
          <h5>
            Population: {countryDetail.length && countryDetail[0].population}{" "}
            Hab.{" "}
          </h5>
        </div>
      </div>
      <Link to={"/home"}>
        <button className="button-back">Back To Home</button>
      </Link>

      <section>
        {countryDetail.length &&
          countryDetail[0].activities.map((e, i) => {
            return (
              <div className="activity-details">
                <h5>Actividad: {e.name}</h5>
                <h5>Dificultad:{e.difficulty} </h5>
                <h5>Temporada: {e.season} </h5>
                <h5>Duracion: {e.duration} </h5>
              </div>
            );
          })}
      </section>
    </div>
  );
};

export default CardDetails;
