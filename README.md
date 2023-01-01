# TypeScript

A linguagem TypeScript foi desenvolvida para resolver as limitações do JavaScript, sem prejudicar sua capacidade de executar código em todas as plataformas.

<br/>

### Características

- superset de javascript;
- desenvolvido pela Microsoft em 2012;
- adotado por empresas como Google, Slack, Airbnb...;
- tipagem estática de variáveis;
- facilidade de capturar os erros no momento de transpilação
- interfaces, types, modificadores de acesso


# Tipagem

Podemos identificar as variáveis, parâmetros ou retornos de funções com um o tipo de dado utilizando a tipagem. Tipagem é a forma que utilizamos para descrever de qual tipo será o valor de um componente do nosso código. Isso proporciona uma melhor documentação do código e permite que o TypeScript valide se ele está funcionando da maneira correta.
O TS possui tipagem estática: não permite alterar o tipo após ele ser declarado e a verificação de tipo é feita em tempo de compilação. Também possui uma tipagem forte: não realiza conversões automáticas, ou seja, para fazer uma operações com dados de tipos diferentes, será necessário escrever um código de conversão para uim tipo comum.
O TS também possui inferência de tipo na declaração de variáveis, mas apresetará um erro se tentarmos alterar o valor da variável atribuindo um dado de tipo diferente do inferido inicialmente.


# Compilador

O Typescript possui um compilador chamado TSC(TypeScript Compiler) que é responsável por fazer a tradução de código TS para JS. Podemos instalar o TSC e o suporte ao TypeScript em nossa máquina via npm, e utilizarmos o comando tsc seguido do arquivo que desejamos compilar e realizar a análise de tipo.  

```shell
npm install -g typescript
```

Para executar:
```shell
tsc nomedoArquivo.ts
```

Ao executarmos o comando com um arquivo .ts, o conteúdo será compilado para outro arquivo .js. Caso o compilador encontre algum erro de sintaxe/tipagem, será apontado uma mensagem de erro no terminal e o arquivo JavaScript não será gerado. 



# Projeto TypeScript

Para um projeto ser desenvolvido em ts, é necessário termos um arquivo TSConfig. o arquivo __tsconfig.json__ carrega as configurações de compilação do código do projeto.
Uma boa prática é ter o ts como uma __devDpendency__. 

```shell
tsc --init

ou

npx tsc --init
```

Ao rodar um desses comandos em uma pasta, será criado o arquivo tsconfig.json, onde podemos configurar as principais características de comportamento do compilador:

- module: especifica o sistema de módulo a ser utilizado no código JavaScript que será gerado pelo compilador como sendo o CommonJS;
- target: define a versão do JavaScript do código compilado como ES6;
- rootDir: define a localização raiz dos arquivos do projeto;
- outDir: define a pasta onde ficará nosso código compilado;
- esModuleInterop: habilitamos essa opção para ser possível compilar módulos ES6 para módulos CommonJS;
- strict: habilitamos essa opção para ativar a verificação estrita de tipo;
- include: essa chave vai depois do objeto CompilerOptions e com ela conseguimos incluir na compilação os arquivos ou diretórios mencionados; e
- exclude: essa chave também vai depois do objeto CompilerOptions e com ela conseguimos excluir da compilação os arquivos mencionados.

# TS Playground
[TS Playground](https://www.typescriptlang.org/play) - site para escrever, compilar e executar código ts.


# Tipos e Subtipos

Em TS, todos os tipos são subtipos do tipo principal __any__ que pode representar qualquer valor.

## Tipos primitivos

- boolean 
```TypeScript
let vdd: boolean = true;
```

- number
```TypeScript
let x: number;
let y: number = 5;
```

- string
```TypeScript
let s: string;
let vazio: string = "";
let def: string = 'def';
```

- void
```TypeScript
function helloWorld(): void {
  console.log("Hello World!");
}
```

- null
```TypeScript
let nullValue = null;
```

- undefined
```TypeScript
let undefinedValue = undefined;
```

## Bônus

- Nesse [link](https://learn.microsoft.com/pt-br/training/modules/typescript-get-started/) você encontra um resumo em forma de módulos no site da microsoft que funciona como um start para quem está querendo saber o que é o TS.
- [TS in five minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- artigo sobre [compiladores](https://www.dca.fee.unicamp.br/cursos/EA876/apostila/HTML/node37.html#:~:text=Um%20compilador%20%C3%A9%20um%20programa,de%20m%C3%A1quina%20para%20um%20processador.&text=O%20programa%20em%20linguagem%20simb%C3%B3lica,de%20m%C3%A1quina%20atrav%C3%A9s%20de%20montadores.) da unicamp