import { Request, Response } from 'express';
import statusCodes from '../enums/statusCodes';
import OrderService from '../services/orders.service';

export default class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async(req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(statusCodes.OK).json(orders);
  }

  public create = async(req: Request, res: Response) => {
    const { username, password, productsIds } = req.body;
    const order = await this.orderService.create(username, password, productsIds);
    if (!order) return res.status(statusCodes.UNAUTHORIZED).json({message: "Invalid token"});
    return res.status(statusCodes.CREATED).json(order); 
  }
}