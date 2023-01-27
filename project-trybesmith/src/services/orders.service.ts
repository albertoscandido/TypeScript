import connection from '../models/connection';
import OrderModel from '../models/order.model';
import UserModel from '../models/user.model';
import Order from '../interfaces/order.interface';

export default class OrderService {
  public model: OrderModel;
  public userModel: UserModel;

  constructor() {
    this.model = new OrderModel(connection);
    this.userModel = new UserModel(connection);
  }

  public getAll(): Promise<Order[]> {
    return this.model.getAll();
  }

  public async create(username: string, password: string, productsIds: number[]): Promise<Order | null> {
    const [user,] = await this.userModel.getUserByUsernameAndPassword(username, password);
    if (!user) {
      return null;
    }
    return this.model.create(({userId: user.id, productsIds: productsIds} as unknown) as Order);
  }
}