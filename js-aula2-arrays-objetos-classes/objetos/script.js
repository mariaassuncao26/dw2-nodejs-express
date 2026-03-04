// OBJETOS LITERAIS NO JAVASCRIPT
document.write(`<h4>Objetos literais possuem Atributos (propriedades) e Métodos (funções)</h4>`);

const pessoa = {};
document.write(typeof(pessoa));

// Criando o objeto
const carro = {
    // Propriedades
    modelo: "gol",
    cor: "vermelho",
    // Métodos
    acelerar(){
        return "Vrummmmmm...";
    },
    frear(){
        return "Freando...";
    },
};
document.write(`<p>O modelo do carro é: ${carro.modelo}</p>`);
document.write(`<p>A cor do carro é: ${carro.cor}</p>`);
document.write(`<p>Quando o carro acelera ele faz: ${carro.acelerar()}</p>`);
document.write(`<p>Ativando os freios: ${carro.frear()}</p>`);

// MANIPULANDO ARRAYS DE OBJETOS
const productList = [{
    nome: "Computador",
    marca: "Lenovo",
    preco: 3000,
    descricao: "PC moderno com bom desempenho."
},
{
    nome: "Tablet",
    marca: "Samsung",
    preco: 2000,
    descricao: 
    "Ótima velocidade de processamento."
},
{
    nome: "Celular",
    marca: "Apple",
    preco: 12000,
    descricao: "Ultra resistente."
}];

// EXIBINDO O ARRAY DE OBJETOS ATRAVÉS DO FOREACH
document.write('<h4>Exibindo o array de objetos através do forEach:</h4>');
productList.forEach((product) => {
    document.write(`
        Produto: ${product.nome} <br>
        Marca: ${product.marca} <br>
        Preço: ${product.preco} <br>
        Descrição: ${product.descricao} <br><br>
        `);
});