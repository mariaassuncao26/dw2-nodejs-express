// Forma de importar CommonJS (antiga)
// const express = require("express")
// Importando o Express com ES6 Modules (nova)
import express from "express";
// Método do Express usado para criar as rotas da aplicação
const router = express.Router();

// Importando o Model de Cliente
import Cliente from "../models/Cliente.js";

// const clientes = [
//     {nome: "Ana Silva", cpf: "123.456.789-00", endereco: "Rua das Flores, 123, Bairro Jardim Primavera, Cidade Felicidade, Estado do Sonho, CEP: 12345-678"},
//     {nome: "Pedro Almeida", cpf: "987.654.321-00", endereco: "Avenida Central, 456, Bairro Centro, Cidade Nova, Estado da Esperança, CEP: 98765-432"},
//     {nome: "Marina Oliveira", cpf: "456.789.123-00", endereco: "Travessa dos Sonhos, 789, Bairro Vista Linda, Cidade Sol Nascente, Estado da Harmonia, CEP: 54321-987"},
//     {nome: "Rafael Santos", cpf: "321.654.987-00", endereco: "Praça da Amizade, 321, Bairro Bela Vista, Cidade Alegria, Estado da Serenidade, CEP: 87654-321"}
// ]

// ROTA CLIENTES
router.get("/clientes", function (req, res) {
  // Aqui iremos chamar o model "Cliente", invocar o método findAll() para buscar todos os registros da tabela de cliente
  Cliente.findAll()
    .then((clientes) => {
      res.render("clientes", {
        clientes: clientes,
      });
    })
    .catch((error) => {
      console.log("Ocorreu um erro ao buscar os clientes." + error);
    });
});

// ROTA DE CADASTRO DE CLIENTES (subrota /cadastrar)
router.post("/clientes/cadastrar", (req, res) => {
  // CRIANDO AS VARIÁVEIS QUE IRÃO ARMAZENAR OS DADOS VINDOS DO FORMULÁRIO
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const endereco = req.body.endereco;
  // Enviando os dados para o banco
  // O método create cadastra informações no BD
  Cliente.create({
    // coluna   // variável
    nome: nome,
    cpf: cpf,
    endereco: endereco,
    // Se a promessa for bem sucedida o usuário será redirecionado para a página de clientes
  })
    .then(() => {
      res.redirect("/clientes");
      // FALHA DA PROMESSA
    })
    .catch((error) => {
      console.log("Ocorreu um erro ao cadastrar o cliente." + error);
    });
});

// ROTA DE EXCLUSÃO DE CLIENTE
router.get("/clientes/excluir/:id", (req, res) => {
  // Capturando o parâmetro da rota
  const id = req.params.id;
  // Enviando o ID do cliente para apagar do banco de dados
  Cliente.destroy({
    where: {
      // Banco  // Parâmetro recebido
      id: id,
    },
    // SUCESSO
  })
    .then(() => {
      res.redirect("/clientes");
      // FALHA
    })
    .catch((error) => {
      console.log("Ocorreu um erro ao excluir o cliente" + error);
    });
});

// ROTA DE EDIÇÃO DE CLIENTE
router.get("/clientes/editar/:id", (req, res) => {
  const id = req.params.id;
  // Buscando o cliente no banco
  Cliente.findByPk(id).then((cliente) => {
    res.render("clienteEditar", {
      // Passando os dados do cliente para a página
      cliente: cliente,
    });
  });
});

// ROTA DE ALTERAÇÃO DE CLIENTE
router.post("/clientes/alterar", (req, res) => {
  // Coletando os dados do formulário
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const endereco = req.body.endereco;
  const id = req.body.id;
  // Alterando o Cliente no banco
  Cliente.update(
    {
    nome: nome,
    cpf: cpf,
    endereco: endereco,
    },
    {where: {id : id}}
  ).then(() => {
  res.redirect("/clientes")
  });
  });

// Exportando o módulo para usá-lo em outro arquivo
export default router;
