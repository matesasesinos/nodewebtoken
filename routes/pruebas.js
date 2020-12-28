const express = require("express");
const router = express.Router();

const pruebaController = require("../controllers/pruebaController");

module.exports = () => {
  router.get("/", pruebaController.pruebaPrueba);
  router.post("/new", pruebaController.pruebaNew);

  return router;
};
