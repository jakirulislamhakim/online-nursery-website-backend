import { model, Schema } from 'mongoose';
import { TPlant } from './product.interface';

const plantSchema = new Schema<TPlant>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
    },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Product = model<TPlant>('Product', plantSchema);
