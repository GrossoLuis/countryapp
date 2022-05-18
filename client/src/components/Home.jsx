import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getActivities,
  filterCountriesByContinent,
  filterActivity,
  orderName,
} from "../actions";
import { orderByPopu } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import "./Home.css";
import Navbar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);
  console.log(allActivities);
  const [ordenado, setOrdenado] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9);
  const indexOfLastCountrie = currentPage * countriesPerPage; //9
  const indexOfFirstCountrie = indexOfLastCountrie - countriesPerPage; //0
  const currentCountries = allCountries.slice(
    indexOfFirstCountrie,
    indexOfLastCountrie
  );

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
    if (pageNumber >= 2) {
      setCountriesPerPage(10);
    } else {
      setCountriesPerPage(9);
    }
  }

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  function handleCountries(e) {
    e.preventDefault();
    dispatch(getCountries());
    setCurrentPage(1);
    setOrdenado("");
  }

  function handleOrderName(e) {
    e.preventDefault();
    dispatch(orderName(e.target.value));
    setCurrentPage(1);

    setOrdenado(`Ordered by  ${e.target.value}`);
  }
  function handleOrderByPopu(e) {
    e.preventDefault();
    dispatch(orderByPopu(e.target.value));
    setCurrentPage(1);

    setOrdenado(`Ordered by  ${e.target.value}`);
  }
  function handleOrderByAct(e) {
    e.preventDefault();
    dispatch(filterActivity(e.target.value));
    setCurrentPage(1);

    setOrdenado(`Ordered by  ${e.target.value}`);
  }
  function handleByContinent(e) {
    e.preventDefault();
    dispatch(filterCountriesByContinent(e.target.value));
    setCurrentPage(1);

    setOrdenado(`Ordered by  ${e.target.value}`);
  }

  return (
    <>
      <div>
        <Navbar />
        <div className="filtros">
          <div>
            <label>Poblacion: </label>
            <select onChange={(e) => handleOrderByPopu(e)}>
              <option value="default" selected disabled>
                Ordenamiento por Poblacion
              </option>
              <option value="Ascendant population">Ascendente</option>
              <option value="Descendant population">Descendente</option>
            </select>
          </div>
          <div>
            <label>Alfabeticamente: </label>

            <select onChange={(e) => handleOrderName(e)}>
              <option value="default" selected disabled>
                A-Z
              </option>
              <option value="Ascendant">Ascendente</option>
              <option value="Descendant">Descendente</option>
            </select>
          </div>
          <div>
            <label>Continentes: </label>

            <select onChange={(e) => handleByContinent(e)}>
              <option value="default" selected disabled>
                Continentes
              </option>
              <option value="All">All</option>
              <option value="North America">Norteamerica</option>
              <option value="South America">Sudamerica</option>
              <option value="Antarctica">Antartica</option>
              <option value="Africa">Africa</option>
              <option value="Europe">Europa</option>
              <option value="Asia">Asia</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
          <div>
            <label>Actividades: </label>
            <select value="default" onChange={(e) => handleOrderByAct(e)}>
              <option>Select</option>
              {allActivities &&
                allActivities.map((e) => {
                  return <option>{e.name}</option>;
                })}
            </select>
          </div>
        </div>
        <button className="refresh" onClick={(e) => handleCountries(e)}>
          Refresh
        </button>

        <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginate={paginate}
        />

        <div>
          {ordenado ? (
            <h1 className="h1">{ordenado}</h1>
          ) : (
            <h1 className="h1">Countries</h1>
          )}

          <div className="wrapper">
            {currentCountries.map((c) => {
              return (
                <div key={c.id} className="cards">
                  <Card
                    name={c.name}
                    image={c.img}
                    key={c.id}
                    continent={c.continent}
                    id={c.id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
