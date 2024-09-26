import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (payload: TCategory) => {
  const isExistsCategory = await Category.findOne({
    category: payload.category,
  });

  if (isExistsCategory) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${payload.category} category is already exists`,
    );
  }

  const result = await Category.create(payload);
  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await Category.find().select('category _id');

  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category are not found');
  }
  return result;
};

const updateSpecificCategoryIntoDB = async (id: string, payload: TCategory) => {
  const result = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select('category _id');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'The category is not found');
  }
  return result;
};

const deletedSpecificCategoryFromDB = async (id: string) => {
  const result = await Category.findByIdAndUpdate(id, {
    isDeleted: true,
  }).select('category _id');

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Deleted unsuccessful! The category is not found',
    );
  }
  return result;
};

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  updateSpecificCategoryIntoDB,
  deletedSpecificCategoryFromDB,
};
