import express from "express";
// Método do Express usado para criar as rotas da aplicação
const router = express.Router();
// Importando os Models
import Pedido from "../models/Pedido.js";
import Cliente from "../models/Cliente.js";

// ROTA PEDIDOS
router.get("/pedidos", function (req, res) {
  // Fazendo INNER JOIN para trazer as informações do Cliente junto com as informações do Pedido

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
    // Busca todos os clientes
    Cliente.findAll(),
  ])
    .then(([pedidos, clientes]) => {
      res.render("pedidos", {
        // Passando a lista de pedidos e clientes para a página
        pedidos: pedidos,
        clientes: clientes,
      });
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao listar os pedidos. ${error}`);
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
    numero: numero,
    valor: valor,
    // clienteId
    cliente_id: clienteId,
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
      id: id,
    },
  }).then(() => {
    res.redirect("/pedidos");
  }).catch(error => {
    console.log(error);
  });
});

export default router;
