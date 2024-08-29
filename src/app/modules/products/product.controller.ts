import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { productServices } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const product = req.body;
  const data = await productServices.createProductIntoDB(product);

  sendResponse(res, {
    data,
    statusCode: httpStatus.CREATED,
    message: 'Successfully created a product.',
  });
});

export const productControllers = {
  createProduct,
};
