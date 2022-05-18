const { Country, Activities } = require("../db.js");
const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getCountries = async () => {
  const countries = await axios.get(`https://restcountries.com/v3/all`);
  const countriesInfo = await countries.data.map((el) => {
    return {
      name: el.name.common,
      population: el.population,
      capital: el.capital,
      id: el.cca3,
      continent: el.continents,
      subregion: el.subregion,
      img: el.flags[0],
      area: el.area,
    };
  });
  return countriesInfo;
};

const getDB = async () => {
  return await Country.findAll({
    attributes: [
      "img",
      "name",
      "continent",
      "population",
      "id",
      "subregion",
      "area",
    ],
    include: {
      model: Activities,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

router.get("/countries", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const dbCountry = await Country.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
      });
      return res.json(dbCountry);
    }

    let dbCountries = await getDB();

    const countriesApi = await getCountries();

    countriesApi.forEach((el) => {
      Country.findOrCreate({
        where: {
          name: el.name,
          population: el.population,
          capital: el.capital ? el.capital[0] : "Este pais no tiene capital",
          id: el.id,
          continent: el.continent[0],
          subregion: el.subregion ? el.subregion : "Subregion no encontrada",
          img: el.img,
          area: el.area,
        },
      });
    });
    dbCountries = await getDB();
    res.json(dbCountries);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/countries/:id", async (req, res) => {
  const { id } = req.params;
  const idCountry = await Country.findAll({
    where: { id: id.toUpperCase() },
    include: {
      model: Activities,
      attributes: ["name", "difficulty", "duration", "season", "id"],
      through: {
        attributes: [],
      },
    },
  });
  idCountry.length
    ? res.status(200).send(idCountry)
    : res.status(404).send("Pais no encontrado");
});

router.get("/activities", async (req, res) => {
  const activities = await Activities.findAll();
  res.send(activities);
});

router.post("/activity", async (req, res) => {
  const { name, difficulty, duration, season, country } = req.body;

  let activityCreate = await Activities.create({
    name,
    difficulty,
    duration,
    season,
    country,
  });

  let dbCountry = await Country.findAll({
    where: { name: country },
  });
  activityCreate.addCountry(dbCountry);

  res.status(200).send("Actividad creada");
});

module.exports = router;
