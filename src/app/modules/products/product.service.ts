import { TPlant } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TPlant) => {
  // check the category is exists
  // fixme

  const result = await Product.create(payload);
  return result;
};

export const productServices = {
  createProductIntoDB,
};
