import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActivity } from "../actions";
import { Link } from "react-router-dom";
import { getCountries } from "../actions";
import "./Create.css";

const Form = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const countriesNames = allCountries.map((e) => e.name);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    country: [],
    difficulty: "",
    duration: "",
    season: "",
  });

  function validate(form) {
    let errors = {};
    if (
      !form.name ||
      !form.country ||
      !form.duration ||
      !form.difficulty ||
      !form.season
    ) {
      errors.error = "Requiere completar todos los campos";
    }
    if (form.name.length < 2) {
      errors.error = "Inserte un nombre valido";
    }
    if (!countriesNames.includes(form.country)) {
      errors.error = "Inserte un pais valido";
    }
    return errors;
  }

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      form.name !== "" &&
      form.duration !== "" &&
      form.country !== "" &&
      form.season !== "" &&
      form.difficulty !== ""
    ) {
      dispatch(postActivity(form));
      alert("Actividad creada!");
      setForm({
        name: "",
        country: [],
        difficulty: "",
        duration: "",
        season: "",
      });
    } else {
      alert("Por favor complete los campos requeridos");
    }
  }

  return (
    <div className="container-form">
      <Link to="/home">
        <button className="btnback-home">Go Home</button>
      </Link>
      <div className="form">
        <form>
          <h1>Publica tu actividad</h1>
          <div>
            <p>Nombre de la actividad:</p>
            <input
              placeholder="Nombre de tu actividad"
              type="text"
              value={form.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Pais: </p>
            <input
              placeholder="Nombre del pais respetando las mayusculas"
              type="text"
              value={form.country}
              name="country"
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Duracion: </p>
            <input
              placeholder="Ej: 10 minutes"
              type="text"
              value={form.duration}
              name="duration"
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Dificultad: </p>
            <select
              value={form.difficulty}
              name="difficulty"
              onChange={handleChange}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div>
            <p>Temporada</p>
            <select value={form.season} name="season" onChange={handleChange}>
              <option>Summer</option>
              <option>Winter</option>
              <option>Spring</option>
              <option>Autum</option>
            </select>
          </div>
          {errors.error && <p>{errors.error}</p>}
          <div className="button-end">
            <button
              className="button-submt"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form;
