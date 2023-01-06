## Model com MySQL

Vamos agora colocar os aprendizados em prática e ver como podemos usar Type Assertions, Generics, Classes e Interfaces ao estilo real life. Para esse projeto, vamos usar um banco de dados MySQL para gerenciar uma lista de livros. Crie o banco usando o sql abaixo:

~~~SQL
CREATE DATABASE IF NOT EXISTS books_api;

USE books_api;

CREATE TABLE IF NOT EXISTS books
(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  price DECIMAL(10, 2),
  author VARCHAR(100) NOT NULL,
  isbn VARCHAR(100),
  PRIMARY KEY(id)
);

INSERT INTO books (title, price, author, isbn)
VALUES ('Código Limpo', 125.9, 'Robert C Martin', '8576082675'),
  ('Refatoração', 129.9, 'Martin Fowler', '8575227246'),
  ('Padrões de Projetos', 141.98, 'Erich Gamma', '8573076100');
~~~

Iniciaremos vendo como a lib mysql2 utiliza o recurso de generics em seus métodos. Para isso, vamos começar implementando nosso arquivo connection.ts.

Lembre-se de criar o arquivo .env com os valores das variáveis de ambiente utilizadas no arquivo models/connection.ts e de instalar as bibliotecas mysql2 e dotenv com npm install mysql2@2.3 dotenv@10.0.

~~~ts
// ./models/connection.ts

import mysql from 'mysql2/promise';

import dotenv from 'dotenv';

dotenv.config();

