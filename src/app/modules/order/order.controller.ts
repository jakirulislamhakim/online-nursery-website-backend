import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderServices } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const data = await orderServices.createOrderIntoDB(req.body);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: 'Successfully order yours products',
  });
});

export const orderControllers = {
  createOrder,
};
