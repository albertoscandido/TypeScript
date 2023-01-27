import { Pool, ResultSetHeader } from 'mysql2/promise';
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

  public async create(order: Order): Promise<Order> {
    const { userId, productsIds } = order;
    
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.orders (user_id) VALUES (?)', [userId]
    );
    
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    
    await this.connection.execute(
      `UPDATE Trybesmith.products SET order_id = ? WHERE id in (${(productsIds.map(_id => '?')).join(', ')})`,
      [insertId, ...productsIds]
    );
    
    return { id: insertId, ...order };
  }
}