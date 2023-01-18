import Pizza from './Pizza';

type VegetarianFlavors = 'Marguerita' | 'Palmito' | 'Cogumelos';

interface PizzaVegetarian extends Pizza {
  flavor: VegetarianFlavors;
}

export default PizzaVegetarian;