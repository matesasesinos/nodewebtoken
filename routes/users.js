const express = require("express");
const { route } = require(".");
const router = express.Router();
const usersContoller = require("../controllers/usersController");
const authController = require("../controllers/authController");

const verifyToken = require("../config/verifyToken");

module.exports = () => {
  router.get("/", usersContoller.userGet);
  router.post("/new", usersContoller.userNew);

  router.post("/login", authController.login);
  router.get("/panel", verifyToken.verifyToken, authController.panel);
  return router;
};
