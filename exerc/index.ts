import Car from './Car';
import Pizza from './Pizza';
import PizzaVegetarian from "./PizzaVegetarian";
import PizzaCommon from "./PizzaCommon";
import PizzaSugar from "./PizzaSugar";

// EXERC 1
const carro = new Car("Volkswagen", "prata", 4);

carro.turnOn();
carro.speedUp();
carro.speedDown();
carro.turn("left");
carro.speedUp();
carro.speedDown();
carro.turn("right");
carro.speedUp();
carro.speedDown();
carro.turn("right");
carro.speedDown();
carro.stop();
carro.speedUp();
carro.speedDown();
carro.turn("right");
carro.speedUp();
carro.speedDown();
carro.turn("left");
carro.speedUp();
carro.speedDown();
carro.turn("right");
carro.speedDown();
carro.stop();
carro.speedUp();





// EXERC 2
const calabresa: Pizza = {
  flavor: "Calabresa",
  slices: 8
}

console.log(calabresa);

const marguerita: Pizza = {
  flavor: "Marguerita",
  slices: 6
}

console.log(marguerita);


const nutela: Pizza = {
  flavor: "Nutela",
  slices: 4
}

console.log(nutela);






// EXERC 4

const calabresa2: PizzaCommon = {
  flavor: "Calabresa",
  slices: 6
}

console.log(calabresa2);

const frango2: PizzaCommon = {
  flavor: "Frango",
  slices: 8
}

console.log(frango2);

const pepperoni2: PizzaCommon = {
  flavor: "Pepperoni",
  slices: 6
}

console.log(pepperoni2);

const marguerita2: PizzaVegetarian = {
  flavor: "Marguerita",
  slices: 8
}

console.log(marguerita2);

const palmito2: PizzaVegetarian = {
  flavor: "Palmito",
  slices: 8
}

console.log(palmito2);

const goiabadaEQueijo: PizzaSugar = {
  flavor: "Goiabada com Queijo",
  slices: 4
}

console.log(goiabadaEQueijo);