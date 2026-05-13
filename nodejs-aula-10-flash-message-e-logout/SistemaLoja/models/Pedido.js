import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const Pedido = connection.define("pedido", {
  numero: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  valor: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  // Chave estrangeira
  cliente_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Pedido.sync({ force: false });

export default Pedido;
