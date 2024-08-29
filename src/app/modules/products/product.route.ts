import { Router } from 'express';
import { productControllers } from './product.controller';

const router = Router();

router.post('/', productControllers.createProduct);
router.get('/', productControllers.getAllProduct);
router.get('/:id', productControllers.getSpecificProduct);
router.patch('/:id', productControllers.updateSpecificProduct);
router.delete('/:id', productControllers.deleteSpecificProduct);

export const ProductRoutes = router;
