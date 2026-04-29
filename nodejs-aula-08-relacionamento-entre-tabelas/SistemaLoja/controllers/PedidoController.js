// Forma de importar CommonJS (antiga)
// const express = require("express")

// Importando o Express com ES6 Modules (nova)
import express from "express";

import Pedido from "../models/Pedido.js";
import Cliente from "../models/Cliente.js";
import { where } from "sequelize";

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

    // Realizando ambas as consultas em paralelo
    Promise.all([
        Pedido.findAll({
            include: [
                {
                    model: Cliente, // Inclui o modelo Cliente relacionado
                    required: true, // Garante que somente pedidos com clientes relacionados sejam retornados
                },
            ],
        }),
        // Buscar todos os clientes
        Cliente.findAll(),
    ]).then(([pedidos, clientes]) => {
        res.render("pedidos", {
            // Passando a lista de pedidos e clientes para a página
            pedidos : pedidos,
            clientes : clientes
        });
    }).catch(error => {
        console.log(`Ocorreu um erro ao listar os pedidos. ${error}`)
    });
});

// ROTA DE CADASTRO DE PEDIDOS
router.post("/pedidos/cadastrar", (req, res) => {
    // CAPTURAR OS DADOS DO FORMULÁRIO
    const numero = req.body.numero;
    const valor = req.body.valor;
    const clienteId = req.body.clienteId;
    // CADASTRANDO NO BANCO
    Pedido.create({
        numero : numero,
        valor : valor,
        // clienteId
        cliente_id : clienteId,
    }).then(() => {
        res.redirect("/pedidos");
    }).catch(error => {
        console.log(error);
    });
});

// ROTA DE EXCLUSÃO DE PEDIDOS
router.get("/pedidos/excluir/:id", (req, res) => {
    const id = req.params.id;
    Pedido.destroy({
        where: {
            id : id,
        },
    }).then(() => {
        res.redirect("/pedidos");
    }).catch(error => {
        console.log(error);
    });
});

 // exportando o módulo para usa-lo em outro arquivo
export default router;