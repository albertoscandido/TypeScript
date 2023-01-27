import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import AuthMiddleware from '../middlewares/authMiddleware';
import Validations from '../middlewares/validations';

const router = Router();

const orderController = new OrderController();

router.get('/orders', orderController.getAll);
router.post('/orders', AuthMiddleware.authentication, Validations.validateOrder, orderController.create);

export default router;