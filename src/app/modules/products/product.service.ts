import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TPlant } from './product.interface';
import { Product } from './product.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchableFields } from './product.constant';
import { Category } from '../category/category.model';

const createProductIntoDB = async (payload: TPlant) => {
  // check category is value match with category
  const isValidCategory = await Category.findOne({
    category: payload.category,
  });
  if (!isValidCategory) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid category! Please use existing category.',
    );
  }

  const result = await Product.create(payload);
  return result;
};

const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(searchableFields)
    .filter()
    .sort();

  // Count total products matching search and filter criteria
  const totalProductsCount = await productQuery.countTotal();

  // Now apply pagination based on the query (limit and page)
  productQuery.paginate();

  const products = await productQuery.modelQuery;

  if (!products.length) {
    throw new AppError(httpStatus.NO_CONTENT, 'No products found!');
  }
  return {
    products,
    totalProductsCount,
  };
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
  const isValidCategory = await Category.findOne({
    category: payload.category,
  });
  if (!isValidCategory) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid category! Please use existing category.',
    );
  }

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
