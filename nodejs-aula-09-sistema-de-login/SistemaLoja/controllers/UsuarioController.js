// CONTROLLER DE USUÁRIO
import express from "express";
const router = express.Router();
// IMPORTANDO O MODEL
import Usuario from "../models/Usuario.js"
// IMPORTANDO O BCRYPT (hash de senha)
import bcrypt from "bcrypt";

// ROTA DE LOGIN
router.get("/login", (req, res) => {
  res.render("login");
});

// ROTA DO FORMULÁRIO DE CADASTRO DO USUÁRIO
router.get("/cadastro", (req, res) => {
    res.render("cadastro");
});

// ROTA DE CRIAÇÃO DE USUÁRIO NO BANCO
router.post("/caduser", (req, res) => {
    // COLETANDO AS INFORMAÇÕES DO FORMULÁRIO
    const email = req.body.email;
    const senha = req.body.senha;

    // VERIFICANDO SE O USUÁRIO JÁ EXISTE
    Usuario.findOne({where: {email:email}}).then(usuario => {
        // SE NÃO HOUVER USUÁRIO IGUAL
        if (usuario == undefined){
            // AQUI SERÁ FEITO O HASH DE SENHA
            // Criando "sal" do hash
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(senha, salt);

            // ENVIANDO PARA O BANCO
            Usuario.create({
                email : email,
                senha : hash,
            }).then(() => {
                res.redirect("/login");
            }).catch(error => {
                console.log("Não foi possível cadastrar o usuário." + error);
            });
        }
        // SE JÁ HOUVER UM USUÁRIO COM O MESMO EMAIL
        else {
            res.send(`Usuário já cadastrado! 
                <br><a href="/login">Faça o login.</a>`)
        }
    });
});

// ROTA DE AUTENTICAÇÃO (LOGIN)
router.post("/autenticacao", (req, res) => {
    // CAPTURANDO OS DADOS DO FORMULÁRIO DE LOGIN
    const email = req.body.email;
    const senha = req.body.senha;
    // BUSCANDO O USUÁRIO NO BANCO
    Usuario.findOne({where: {email:email}}).then((usuario) => {
        // SE O USUÁRIO EXISTIR
        if (usuario != undefined){
            // VALIDA A SENHA
            const correct = bcrypt.compareSync(senha, usuario.senha);
            // SE A SENHA FOR VÁLIDA
            if (correct) {
                // AUTORIZA O LOGIN
                // CRIA A SESSÃO PARA O USUÁRIO
                req.session.usuario = {
                    // INSERINDO AS INFORMAÇÕES DO USUÁRIO NA SESSÃO
                    id : usuario.id,
                    email : usuario.email
                }
                // res.redirect("/");
                // res.send(`Sessão do usuário criada com sucesso!<br>
                //     ID do usuário logado: ${req.session.usuario['id']}<br>
                //     E-mail do usuário logado: ${req.session.usuario['email']}`);
                res.redirect("/")
            }
            // SE A SENHA ESTIVER INCORRETA
            else{
                res.send(`Senha inválida!
                    <br><a href="/login">Tente novamente.</a>`)
            }
        }
        // SE O USUÁRIO NÃO EXISTIR
        else {
            res.send(`O usuário informado não existe!
                    <br><a href="/login">Tente novamente.</a>`)
        }
    });
});

// EXPORTANDO O MÓDULO
export default router;
