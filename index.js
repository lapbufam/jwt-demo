const express = require("express");

const jwt = require("jsonwebtoken");

const app = express();

const authenticateToken = (req, res, next) => {
  // Recuperar o token a partir da requisição
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  next();
}

app.use(authenticateToken);

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
})

app.listen(3000);