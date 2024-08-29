import { Router } from 'express';
import { productControllers } from './product.controller';

const router = Router();

router.post('/', productControllers.createProduct);

export const ProductRoutes = router;