export default mysql.createPool({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
~~~

Vamos instalar também @types/node:

~~~shell
npm i --save-dev @types/node@18.11
~~~

Agora, vamos ver como a função connection.execute que usamos para executar queries usa o recurso de generics. Ao olhar para a sua definição podemos encontrar a seguinte assinatura:

~~~ts
execute<
    T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader
  >(
    sql: string,
    values: any | any[] | { [param: string]: any }
  ): Promise<[T, FieldPacket[]]>;
~~~

Vamos nos concentrar no generic utilizado na definição da função. O método execute pode receber qualquer tipo que estenda uma das seguintes interfaces:

RowDataPacket[][]
RowDataPacket[]
OkPacket
OkPacket[]
ResultSetHeader
Perceba que se quisermos atribuir um tipo genérico T a algum resultado de consulta, esse T precisará ser (ou herdar) algum dos 3 tipos esperados na assinatura do execute: RowDataPacket, OkPacket ou ResultSetHeader.

~~~ts
import connection from './models/connection';

const main = async () => {
  const result = await connection.execute('SELECT * FROM books');
  const [rows] = result;
  console.log(rows);
};

main();
~~~

Note que mesmo sem especificar nenhuma tipagem, o Typescript não reclama do código. Isso acontece porque para todos os tipos possíveis de retorno para connection.execute, por padrão, pode-se extrair um elemento do array.

Agora, vamos ver o aconteceria se você tentasse fazer uma query do tipo INSERT e extrair o insertId:

Observação: Para executar o exemplo a seguir instale a lib readline-sync.

~~~shell
npm i readline-sync@1.4 @types/readline-sync@1.4
~~~

~~~ts
// ./execute.insert.ts

import readline from 'readline-sync';
import connection from './models/connection';

const main = async () => {
  const title = readline.question('Digite o nome do livro: ');
  const price = readline.questionFloat('Digite o preço do livro: ');
  const author = readline.question('Digite o autor do livro: ');
  const isbn = readline.question('Digite o isbn do livro: ');

  const [{ insertId }] = await connection.execute(
    'INSERT INTO books (title, price, author, isbn) VALUES (?, ?, ?, ?)',
    [title, price, author, isbn]
  );
  console.log(insertId);
};

main();
~~~

Você vai perceber que seu código não pode ser compilado, pois o TypeScript não consegue identificar a origem do atributo insertId. O erro encontrado será:

Property ‘insertId’ does not exist on type ‘RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader’.

Porém na própria lib mysql2 temos uma interface que possui esse atributo, que é ResultSetHeader. Ao passar essa interface como generic para connection.execute, você vai perceber que a linha que extrai o atributo insertId passa a ser compilável.

~~~ts
// ./execute.insert.ts

// import readline from  'readline-sync';
import { ResultSetHeader } from 'mysql2';
// import connection from './models/connection';

// const main = async () => {
//   const title = readline.question('Digite o nome do livro: ');
//   const price = readline.questionFloat('Digite o preço do livro: ');
//   const author = readline.question('Digite o autor do livro: ');
//   const isbn = readline.question('Digite o isbn do livro: ');

const [{ insertId }] = await connection.execute<ResultSetHeader>(
  'INSERT INTO books (title, price, author, isbn) VALUES (?, ?, ?, ?)',
  [title, price, author, isbn]
); // essa linha não acusa mais erro de compilação.
//  console.log(insertId);
// }
//
// main();
~~~

Este é um primeiro exemplo do uso de generics no dia a dia que já podemos encontrar. Com base nisso, vamos implementar nosso modelo.

## Implementando um model como uma classe

Para este exemplo, criaremos nosso modelo como uma classe que vai possuir o atributo connection. Esta classe também terá o método getAll que irá retornar o resultados da query.

~~~ts
// ./models/Book.ts

import connection from './connection';
import { Pool } from 'mysql2/promise';

export default class BookModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public async getAll() {
    const result = await this.connection.execute('SELECT * FROM books');
    const [rows] = result;
    return rows;
  }
}
~~~

Dessa forma, podemos usar esse modelo para ser nossa fonte de acesso aos dados. Vamos instanciar um objeto dessa classe e chamá-lo no nosso arquivo main.ts.

~~~ts
// ./main.ts

import BookModel from './models/Book';

const main = async () => {
  const bookModel = new BookModel();

  const books = await bookModel.getAll();
  console.log(books);
};

main();
~~~

Apesar do código acima retornar resultados, não temos uma previsibilidade sobre o tipo desses dados. Para resolver isso podemos tentar aplicar duas formas de tipagens que já aprendemos: Type Assertions e Generics. Ambas as formas devem atender nosso objetivo que é mapear as propriedades do resultado que a query trará. Mas antes, vamos começar definindo uma interface que represente a entidade Book e que poderá ser utilizado em ambas alternativas de tipagem.

~~~ts
// ./models/Book.ts

// import connection from './connection';
// import { Pool } from 'mysql2/promise';

export interface Book {
  id?: number;
  title: string;
  price: number;
  author: string;
  isbn: string;
}

// export default class BookModel {
//   private connection: Pool;

//   constructor(){
//     this.connection = connection;
//   }

//   public async getAll() {
//     const result = await this.connection.execute('SELECT * FROM books');
//     const [rows] = result;
//     return rows;
//   }
// }
~~~

~~~ts
// import connection from './connection';
// import { Pool } from 'mysql2/promise';

// export interface Book {
//   id?: number,
//   title: string,
//   price: number,
//   author: string,
//   isbn: string,
// }

export default class BookModel {
//   private connection: Pool;
//   constructor() {
//     this.connection = connection;
//   }

  public async getAll(): Promise<Book[]> {
    const result = await this.connection.execute('SELECT * FROM books');
    const [rows] = result;
    return rows as Book[];
  }
}
~~~

Agora que já temos a interface, vamos precisar dizer ao Typescript que a nossa variável rows conterá um array de Books e para isso vamos usar o Type Assertions. Podemos fazer da seguinte forma:

~~~ts
// import connection from './connection';
// import { Pool } from 'mysql2/promise';

// export interface Book {
//   id?: number,
//   title: string,
//   price: number,
//   author: string,
//   isbn: string,
// }

export default class BookModel {
//   private connection: Pool;

//   constructor(){
//     this.connection = connection;
//   }

  public async getAll(): Promise<Book[]> {
    const result = await this.connection.execute('SELECT * FROM books');
    const [rows] = result;
    return rows as Book[];
  }
}
~~~

Note que com essa estratégia conseguimos informar a qualquer função que utilizar o getAll que o resultado que será obtido no retorno será um array com a estrutura da interface Books.

Agora, como uma alternativa ao Type Assertions, vamos tentar tipar utilizando o recurso generics, e como foi comentado acima na parte da assinatura do método execute, para conseguir informar o tipo de retorno pelo parâmetro genérico é necessário enviar um tipo que herde pelo menos uma das três interfaces esperadas.

Trazendo para nosso cenário, se quisermos mapear o resultado da query para que tenha as propriedades da interface Book, então devemos enviar como parâmetro a interface Book, herdando o tipo RowDataPacket que é a interface genérica que devemos utilizar quando realizamos queries de SELECT. A tipagem ficará assim:

~~~ts
import { Pool, RowDataPacket } from 'mysql2/promise';
// import connection from './connection';

// export interface Book {
//   id?: number,
//   title: string,
//   price: number,
//   author: string,
//   isbn: string,
// }

export default class BookModel {
  // private connection: Pool;

  // constructor(){
  //   this.connection = connection;
  // }

  public async getAll(): Promise<Book[]> {
    const [rows] = await this.connection.execute<(Book & RowDataPacket)[]>(
      'SELECT * FROM books'
    );
    
    return rows;
  }
}
~~~

Note que utilizando Generics nós conseguimos realizar a tipagem de maneira antecipada. Na mesma linha onde chamamos o execute já é possível saber todas as propriedades da variável rows. Já no Type Assertion, tivemos que desestruturar o array para conseguir atribuir o tipo. Mas vale reforçar que, para esse caso, ambas as alternativas são válidas pois atendem nosso objetivo.

### Método create

~~~ts
// ./models/Book.ts

import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
// import connection from './connection';

// export interface Book {
//   id?: number,
//   title: string,
//   price: number,
//   author: string,
//   isbn: string,
// }

// export default class BookModel {

// private connection: Pool;

// constructor(){
//   this.connection = connection;
// }

//   public async getAll(): Promise<Book[]> {
//     const [rows] = await this.connection.execute<(Book & RowDataPacket)[]>('SELECT * FROM books');

//     return rows;
//   }

  public async create(book: Book): Promise<Book> {
    const { title, price, author, isbn } = book;

    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
        'INSERT INTO books (title, price, author, isbn) VALUES (?, ?, ?, ?)',
        [title, price, author, isbn]
    );

    return { id: insertId, ...book };
  }

// }
~~~

Perceba que recebemos um objeto do tipo Book como parâmetro e usamos essa informação para salvar os valores no banco.

Podemos usar o código abaixo para ler valores e cadastrar um livro através do método create do nosso modelo.

~~~ts
// ./main.ts

import readline from 'readline-sync';

import BookModel, { Book } from './models/Book';

const main = async () => {
  const bookModel = new BookModel();

  const title = readline.question('Digite o título do livro: ');
  const price = readline.questionFloat('Digite o preço do livro: ');
  const author = readline.question('Digite o autor do livro: ');
  const isbn = readline.question('Digite o isbn do livro: ');

  const newBook: Book = { title, price, author, isbn };

  const createdBook = await bookModel.create(newBook);
  console.log(createdBook);
};

main();
~~~


