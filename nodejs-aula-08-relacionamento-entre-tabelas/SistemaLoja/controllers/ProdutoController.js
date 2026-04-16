import express from "express";

import Produto from "../models/Produto.js";

const router = express.Router();

router.get("/produtos",function(req,res){
    // const produtos = [
    //     {nome: "Celular Motorola E22", preco: 1200, categoria: "Eletroportáteis"},
    //     {nome: "Tablet Samsung", preco: 900, categoria: "Eletrônicos"},
    //     {nome: "Notebook Lenovo", preco: 3200, categoria: "Computadores"},
    //     {nome: "Fone Bluetooth", preco: 150, categoria: "Periféricos"}
    // ]
    Produto.findAll().then(produtos => {
        res.render("produtos", {
            produtos : produtos
        });
    }).catch(error => {
        console.log("Ocorreu um erro ao buscar os produtos." + error);
    });

});

// ROTA DE CADASTRO DE PRODUTOS (subrota / cadastrar)
// cadastrar é post()
router.post("/produtos/cadastrar", (req,res) => {
    // CRIANDO AS VARIÁVEIS QUE IRÃO ARMAZENAR OS DADOS VINDOS DO FORMULÁRIO
    const nome  = req.body.nome;
    const preco = req.body.preco;
    const categoria = req.body.categoria;

    // Enviando os dados para o banco
    // O método create cadastra informações no BD
    Produto.create({
    // coluna   //variável
        nome: nome,
        preco: preco,
        categoria: categoria,
        // Se a promessa for bem sucedida, o usuário será direcionado para a página de clientes
    }).then(() => {
        res.redirect("/produtos");
        // Falha da promessa
    }).catch(error => {
        console.log("Ocorreu um erro ao cadastrar o produto. " + error);
    });
});

export default router;