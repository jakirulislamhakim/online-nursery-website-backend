import { Plant_Categories } from './product.constant';

export type TPlant = {
  title: string;
  price: number;
  category: (typeof Plant_Categories)[keyof typeof Plant_Categories]; // Plant_Categories values like an union type
  quantity: number;
  description: string;
  rating: number;
  image: string;
};
