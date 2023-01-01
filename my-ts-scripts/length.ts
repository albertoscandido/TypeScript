import readline from 'readline-sync';

const units = ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm'];

export function convert(value: number, base: string, target: string): number {
  const values : { [key: string]: number } = {
    'km': 1000,
    'hm': 100,
    'dam': 10,
    'm': 1,
    'dm': 0.1,
    'cm': 0.010,
    'mm': 0.001
  }
  if (base === target) return value;
  return values[base] > values[target] ? (value * (values[base] / values[target])) : (value / (values[target] / values[base]));
}

function exec() {
  // pegamos o valor a ser convertido digitado pela pessoa usuária
  const value = readline.questionFloat('Digite o valor a ser convertido: \n');

  // pedimos que a pessoa usuária escolha a unidade base
  const fromUnitChoiceIndex = readline.keyInSelect(units, 'Escolha um número para a unidade base:');

  // pedimos que a pessoa usuária escolha a unidade para conversão
  const toUnitChoiceIndex = readline.keyInSelect(units, 'Escolha um número para a conversão:');

  const toUnitChoice = units[toUnitChoiceIndex];
  const fromUnitChoice = units[fromUnitChoiceIndex];

  // Se o usuário escolher a opção 0 (cancelar), uma mensagem é impressa no terminal e usamos o return para encerrar a execução
  if (!fromUnitChoice || !toUnitChoice) {
    console.log(`Função cancelada`);
    return 0;
  }
  
  const result = convert(value, fromUnitChoice, toUnitChoice);

  // montamos a mensagem de saída
  const message = `${value}${fromUnitChoice} é igual a ${result}${toUnitChoice}`;

  // printamos a mensagem de saída no terminal
  console.log(message);
}

exec();