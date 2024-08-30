import { Router } from 'express';
import { ProductRoutes } from '../modules/products/product.route';
import { CategoryRoutes } from '../modules/category/category.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
