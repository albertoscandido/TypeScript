import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

const userController = new UserController();

const usersSlashId = '/users/:id';

router.post('/users', userController.create);

export default router;