import { Request, Response } from 'express';
import statusCodes from '../enums/statusCodes';
import ProductService from '../services/products.service';

export default class ProductController {
  
  constructor(private productService = new ProductService()) {}

  public create = async (req: Request, res: Response) => {
    const product = req.body;

    const bookCreated = await this.productService.create(product);
    res.status(statusCodes.CREATED).json(bookCreated);
  };
}