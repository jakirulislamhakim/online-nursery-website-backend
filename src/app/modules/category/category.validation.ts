import { z } from 'zod';

const categoryValidationSchema = z.object({
  body: z.object({
    category: z.string({
      required_error: 'Category is required.',
    }),
    isDeleted: z.boolean().optional(),
  }),
});

export const categoryValidations = {
  categoryValidationSchema,
};
