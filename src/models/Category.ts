import { Schema, model, models } from 'mongoose';
import { ICategory } from '@/lib/types/icategory';


const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Category = models.Category || model<ICategory>('Category', categorySchema);