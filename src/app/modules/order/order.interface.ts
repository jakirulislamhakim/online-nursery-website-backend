import {  Types } from 'mongoose';
import { Order_Status, Payment_Method, Payment_Status } from './order.constant';

export type TOrderItem = {
  productId: Types.ObjectId;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
};

export type TOrder = {
  fullName: string;
  orderNumber: string;
  email: string;
  phoneNumber: string;
  city: string;
  address: string;
  paymentMethod: (typeof Payment_Method)[keyof typeof Payment_Method];
  paymentStatus: (typeof Payment_Status)[keyof typeof Payment_Status];
  orderStatus: (typeof Order_Status)[keyof typeof Order_Status];
  orderItems: TOrderItem[];
  totalPrice: number;
  shippingCost: number;
};
