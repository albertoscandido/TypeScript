import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import Validations from '../middlewares/validations';

const router = Router();

const productController = new ProductController();

const productsSlashId = '/products/:id';

router.post('/products', Validations.validateProduct, productController.create);
router.get('/products', productController.getAll); 

export default router;