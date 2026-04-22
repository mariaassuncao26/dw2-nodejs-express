// Forma de importar CommonJS (antiga)
// const express = require("express")

// Importando o Express com ES6 Modules (nova)
import express from "express";

import Pedido from "../models/Pedido.js";
import Cliente from "../models/Cliente.js";

// Método do Express usado para criar rotas da aplicação
const router = express.Router();

// ROTA PEDIDOS
// listar é get()
router.get("/pedidos",function(req,res){
    // const pedidos = [
    //     {numero: "983721931", valor: 1200},
    //     {numero: "983721932", valor: 900},
    //     {numero: "983721933", valor: 3200},
    //     {numero: "983721934", valor: 150}
    // ]

    // AQUI IREMOS CHAMAR O MODEL "PEDIDO", INVOCAR O MÉTODO findAll() PARA BUSCAR TODOS OS REGISTROS DA TABELA DE PEDIDO
    // Pedido.findAll().then(pedidos => {
    //     res.render("pedidos", {
    //         pedidos : pedidos
    //     });
    // }).catch(error => {
    //     console.log("Ocorreu um erro ao buscar os pedidos." + error);
    // });

    // Fazendo INNER JOIN para trazer as informações de cliente junto com as informações do Pedido
    Pedido.findAll({
        include: [
            {
                model: Cliente, // Inclui o modelo Cliente relacionado
                required: true, // Garante que somente pedidos com clientes relacionados sejam retornados
            }
        ]
    }).then(pedidos => {
        res.render("pedidos", {
            // Passando a lista de pedidos para a página
            pedidos : pedidos
        });
    }).catch(error => {
        console.log(`Ocorreu um erro ao listar os pedidos. ${error}`)
    });
});


// ROTA DE CADASTRO DE PEDIDOS (subrota / cadastrar)
// cadastrar é post()
router.post("/pedidos/cadastrar", (req,res) => {
    // CRIANDO AS VARIÁVEIS QUE IRÃO ARMAZENAR OS DADOS VINDOS DO FORMULÁRIO
    const numero  = req.body.numero;
    const valor = req.body.valor;

    // Enviando os dados para o banco
    // O método create cadastra informações no BD
    Pedido.create({
    // coluna   //variável
        numero: numero,
        valor: valor,
        // Se a promessa for bem sucedida, o usuário será direcionado para a página de clientes
    }).then(() => {
        res.redirect("/pedidos");
        // Falha da promessa
    }).catch(error => {
        console.log("Ocorreu um erro ao cadastrar o pedido. " + error);
    });
});

 // exportando o módulo para usa-lo em outro arquivo
export default router;