import mongoose from 'mongoose';

export interface IPost {
  _id: string ,
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author: mongoose.Types.ObjectId;
  categories?: {
  _id: mongoose.Types.ObjectId;
  name: string;
}[]; // ✅ Mảng động, nhiều phần tử được
  tags?: string[];
  featuredImage?: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  viewsCount: number;
  commentsCount: number;
}