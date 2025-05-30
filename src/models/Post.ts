import mongoose, { Model, Schema } from 'mongoose';
import { IPost } from '@/lib/types/ipost';
import User from './User';
import { Category } from './Category';
const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    excerpt: { type: String, trim: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: User, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: Category }],
    tags: [{ type: String }],
    featuredImage: { type: String },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    publishedAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    viewsCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

postSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);

export default Post;
