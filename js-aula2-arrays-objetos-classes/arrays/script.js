// DECLARANDO E EXIBINDO ITENS DE UM ARRAY
let produtos = [];
document.write(typeof (produtos));

let products = ['Computador', 'Notebook', 'Celular', 'Tablet'];
document.write(`<p>${products}</p>`);

document.write('<h4>Exibindo os elementos do vetor através do índice: </h4>');
document.write(`<p>${products[0]}</p>`);
document.write(`<p>${products[1]}</p>`);
document.write(`<p>${products[2]}</p>`);
document.write(`<p>${products[3]}</p>`);

document.write('<h4>Exibindo elementos do vetor através do forEach: </h4>');
products.forEach((product) => {
    document.write(`<p>${product}</p>`);
});

document.write('<h4>Exibindo elementos do vetor através do forEach com os índices: </h4>');
products.forEach((product, i) => {
    document.write(`<p>${i+1} - ${product}</p>`);
})

// MÉTODOS DE MANIPULAÇÃO DE VETORES
let frutas = ['Laranja', 'Maça', 'Banana'];
document.write(`<p>Nossa lista de frutas é: ${frutas}</p>`);
frutas[3] = 'Morango';
document.write(`<p>Agora nossa lista de frutas é: ${frutas}</p>`);

document.write(`<h4>O método PUSH - Insere um novo elemento no FINAL do vetor.</h4>`);
frutas.push('Abacaxi');
document.write(`<p>Agora nossa lista de frutas é: ${frutas}</p>`);

document.write(`<h4>O método UNSHIFT - Insere um novo elemento no INÍCIO do vetor.</h4>`);
frutas.unshift('Pera');
document.write(`<p>Agora nossa lista de frutas é: ${frutas}</p>`);

// COMO CONTAR OS ELEMENTOS DE UM VETOR - Método LENGTH
const items = frutas.length;
document.write(`<p>Na nossa lista temos ${items} frutas.</p>`);
