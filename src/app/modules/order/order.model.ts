import { Schema, model } from 'mongoose';
import { Order_Status, Payment_Method, Payment_Status } from './order.constant';
import { TOrder, TOrderItem } from './order.interface';

// Define the OrderItem schema
const orderItemSchema = new Schema<TOrderItem>({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

// Define the Order schema
const orderSchema = new Schema<TOrder>(
  {
    fullName: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: Object.values(Payment_Method),
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: Object.values(Payment_Status),
      default: Payment_Status.PENDING,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: Object.values(Order_Status),
      default: Order_Status.PENDING,
      required: true,
    },

    orderItems: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (val: TOrderItem[]): boolean => {
          return val.length > 0;
        },
        message: 'Order must have at least one item.',
      },
    },

    totalPrice: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create and export the Order model
export const Order = model<TOrder>('Order', orderSchema);
