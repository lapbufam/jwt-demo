const express = require("express");

const jwt = require("jsonwebtoken");

const app = express();

const authenticateToken = (req, res, next) => {
  // Recuperar o header de autorização
  const authHeader = req.headers["authorization"];
  // Recuperar o token a partir da requisição
  const token = authHeader && authHeader.split(' ')[1];

  // Se não há token enviado pelo header
  if(token == null) return res.status(401).send("There's no token in header object");

  jwt.verify(token, 'segredo123', (err, data) => {
    console.log(err);
    
    // Verifica se o token é válido
    if(err) return res.status(403).send("You're not authorized to access this path.");


  })

  next();
}

app.use(authenticateToken);

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
})

app.listen(3000);