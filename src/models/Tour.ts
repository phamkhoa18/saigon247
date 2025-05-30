import mongoose, { Schema } from 'mongoose';
import { ITour } from '@/lib/types/itour';
const TourSchema: Schema = new Schema<ITour>({
  code: { type: String, required: true, unique: true }, // mã tour
  name: { type: String, required: true },
  description: {type: String},
  totalDuration: { type: String, required: true }, // "3 ngày 2 đêm"
  departureDates: [{ type: Date }], // danh sách ngày khởi hành cụ thể

  slug: { type: String, required: true, unique: true },
  transport: {
    type: String,
    enum: ['Xe', 'Máy bay', 'Cả hai'],
    default: 'Xe'
  },

  departure: { type: String, required: true }, // ví dụ: "TP.HCM"
  destination: { type: String, required: true }, // ví dụ: "Đà Lạt"

  itinerary: [{
    title: { type: String, required: true },
    content: { type: String, required: true }
  }],
  price: { type: Number, required: true },
  thumbnail: {type: String},
  images: [{ type: String }], // link ảnh
  overview: { type: String }, // tổng quan tour
  notes: { type: String }, // lưu ý

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware update updatedAt
TourSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Tour || mongoose.model<ITour>('Tour', TourSchema);
