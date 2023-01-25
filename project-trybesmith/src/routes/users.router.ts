import { Router } from 'express';
import UserController from '../controllers/user.controller';
import Validations from '../middlewares/validations';

const router = Router();

const userController = new UserController();

router.post('/users', Validations.validateNewUser, userController.create);

export default router;