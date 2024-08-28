import { Router } from 'express';

const router = Router();

const moduleRoutes = [
  // {
  //   path: '/students',
  //   route: StudentRoutes,
  // },
  // FIXME : Route
];

// router.use('/students', studentRoutes)
// router.use('/users', userRoutes)

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
