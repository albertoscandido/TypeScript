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
