import { Router } from 'express';
import { orderControllers } from './order.controller';
import validateRequest from '../../middleware/validateRequest';
import { orderValidation } from './order.validation';

const router = Router();

router.post(
  '/',
  validateRequest(orderValidation.orderValidationSchema),
  orderControllers.createOrder,
);

export const OrderRoutes = router;
