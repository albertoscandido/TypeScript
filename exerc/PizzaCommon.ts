import Pizza from './Pizza';

type CommonFlavors = 'Calabresa' | 'Frango' | 'Pepperoni';

interface PizzaCommom extends Pizza {
  flavor: CommonFlavors;
}

export default PizzaCommom;