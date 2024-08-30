import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TPlant } from './product.interface';
import { Product } from './product.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchableFields } from './product.constant';

const createProductIntoDB = async (payload: TPlant) => {
  // check the category is exists
  // fixme --> write logic for category is exists in db

  const result = await Product.create(payload);
  return result;
};

const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(searchableFields)
    .filter()
    .paginate()
    .sort();

  const result = await productQuery.modelQuery;

  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No products found!');
  }
  return result;
};

const getSpecificProductFromDB = async (id: string) => {
  const result = await Product.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'The product is not found');
  }
  return result;
};

const updateSpecificProductIntoDB = async (
  id: string,
  payload: Partial<TPlant>,
) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'The product is not found');
  }
  return result;
};

const deleteSpecificProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Deleted unsuccessful! The product is not found.',
    );
  }
  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSpecificProductFromDB,
  updateSpecificProductIntoDB,
  deleteSpecificProductFromDB,
};
