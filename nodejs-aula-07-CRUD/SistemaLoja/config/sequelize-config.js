// Importando a ORM Sequelize
import Sequelize from "sequelize";

// Definindo os dados de conexão com o banco de dados
const connection = new Sequelize({
    // Tipo do banco
    dialect: "mysql",
    // Endereço do banco
    host: "localhost",
    // Nome do usuário do banco
    username: "root",
    // Senha
    password: "",
    // Fuso horário
    timezone: "-03:00",
    database: "sistemaloja"
});

// Exportando o módulo
export default connection;