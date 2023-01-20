# Exercícios de Sequelize com TS

## Instruções para a realização dos exercícios

Neste exercício vamos configurar o Sequelize em conjunto com a linguagem Typescript e praticar essa forma de acesso ao banco de dados.

Detalhes do projeto
Crie uma nova pasta e inicie um projeto node:

~~~ts
npm init -y
~~~

Instale as dependências de produção necessárias:

~~~ts
npm install dotenv@10.0 sequelize@6.3 express@4.17
~~~

Instale as dependências de desenvolvimento necessárias:

~~~ts
npm i -D mysql2@2.3 sequelize-cli@6.2 @types/sequelize@4.28 typescript@4.4 @types/express@4.17 @types/node@16.11 ts-node@10.4
~~~

Crie o arquivo tsconfig.json na raiz do projeto e adicione o seguinte conteúdo:

~~~ts
//tsconfig.json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./build",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
~~~
Crie o arquivo .sequelizerc na raiz do projeto e adicione o seguinte conteúdo:

~~~ts
.sequelizerc
const path = require('path');
module.exports = {
  config: path.resolve(__dirname, 'build', 'database', 'config', 'database.js'),
  'models-path': path.resolve(__dirname, 'build', 'database', 'models'),
  'seeders-path': path.resolve(__dirname, 'src', 'database', 'seeders'),
  'migrations-path': path.resolve(__dirname, 'src', 'database', 'migrations'),
};
~~~

Inicie o sequelize com o comando:
~~~ts
npx sequelize-cli init
~~~

Esse comando vai gerar as pastas build/database, src/database/migrations e src/database/seeders dentro do seu projeto.

Crie o arquivo src/database/config/database.ts e coloque todas as configurações de acesso para garantir que tem um servidor MySQL rodando em seu projeto;
src/database/config/database.ts
~~~ts
import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'books_api',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
};

export = config;
~~~
Crie o arquivo src/database/models/index.ts para gerar e exportar uma nova instância do Sequelize.
src/database/models/index.ts

~~~ts
import { Sequelize } from 'sequelize';
import * as config from '../config/database';

export default new Sequelize(config);
~~~

Adicione ao arquivo package.json os scripts que vão servir auxiliar na execução dos exercícios.

~~~ts
// package.json
{
  ...

  "scripts": {
    "db:reset": "npx -y tsc && npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all",
    "start": "ts-node src/index.ts"
  },

  ...
}
~~~
O script npm run db:reset vai apagar e gerar um novo banco de dados com as migrations e seeders que você criou. O script npm start executará o arquivo src/index.ts. Além desse scripts, você pode executar outros comandos que achar necessário para realizar os exercícios. Agora vamos lá!

### 🚀 Exercício 1
Crie uma migration chamada create-authors para criar uma tabela authors com as seguintes colunas:

Nome da coluna	Descrição
id	deve ser do tipo integer, não pode ser nula e deve ser a chave primária da tabela com auto incremento
name	deve ser do tipo string e não pode ser nulo
Obs: o método down da migration deve ser capaz de remover a tabela. Obs 2: execute o comando npm run db:reset e verifique se a tabela foi criada antes de continuar para os próximos exercícios.

### 🚀 Exercício 2
Crie uma migration chamada create-genres para criar uma tabela genres com as seguintes colunas:

Nome da coluna	Descrição
id	deve ser do tipo integer, não pode ser nula e deve ser a chave primária da tabela com auto incremento
genre	deve ser do tipo string e não pode ser nulo
Obs: o método down da migration deve ser capaz de remover a tabela. Obs 2: Execute o comando npm run db:reset e verifique se a tabela foi criada antes de continuar para os próximos exercícios.

👀 De olho na dica: Depois de terminar os três primeiros exercícios, criar seeds para as tabelas pode facilitar a resolução dos próximos exercícios.

### 🚀 Exercício 3
Crie uma migration para criar uma tabela books com as seguintes colunas:

Nome da coluna	Descrição
id	deve ser do tipo integer, não pode ser nula e deve ser a chave primária da tabela com auto incremento
title	deve ser do tipo string e não pode ser nulo
author_id	deve ser do tipo integer, não pode ser nula e deve ser chave estrangeira da tabela (seu relacionamento é feito com o campo id da tabela authors)
genre_id	deve ser do tipo integer, não pode ser nula e deve ser chave estrangeira da tabela (seu relacionamento é feito com o campo id da tabela genres)
Obs: o método down da migration deve ser capaz de remover a tabela. Obs 2: Execute o comando npm run db:reset e verifique se a tabela foi criada antes de continuar para os próximos exercícios.

### 🚀 Exercício 4
Crie o model Author com as configurações necessárias da tabela authors.

### 🚀 Exercício 5
Crie o model Book com as configurações necessárias da tabela books.

De olho na dica👀: crie o relacionamento entre as tabelas books e authors.

### 🚀 Exercício 6
Crie um arquivo src/index.ts que retorne um array de objetos com as seguintes chaves:

author: deve possuir o valor correspondente ao nome do autor;
totalBooks: deve possuir o valor correspondente ao total de livros daquele autor.
A ordem dos objetos devem ser decrescente com base no valor de totalBooks; Os nomes dos autores não devem se repetir nos objetos.

Exemplo da saída:

~~~ts
[
  {
    author: nome_do_autor1,
    totalBooks: quantidade_de_livros_do_autor1,
  },
  {
    author: nome_do_autor2,
    totalBooks: quantidade_de_livros_do_autor2,
  },
    ...
]
~~~
De olho na dica👀: Para solucionar esse exercício é interessante buscar na documentação do sequelize sobre como especificar os atributos usando o sequelize.fn para fazer agregação.