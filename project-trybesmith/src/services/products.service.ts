import connection from '../models/connection';
import ProductModel from '../models/product.model';
import Product from '../interfaces/product.interface';
import { BadRequestError, NotFoundError } from 'restify-errors';

const properties = ['name', 'amount'];

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  static validateProperties(product: Product): [boolean, string | null] {
    for (let i = 0; i < properties.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(product, properties[i])) {
        return [false, properties[i]];
      }
    }
    return [true, null];
  }
  
  static validateValues(product: Product): [boolean, string | null] {
    const entries = Object.entries(product);
    for (let i = 0; i < entries.length; i += 1) {
      const [property, value] = entries[i];
      if (!value) {
        return [false, property];
      }
    }
    return [true, null];
  }
  
  static validationproduct(product: Product): void | string {
    let [valid, property] = ProductService.validateProperties(product);
  
    if (!valid){
      return `O campo ${property} é obrigatório.`;
    }
    [valid, property] = ProductService.validateValues(product);
  
    if (!valid) {
      return `O campo ${property} não pode ser nulo ou vazio.`;
    }
  }

  public create(product: Product): Promise<Product> {
    const isValidProduct = ProductService.validationproduct(product);
  
    if (typeof isValidProduct === 'string') {
      throw new BadRequestError(isValidProduct);
    }

    return this.model.create(product);
  }
}