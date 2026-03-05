// CLASSES NO JAVASCRIPT

// Nome de classes devem iniciar com letra maiúscula
class Carro {
    // DEFININDO OS ATRIBUTOS
    constructor(marca, modelo, ano) {
        // this é uma referência às instâncias que serão criadas através dessa classe
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
    }
    // DEFININDO MÉTODOS
    buzinar() {
        return "Beep!, Beep!";
    }
} 

// INSTÂNCIANDO OBJETOS
const carroPopular = new Carro ("Fiat", "Uno", "2012");

document.write(`<p>O carro ${carroPopular.marca} modelo ${carroPopular.modelo} é do ano ${carroPopular.ano} e quando buzina faz ${carroPopular.buzinar()}</p>`);

const carroEsportivo = new Carro ("Chevrolet", "Camaro", "2020");
carroEsportivo.turbo = function(){
    return "Vrummmmm...";
}

document.write(`<p>O carro ${carroEsportivo.marca} modelo ${carroEsportivo.modelo} é do ano ${carroEsportivo.ano} e quando buzina faz ${carroEsportivo.buzinar()} e quando acelera ${carroEsportivo.turbo()}</p>`);