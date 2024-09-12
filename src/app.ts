import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFoundRoute from './app/middleware/notFoundRoute';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

// parsers
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  }),
);
app.use(cookieParser());

// application routes
app.use('/api/v1', router);

const homeRoute = async (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'online-nursery-web is running',
    data: null,
  });
};

app.get('/', homeRoute);

// global error handler
app.use(globalErrorHandler);
// not found route
app.all('*', notFoundRoute);

export default app;
