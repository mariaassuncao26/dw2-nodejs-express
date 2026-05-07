// Importando o Express
// const express = require("express")
import express from "express";
// Importando o Controller de Cliente (onde estão as rotas)
// ClienteController
import ClienteController from "./controllers/ClienteController.js";
// ProdutoController
import ProdutoController from "./controllers/ProdutoController.js";
// PedidoController
import PedidoController from "./controllers/PedidoController.js";
// UsuarioController
import UsuarioController from "./controllers/UsuarioController.js"
// Importando o EXPRESS-SESSION (gerador de sessões do express)
import session from "express-session"

// Importando o arquivo de conexão com o banco
import connection from "./config/sequelize-config.js";

// Importando os Models
import Cliente from "./models/Cliente.js";
import Pedido from "./models/Pedido.js";
// Importando o Model de Usuário
import Usuario from "./models/Usuario.js";

// Importando as Associações
import associations from "./config/associations.js";

// Realizando a conexão com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!");
  })
  .catch((error) => {
    console.log(`Ocorreu um erro ao se conectar ao banco. ${error}`);
  });
// Criando o banco de dados (somente se ainda não existir)
connection
  .query("CREATE DATABASE IF NOT EXISTS loja_relacional;")
  .then(() => {
    console.log("O banco de dados está criado!");
  })
  .catch((error) => {
    console.log(`Ocorreu um erro ao criar o banco de dados. Erro: ${error}`);
  });

// Invocando a função que cria as associações
associations();

// Sincronizando os Models de Cliente e Pedido
// Transformando as funções em PROMESSAS
Promise.all([Cliente.sync({ force: false }), Pedido.sync({ force: false })])
  .then(() => {
    console.log("Entidades criadas e relacionadas com sucesso!");
  })
  .catch((error) => {
    console.log("Ocorreu um erro ao sincronizar os Models." + error);
  });

// Iniciando o Express\
const app = express();
// Define o EJS como Renderizador de páginas
app.set("view engine", "ejs");
// Define o uso da pasta "public" para uso de arquivos estáticos
app.use(express.static("public"));
// Configurando o Express para aceitar dados vindo de formulários
app.use(express.urlencoded({ extended: false }));

// Ativando o uso das ROTAS
app.use("/", ClienteController);
app.use("/", ProdutoController);
app.use("/", PedidoController);
app.use("/", UsuarioController);

// CONFIGURANDO SESSÃO DE USUÁRIO
app.use(session({
  secret: "minhalojasecret",
  cookie: {maxAge: 30000}, // Sessão expira em 30 segundor (mudar depois)
  saveUninitialized: false, // Não salva sessões vazias (sem informações)
  resave: false, // Evita que ele re-salve sessões
}));

// ROTA PRINCIPAL
app.get("/", function (req, res) {
  res.render("index");
});

// INICIA O SERVIDOR NA PORTA 8080
const port = 8080;
app.listen(port, function (erro) {
  if (erro) {
    console.log("Ocorreu um erro!");
  } else {
    console.log(`Servidor iniciado com sucesso em http://localhost:${port}`);
  }
});
