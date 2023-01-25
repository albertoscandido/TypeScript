import { Pool } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute(
      'SELECT orders.id id, orders.user_id userId, JSON_ARRAYAGG(products.id) productsIds FROM Trybesmith.orders orders ' +
      'INNER JOIN Trybesmith.products products ' +
      'ON orders.id = products.order_id ' +
      'GROUP BY orders.id '
    );
    const [rows] = result;
    return rows as Order[];
  }
}