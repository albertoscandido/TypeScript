import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import Validations from '../middlewares/validations';

const router = Router();

const loginController = new LoginController();

router.post('/login', Validations.validateLogin, loginController.getUserByUsernameAndPassword);

export default router;