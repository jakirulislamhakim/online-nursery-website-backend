import { z } from 'zod';
import { Plant_Categories } from './product.constant';

// Create a union type for category values
type PlantCategory = (typeof Plant_Categories)[keyof typeof Plant_Categories];

const productValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .nonempty({ message: 'Title is required and cannot be empty.' }),
    price: z.number().positive({ message: 'Price must be a positive number.' }),
    category: z.enum(
      Object.values(Plant_Categories) as [PlantCategory, ...PlantCategory[]],
      { message: 'Category must be one of the predefined values.' },
    ),
    quantity: z
      .number()
      .int({ message: 'Quantity must be an integer.' })
      .positive({ message: 'Quantity must be a positive number.' }),
    description: z
      .string()
      .nonempty({ message: 'Description is required and cannot be empty.' }),
    rating: z
      .number()
      .min(0, { message: 'Rating must be at least 0.' })
      .max(5, { message: 'Rating cannot exceed 5.' }),
    image: z.string().url({ message: 'Image must be a valid URL.' }),
  }),
});

export const productValidation = {
  productValidationSchema,
};
