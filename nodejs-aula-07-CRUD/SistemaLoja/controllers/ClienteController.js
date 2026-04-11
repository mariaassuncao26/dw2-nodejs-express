// Forma de importar CommonJS (antiga)
// const express = require("express")

// Importando o Express com ES6 Modules (nova)
import express from "express";

import Cliente from "../models/Cliente.js";

// Método do Express usando para criaas rotas da aplicação
const router = express.Router();

// ROTA CLIENTES
// listar é get()
router.get("/clientes",function(req,res){
    // const clientes = [
    //     {nome: "Ana Silva", cpf: "123.456.789-00", endereco: "Rua das Flores, 123, Bairro Jardim Primavera, Cidade Felicidade, Estado do Sonho, CEP: 12345-678"},
    //     {nome: "Pedro Almeida", cpf: "987.654.321-00", endereco: "Avenida Central, 456, Bairro Centro, Cidade Nova, Estado da Esperança, CEP: 98765-432"},
    //     {nome: "Marina Oliveira", cpf: "456.789.123-00", endereco: "Travessa dos Sonhos, 789, Bairro Vista Linda, Cidade Sol Nascente, Estado da Harmonia, CEP: 54321-987"},
    //     {nome: "Rafael Santos", cpf: "321.654.987-00", endereco: "Praça da Amizade, 321, Bairro Bela Vista, Cidade Alegria, Estado da Serenidade, CEP: 87654-321"}
    // ]

    // AQUI IREMOS CHAMAR O MODEL "CLIENTE", INVOCAR O MÉTODO findAll() PARA BUSCAR TODOS OS REGISTROS DA TABELA DE CLIENTE
    Cliente.findAll().then(clientes => {
        res.render("clientes", {
            clientes : clientes
        });
    }).catch(error => {
        console.log("Ocorreu um erro ao buscar os clientes." + error);
    });

    
});

// ROTA DE CADASTRO DE CLIENTES (subrota / cadastrar)
// cadastrar é post()
router.post("/clientes/cadastrar", (req,res) => {
    // CRIANDO AS VARIÁVEIS QUE IRÃO ARMAZENAR OIS DADOS VINDOS DO FORMULÁRIO
    const nome  = req.body.nome;
    const cpf = req.body.cpf;
    const endereco = req.body.endereco;

    // Enviando os dados para o banco
    // O método create cadastra informações no BD
    Cliente.create({
    // coluna   //variável
        nome: nome,
        cpf: cpf,
        endereco: endereco
        // Se a promessa for bem sucedida, o usuário será direcionado para a página de clientes
    }).then(() => {
        res.redirect("/clientes");
        // Falha da promessa
    }).catch(error => {
        console.log("Ocorreu um erro ao cadastrar o cliente. " + error);
    });
});

// ROTA DE EXCLUSÃO DE CLIENTE
router.get("/clientes/excluir/:id", (req, res) => {
    // Capturando o parâmetro da rota
    const id = req.params.id;
    // Enviando o ID do cliente para apagar do banco de dados
    Cliente.destroy({
        where : {
        // Banco    //Parâmetro recebido
            id : id
        }
        // SUCESSO
    }).then(() => {
        res.redirect("/clientes");
        // FALHA
    }).catch(error => {
        console.log("Ocorreu um erro ao excluir o cliente " + error);
    });
});

 // Exportando o módulo para usa-lo em outro arquivo
export default router;
