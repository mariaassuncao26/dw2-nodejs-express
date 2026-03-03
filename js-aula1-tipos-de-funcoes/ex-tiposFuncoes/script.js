// Função Simples - Exer 1
function aluno(){
    const dados = "<p>Maria Eduarda tem 18 anos e mora na cidade de Registro.</p>";
    document.write(dados);
}
aluno();

// Função com Parâmetros - Exer 2
const n1 = 20;
const n2 = 40;

function divisao(n1, n2){
    let result = n1 / n2;
    document.write(`<p>O resultado da divisão foi ${result}.</p>`);
}
divisao(n1,n2);

// Função com Retorno - Exer 3
const num1 = 3;
const num2 = 2;
const num3 = 4;

function mult(num1, num2, num3){
    return num1 * num2 * num3;
}
document.write(`<p>O resultado da multiplicação é ${mult(num1, num2, num3)}.</p>`);

// Função com Retorno Condicional - Exer 4
const nidade = 20;

function Idade(nidade){
    if (nidade >= 18){
        return "Maior de Idade.";
    }
    else{
        return "Menor de Idade.";
    }
}
document.write(`<p>${Idade(nidade)}</p> `);

// Função Anônima - Exer 5
let nota1 = 10;
let nota2 = 10;

const Vmedia = function(nota1, nota2){
    let media = (nota1 + nota2) / 2;
    if (media <= 5){
        return "Reprovado.";
    }
    else{
        return "Aprovado.";
    }
}
document.write(`<p>${Vmedia(nota1, nota2)}</p>`);


// Arrow Function com Parâmetro Único
const triplo = x => {
    return x * 3;
}
const x = 3;
document.write(`<p>O triplo do número é ${triplo(x)}.</p>`);

// Arrow Function com mais de um Parâmetro
const soma = (v1, v2, v3, v4) =>{
    return v1 + v2 + v3 + v4;
}
let v1 = 10;
let v2 = 10;
let v3 = 10;
let v4 = 10;
document.write(`<p>${soma(v1,v2,v3,v4)}.</p>`);