import { Router } from 'express';
import { categoryControllers } from './category.controller';
import validateRequest from '../../middleware/validateRequest';
import { categoryValidations } from './category.validation';

const router = Router();

router.post(
  '/',
  validateRequest(categoryValidations.categoryValidationSchema),
  categoryControllers.createCategory,
);
router.get('/', categoryControllers.getAllCategory);
router.patch('/:id', categoryControllers.updateSpecificCategory);
router.delete('/:id', categoryControllers.deletedSpecificCategory);

export const CategoryRoutes = router;
