// MIDDLEWARE DE AUTENTICAÇÃO

function Auth(req, res, next) {
    // Verificar se existe uma sessão para o usuário
    if (req.session.usuario != undefined){
        // Permite o prosseguimento
        next();
    }
    else {
        // Exibe a página de login para o usuário
        res.render("login");
    }
};

export default Auth;