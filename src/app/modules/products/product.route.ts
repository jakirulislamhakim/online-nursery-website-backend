import { Router } from 'express';
import { productControllers } from './product.controller';
import validateRequest from '../../middleware/validateRequest';
import { productValidation } from './product.validation';

const router = Router();

router.post(
  '/',
  validateRequest(productValidation.productValidationSchema),
  productControllers.createProduct,
);
router.get('/', productControllers.getAllProduct);
router.get('/:id', productControllers.getSpecificProduct);
router.patch('/:id', productControllers.updateSpecificProduct);
router.delete('/:id', productControllers.deleteSpecificProduct);

export const ProductRoutes = router;
