import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

// Criando o Model
// O método define() do Sequelize cria uma tabela no BD
const Produto = connection.define('produtos', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    preco:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

// O método sync() sincroniza os dados com o banco
// force: false -> não recria a tabela caso ela ja exista 
Produto.sync({force:false});
export default Produto;