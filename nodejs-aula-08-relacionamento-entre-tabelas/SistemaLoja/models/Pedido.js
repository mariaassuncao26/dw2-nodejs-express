import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

// Criando o Model
// O método define() do Sequelize cria uma tabela no BD
const Pedido = connection.define('pedidos', {
    numero: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    valor:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    // Chave estrangeira
    cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

// O método sync() sincroniza os dados com o banco 
// force: false -> não recria a tabela caso ela ja exista 

// Pedido.sync({force:false});
export default Pedido;