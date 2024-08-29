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

const getAllProduct = catchAsync(async (req, res) => {
  const query = req.query
  const data = await productServices.getAllProductFromDB(query);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: 'Successfully retrieved  products.',
  });
});

const getSpecificProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const data = await productServices.getSpecificProductFromDB(id);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: 'Successfully retrieved  product.',
  });
});

const updateSpecificProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;

  const data = await productServices.updateSpecificProductIntoDB(
    id,
    updatedProduct,
  );

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: 'Successfully updated  product.',
  });
});

const deleteSpecificProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const data = await productServices.deleteSpecificProductFromDB(id);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: 'Successfully deleted  product.',
  });
});

export const productControllers = {
  createProduct,
  getAllProduct,
  getSpecificProduct,
  updateSpecificProduct,
  deleteSpecificProduct,
};
