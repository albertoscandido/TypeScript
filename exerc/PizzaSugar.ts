import Pizza from './Pizza';

type SugarFlavors = 'Nutela' | 'Goiabada com Queijo' | 'Marshmallow';

interface PizzaSugar extends Pizza {
  flavor: SugarFlavors;
}

export default PizzaSugar;