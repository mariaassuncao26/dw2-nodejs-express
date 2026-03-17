const listaCliente = [{
    nome: "Maria",
    endereco: "Registro",
    cpf: 12312312360
},
{
    nome: "Roberta",
    endereco: "Cajati",
    cpf: 45645645690
}, 
{
    nome: "Mayra",
    endereco: "Juquiá",
    cpf: 78978978940
}];

listaCliente.forEach((listaC) => {
    document.write(`
        Nome: ${listaC.nome} <br>
        Endereço: ${listaC.endereco} <br>
        CPF: ${listaC.cpf} <br><br>
        `);
});


listaCliente.push({
    nome: "Guilherme",
    endereco: "Iguape",
    cpf: 13513513540
});
document.write("<hr><br><p> Nova lista de clientes é:</p><br>");

listaCliente.forEach((listaC) => {
    document.write(`
        Nome: ${listaC.nome} <br>
        Endereço: ${listaC.endereco} <br>
        CPF: ${listaC.cpf} <br><br>
        `);
});


listaCliente.unshift({
    nome: "Giovanna",
    endereco: "Cananéia",
    cpf: 15785856720
});
document.write("<hr><br><p> Nova lista de clientes é:</p><br>");

listaCliente.forEach((listaC) => {
    document.write(`
        Nome: ${listaC.nome} <br>
        Endereço: ${listaC.endereco} <br>
        CPF: ${listaC.cpf} <br><br>
        `);
});

const items = listaCliente.length;
document.write(`<p>Há  ${items} clientes cadastrados.</p>`);
