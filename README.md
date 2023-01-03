# Tipagem Estática e Generics

## Tipos de coleção

- Arrays - conjuntos de valores de mesmo tipo. 

~~~ts
let arrayName: type = [...];
let names: string[] = ["João", "sir", "Vini", "Gui", "Matheus"]
~~~

- Tuplas - conjuntos de valores cuja ordem e tipo dos valores são fixos. Em JS elas são representadas como arrays, mas são estruturas diferentes.

~~~ts
let nameAndAge: [string, number] = ["João S.", 28];
let apartamento: [string, string, number] = ["Araguari", "Centro", 600000.00];
~~~


## Type Aliases

Type Aliases (apelidos de tipos) são usados para declarar a forma de um objeto nomeando o tipo, o que nos permite usar o mesmo tipo mais de uma vez e nos referir a ele através de um único nome. 

~~~ts
type Coordenadas = {
  x: number;
  y: number;
};

function printCoord(pt: Point) {
  console.log("O valor da cordenada x é: " + pt.x);
  console.log("O valor da coordenada y é: " + pt.y);
}

printCoord({ x: 100, y: 100 });
//saída:
//O valor da cordenada x é: 100
//O valor da cordenada y é: 100
~~~

## Type Unions

Type Unions (união de tipos) é uma forma de declarar que um objeto é um tipo formado a partir de dois ou mais outros tipos, representando valores que podem ser qualquer um desses tipos. Para isso, é preciso declarar os tipos esperados separados por barra vertical (|) conhecido em inglês como pipe.

~~~ts
// A função abaixo pode receber tanto um número
// quanto uma string.
function imprimirNumeroSorteado(n: number | string){
  console.log("Seu número sorteado é: " + n);
}

imprimirn(11111111111);
// Saída:
// Seu número sorteado é: 11111111111
imprimirn('123456789');
// Saída:
// Seu número sorteado é: 123456789
~~~

## Classes

Classes são uma maneira de definir a forma de um objeto. Podemos considerar uma classe como um projeto para a criação de objetos. Ela contém os atributos e métodos que pode executar, mas é apenas um projeto do Objeto. É necessário instanciar a classe para atribuir os valores nas suas propriedades e executar suas ações.

~~~ts
Copiar
// usamos a palavra reservada class para definir uma classe
class Person {
    name: string;
    birthDate: Date;
    age: number;
    constructor(name: string, birthDate: Date, age: number;) {
        // usamos o this para acessar as propriedades da instância da classe,
        // ele representa a própria instância que estamos criando
        // atribuímos o valor do parâmetro recebido a propriedade da instância da classe
        this.name  = name;
        this.birthDate  = birthDate;
        this.age  = age;
    }

    speak(): void {
        console.log(`${this.name} está falando.`);
    }

    eat(): void {
        console.log(`${this.name} está comendo.`)
    }

    walk(): void {
        console.log(`${this.name} está andando.`)
    }
}

const person1 = new Person("Jane Doe", new Date("1986-01-01"), 27);
const person2 = new Person("Jon Doe", new Date("1980-08-05"), 42);
console.log(person1);
person1.speak()
~~~

Podemos usar o caractere ? para marcar uma propriedade como opcional, o que faz com seu tipo seja um union type entre o tipo original e undefined.

~~~ts
constructor(name: string, birthDate: Date, age?: number) {
    this.name  = name;
    this.birthDate  = birthDate;
    this.age  = age;
}

const person1 = new Person("Jane Doe", new Date("1986-01-01"));
person1.age = 23;
console.log(person1);
// Person: {
//   "name": "Jane Doe",
//   "birthDate": "1986-01-01T00:00:00.000Z",
//   "age": 23
// }
~~~

## Interfaces

Essa estrutura não existe no JS. Ela é utilizada para declarar a forma de um objeto, nomear e parametrizar os tipos do objeto e compor tipos de objetos nomeados existentes em novos. São uma forma de definir um contrato de código, ou seja, aquilo que você espera que seja implementado dentro do seu código.

~~~ts
interface Employee {
    firstName: string;
    lastName: string;
    fullName(): string;
}
~~~

Uma interface não inicializa nem implementa as propriedades declaradas dentro dela, porque o único trabalho de uma interface é descrever o objeto. Ela define o que o contrato de código exige, enquanto quem implementa a interface deve atender ao contrato fornecendo os detalhes de implementação necessários.

~~~ts
let employee: Employee = {
    firstName : "John",
    lastName: "Doe",
    fullName(): string {
        return this.firstName + " " + this.lastName; // usamos o "this" para acessar as propriedades da interface
    }
}
~~~

Uma interface também pode estender de uma outra, o que permite que copiemos as propriedades de uma interface em outra, proporcionando mais flexibilidade na maneira de separará-las em componentes reutilizáveis. Podemos estender uma interface, usando a palavra reservada extends:

~~~ts
interface Teacher extends Employee {
    subject: string;
    sayHello(): string;
}
~~~

~~~ts
let teacher: Teacher = {
    firstName: "John",
    lastName: "Doe",
    subject: "Matemática",
    fullName(): string {
        return this.firstName + " " + this.lastName;
    },
    sayHello(): string {
        return `Olá, eu sou ${this.fullName()} e leciono ${this.subject}`;
    }
}
~~~

