const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const app = express();

dotenv.config();

/**
 * Função que assina o hash de um usuario com o segredo guardado no .env
 * @param {*} username Objeto com os dados do usuário a ser assinado
 * @returns Sem retorno
 */
const generateAccessToken = (username) => {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "60s" });
}

/**
 * Função que autentica o usuário da requisição
 * @param {*} req Objeto que guarda as informações da requisição
 * @param {*} res Objeto que será o retorno da requisição
 * @param {*} next Função que executa a próxima função da pilha de middlewares do express.
 * @returns Sem retorno
 */
const authenticateToken = (req, res, next) => {
  // Recuperar o header de autorização
  const authHeader = req.headers["authorization"];
  // Recuperar o token a partir da requisição
  const token = authHeader && authHeader.split(' ')[1];

  // Se não há token enviado pelo header
  if (token == null) return res.status(401).send("There's no token in header object");

  jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
    console.log(err);

    // Verifica se o token é válido
    if (err) return res.status(403).send("You're not authorized to access this path.");

    // Associa o usuário recuperado do banco ao usuario da requisição
    req.user = user

    next();

  })

}

/**
 * Rota padrão da API
 */
app.post("/", authenticateToken, (req, res) => {
  res.status(200).send("Hello world");
})

app.listen(3000);