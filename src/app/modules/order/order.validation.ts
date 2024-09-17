import { z } from 'zod';
import { Order_Status, Payment_Method, Payment_Status } from './order.constant';
import mongoose from 'mongoose';

// Zod schema for OrderItem
const orderItemValidationSchema = z
  .object({
    productId: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid product objectId',
      }),
    productName: z.string().min(1, { message: 'Product name cannot be empty' }),
    quantity: z
      .number()
      .int()
      .positive({ message: 'Quantity must be a positive integer' }),
    price: z.number().positive({ message: 'Price must be a positive number' }),
    totalPrice: z
      .number()
      .positive({ message: 'Total price must be a positive number' }),
  })
  .refine((data) => data.totalPrice === data.quantity * data.price, {
    message: 'Total price must equal quantity multiplied by price',
    path: ['totalPrice'], // This specifies which field the error is associated with
  });

// Zod schema for Order
const orderValidationSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: 'Full name must be at least 2 characters long' }),
    orderNumber: z.string().min(1, { message: 'Order number is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phoneNumber: z
      .string()
      .regex(/\b(\+8801[3-9]\d{8}|01[3-9]\d{8})\b/, {
        message: 'Invalid phone number format',
      }),
    city: z.string().min(1, { message: 'City is required' }),
    address: z
      .string()
      .min(5, { message: 'Address must be at least 5 characters long' }),
    paymentMethod: z.enum(
      Object.values(Payment_Method) as [string, ...string[]],
      { invalid_type_error: 'Invalid payment method' },
    ),
    paymentStatus: z.enum(
      Object.values(Payment_Status) as [string, ...string[]],
      {
        invalid_type_error: 'Invalid payment status',
      },
    ),
    orderStatus: z.enum(Object.values(Order_Status) as [string, ...string[]], {
      invalid_type_error: 'Invalid order status',
    }),
    orderItems: z
      .array(orderItemValidationSchema)
      .nonempty({ message: 'Order must contain at least one item' }),
    totalPrice: z
      .number()
      .positive({ message: 'Total price must be a positive number' }),
    shippingCost: z
      .number()
      .nonnegative({ message: 'Shipping price must be a positive number' }),
  })
  .refine(
    (data) => {
      const calculatedTotal = data.orderItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );
      return data.totalPrice === calculatedTotal + data.shippingCost;
    },
    {
      message:
        'Order total price must equal the sum of all item total prices and shipping cost',
      path: ['totalPrice'],
    },
  );

export const orderValidation = {
  orderValidationSchema,
};
