import { useDispatch, useSelector } from "react-redux";
import { searchCountryName } from "../actions";
import { getCountries } from "../actions";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./SearchBar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const [country, setcountry] = useState("");
  const allCountries = useSelector((state) => state.allCountries);
  const countriesNames = allCountries.map((e) => e.name);

  function handleChange(e) {
    e.preventDefault();
    setcountry(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (countriesNames.includes(country)) {
      dispatch(searchCountryName(country));
      setcountry("");
    } else {
      alert("Este pais no existe");
    }
  }

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div>
      <div className="nav">
        <input
          className="input"
          type="text"
          placeholder="  Buscar Paises"
          onChange={(e) => handleChange(e)}
        />
        <button
          className="searchbtn"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Search
        </button>
        <Link to="activity">
          <button className="creatbtn">Crear Actividad</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
