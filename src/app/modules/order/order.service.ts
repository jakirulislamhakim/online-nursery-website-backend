import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../products/product.model';
import { TOrder } from './order.interface';
import { Payment_Method, Payment_Status } from './order.constant';
import { Order } from './order.model';
import { orderIdGenerator } from './order.utils';
import mongoose from 'mongoose';

const createOrderIntoDB = async (payload: TOrder) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const orderItems = payload.orderItems;

    // Validate products and quantity available
    for (const item of orderItems) {
      const product = await Product.findById(item.productId).session(session);
      if (!product) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          `Product ${item?.productName} is not found`,
        );
      }

      if (product.quantity < item.quantity) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Insufficient stock for product: ${item?.productName}`,
        );
      }
    }

    // Simulate Stripe payment (throw an error for now as Stripe is unavailable)
    if (payload.paymentMethod === Payment_Method.STRIPE) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Stripe is now not available. Coming soon..',
      );
    } else {
      payload.paymentStatus = Payment_Status.PENDING;
    }

    // Generate the new order ID
    const findLastOrderId = await Order.findOne()
      .sort('-createdAt')
      .select('orderId');
    payload.orderId = orderIdGenerator(findLastOrderId?.orderId as string);

    // Create the new order
    const order = await Order.create([payload], { session });

    // Update product quantities based on the order items
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(
        item.productId,
        {
          $inc: { quantity: -item.quantity },
        },
        { session },
      );
    }

    // Commit the transaction
    await session.commitTransaction();

    return order[0];
  } catch (error) {
    // Rollback the transaction in case of an error
    await session.abortTransaction();

    if (error instanceof Error) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Order creation failed: ${error.message}`,
      );
    } else {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Order creation failed due to an unknown error',
      );
    }
  } finally {
    session.endSession();
  }
};

export const orderServices = {
  createOrderIntoDB,
};
