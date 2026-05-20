import express from 'express';
// IMPORTANDO A BIBLIOTECA MULTER
import multer from 'multer';
// IMPORTANDO O SEQUELIZE
import connection from "./config/sequelize-config.js";
// IMPORTANDO O MODEL GALERIA
import Galeria from "./models/Galeria.js";

const app = express();

// Realizando a conexão
connection.authenticate().then(() => {
    console.log("Conexão com o banco realizada com sucesso!");
}).catch((error) => {
    console.log(error);
});

// Criando o banco de dados
connection.query("CREATE DATABASE IF NOT EXISTS galeria;").then(() => {
    console.log("O banco de dados está criado!");
}).catch(error => {
    console.log(error);
});

// Configurando a pasta PUBLIC
app.use(express.static('public'));

// Configurando o EJS
app.set('view engine', 'ejs');

// Configurando o MULTER
const upload = multer({dest: "public/uploads/"});

// ROTA PRINCIPAL
app.get("/", (req, res) => {
    // SELECIONANDO TODAS AS IMAGENS DO BANCO
    Galeria.findAll().then(imagens => {
        res.render("index", {
            // Enviando as imagens para a página
            imagens : imagens,
        });
    }).catch(error => {
        console.log(error);
    });
});

// ROTA DE UPLOAD
app.post("/upload", upload.single("file"), (req, res) => {
    // Gravando o nome do arquivo gerado pelo multer na variável "file"
    const file = req.file.filename
    Galeria.create({
        arquivo : file,
    }).then(() => {
        res.redirect("/");
    }).catch(error => {
        console.log("Não foi possível gravar o arquivo no banco de dados!" + error);
    });
});

const port = 8081;

app.listen(port, (error) =>  {
    if(error) {
        console.log(`Ocorreu um erro ao iniciar o servidor! ${error}`);
    } else {
        console.log(`Servidor iniciado com sucesso em: http://localhost:${port}`);
    }
});