O objeto precisa definir valores para todas as propriedades exigidas pela interface, incluindo as propriedades da interface base/mãe.
Classes também podem implementar interfaces, o que faz com que a classe possua todas as propriedades e métodos daquela interface.


## Type Assertion e Generics

### Type Assertion (as Type)
Há momentos em que precisamos utilizar recursos nativos do JavaScript, ou até mesmo bibliotecas externas, que podem não oferecer opções para realizarmos uma tipagem eficiente para obtermos o tipo correto para uma variável ou objeto. Quando nos deparamos com cenários assim, a melhor alternativa é buscar entender a estrutura que a variável ou objeto terá em momento de execução (runtime) para então forçar um tipo específico utilizando o Type Assertions do TypeScript.

Por exemplo, a seguir temos uma função que converte string para json. Por ser muito genérica, a tipagem que a função retorna é desconhecida (unknown), mas observando o código dá para notar na string a ser convertida qual estrutura será retornada depois que a função for executada. Sendo assim, podemos forçar um tipo específico para aquele objeto e continuar aproveitando os recursos do TypeScript:

~~~ts
type Address = {
  street: string,
  number: number | null,
}

type User = {
  name: string,
  email: string,
  password: string,
}
S
// função que converte de string para json
function stringToJson(str: string): unknown {
  const result = JSON.parse(str);
  return result;
}

// utilizando o "as" para converter de unknown para User
const user = stringToJson('{"name":"André Soares","email":"andre@trybe.com","password":"senha_secreta"}') as User

// Outra forma de usar o Assertion. A sintaxe é diferente mas tem o mesmo objetivo
const address = <Address> stringToJson('{"street":"Rua Tamarindo","number":1}')

user.name;
address.street;
~~~

~~~ts
const str: unknown = 'texto'; // simulando um valor supostamente desconhecido

str.split(''); // Dispara um erro por aplicar um split em um tipo desconhecido
(str as string).split('') // Corrigindo o erro acima usando o 'as'

const num: string = '2';

num as number // dispara um erro, pois não é possível usar Type Assertions com tipos incompatíveis
(num as unknown) as number // Corrigindo o erro acima convertendo primeiramente para unknown
~~~

Type Assertion é uma forma de você falar para o compilador “confia em mim, eu sei o que estou fazendo”. Portanto, é um recurso que você só deve utilizar se realmente souber a estrutura de tipo esperada para uma variável ou objeto. O ideal, na verdade, é que Type Assertion seja a sua segunda alternativa para conseguir atribuir tipos específicos em valores incertos ou desconhecidos. A primeira alternativa para tentar tipar comportamentos genéricos que você pode optar é utilizar os Generics que o próprio TypeScript oferece.

## Generics

Generics é uma forma de passarmos, por meio de parâmetros, tipos para funções que se comportam de forma genérica.

Para entendermos melhor podemos refatorar o código anterior, que fizemos utilizando Type Assertions, para começar a utilizar Generics:

~~~ts
function stringToJson<T>(str: string): T {
  const result = JSON.parse(str);
  return result;
}

const user = stringToJson<User>('{"name":"André Soares","email":"andre@trybe.com","password":"senha_secreta"}');

const address = stringToJson<Address>('{"street":"Rua Tamarindo","number":1}')

user.name;
address.street;
~~~

Uum parâmetro genérico T é recebido pela função destino e o esperado é que seja retornado esse mesmo tipo. Na hora de utilizar a função basta somente informar o tipo que gostaríamos de obter.

Optar pelo uso de Generics para casos como o do exemplo de código acima, acaba sendo mais vantajoso, pois se nosso código precisar passar por alterações o Generics consegue oferecer possibilidades mais organizadas para escalar a tipagem. Por exemplo, vamos imaginar que agora nossa função stringToJson precisará adicionar um identificador único no resultado do nosso objeto. Nós vamos informar esse identificador como segundo parâmetro da função, e além disso atribuir um outro tipo genérico:

~~~ts
// O envio de múltiplos tipos por parâmetro (T e o U);
// A possibilidade de usar o parâmetro genérico de maneira distribuída na função destino (tanto no parâmetro id: U como no retorno T & { id: U });
// A manipulação dos genéricos para modificar o tipo de retorno esperado (na interseção T & { id: U })
function stringToJson<T, U>(str: string, id: U ): T & { id: U } {
  const result = JSON.parse(str);
  result.id = id;
  return result;
}

const user = stringToJson<User, number>('{"name":"André Soares","email":"andre@trybe.com","password":"senha_secreta"}', Date.now());

const address = stringToJson<Address, string>('{"street":"Rua Tamarindo","number":1}', '#01')
~~~

~~~ts
function getArray<T>(items : T[]) : T[] {
  return new Array<T>().concat(items); // construindo um Array que só pode conter elementos do tipo T
}

const numberArray = getArray<number>([5, 10, 15, 20]);
numberArray.push(25);
numberArray.push("This is not a number"); // Isto vai gerar um erro de compilação

const stringArray = getArray<string>(["Cats", "Dogs", "Birds"]);
stringArray.push("Rabbits");
stringArray.push(30); // Isto vai gerar um erro de compilação
~~~
