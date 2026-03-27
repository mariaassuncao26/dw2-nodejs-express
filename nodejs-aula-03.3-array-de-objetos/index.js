// O arquivo index.js é o arquivo principal do projeto

// Importando o MÓDULO do Express
const express = require("express");

// Criando uma instância do Express
const app = express();

// Configurando o EJS
app.set("view engine", "ejs");

// CRIANDO A ROTA PRINCIPAL DO SITE ("/")
app.get("/", function (req, res) {
  //   res.send("<h1>Bem-vindo ao meu primeiro site em Node.js e Express.js!</h1>");
  res.render("index");
});

// ROTA DE PRODUTOS
app.get("/produtos", (req, res) => {
  const listaProdutos = ['Computador', 'Celular', 'Tablet', 'Notebook'];
  res.render("produtos", {
    // Enviando variáveis para a página HTML 
    listaProdutos : listaProdutos
  })
});

// ROTA DE PRODUTOS - COM PARÂMETRO
app.get("/produtos/:produto", (req, res) => {
  const produto = req.params.produto;
  res.render("detalhesProduto", {
    produto: produto,
  });
});

// ROTA DE CLIENTES
app.get("/clientes", (req, res) => {
  res.render("clientes");
});

// ROTA DE SERVIÇOS
app.get("/servicos", (req, res) => {

  // ARRAY DE OBJETOS
const servicos = [
  {servico: "Desenvolvimento de Websites", descricao: "Criação de sites com Node.js e integração a banco de dados", preco: 3500},
  {servico: "Auditoria de UX/UI", descricao: "Avaliação da usabilidade de sistemas com sugestões de melhoria", preco: 1800},
  {servico: "Infraestrutura em Nuvem", descricao: "Configuração de servidores e hospedagem de aplicações", preco: 2900},
  {servico: "Chatbot com IA", descricao: "Desenvolvimento de chatbot para atendimento automático", preco: 2750},
]
  res.render("servicos",{
    // Enviando o Array de Objetos para a página
    servicos: servicos
  });
});


// CRIANDO A ROTA DE PERFIL DO USUÁRIO
app.get("/perfil", function (req, res) {
  //   res.send("<h2>Bem-vindo ao seu perfil!</h2>");
  res.render("perfil");
});

// Iniciando o servidor na porta 8080
const port = 8080;
app.listen(port, (error) => {
  if (error) {
    console.log("Ocorreu um erro ao iniciar o servidor!" + error);
  } else {
    console.log(
      `Servidor iniciado com sucesso no endereço: http://localhost:${port}`,
    );
  }
});
