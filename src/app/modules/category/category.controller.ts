import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { categoryServices } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const category = req.body;
  const data = await categoryServices.createCategoryIntoDB(category);

  sendResponse(res, {
    data,
    statusCode: httpStatus.CREATED,
    message: 'Successfully created category',
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const data = await categoryServices.getAllCategoryFromDB();

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: 'Successfully retrieved categories',
  });
});

const updateSpecificCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedCategory = req.body;
  const data = await categoryServices.updateSpecificCategoryIntoDB(
    id,
    updatedCategory,
  );

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: 'Successfully updated category',
  });
});

const deletedSpecificCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await categoryServices.deletedSpecificCategoryFromDB(id);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: 'Successfully deleted the category',
  });
});

export const categoryControllers = {
  createCategory,
  getAllCategory,
  updateSpecificCategory,
  deletedSpecificCategory,
};
