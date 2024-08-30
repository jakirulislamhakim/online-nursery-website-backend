import { model, Query, Schema } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>(
  {
    category: {
      type: String,
      required: true,
      unique: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

categorySchema.pre(/^find/, function (next) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query = this as Query<any, any>;
  query.where({ isDeleted: false });
  next();
});

export const Category = model<TCategory>('category', categorySchema);
