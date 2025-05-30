import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import connectDB from '@/lib/dbConnect';
import { Category } from '@/models/Category';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const { id } = req.query;
  if (!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'ID không hợp lệ' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const category = await Category.findById(id).lean();
        if (!category) {
          return res.status(404).json({ success: false, message: 'Không tìm thấy category' });
        }
        return res.status(200).json({ success: true, data: category });

      case 'PUT':
        const { name, slug, description, isActive } = req.body;
        const updated = await Category.findByIdAndUpdate(
          id,
          { name, slug, description, isActive },
          { new: true, runValidators: true }
        );
        if (!updated) {
          return res.status(404).json({ success: false, message: 'Không tìm thấy category để cập nhật' });
        }
        return res.status(200).json({ success: true, data: updated });

      case 'DELETE':
        const deleted = await Category.findByIdAndDelete(id);
        if (!deleted) {
          return res.status(404).json({ success: false, message: 'Không tìm thấy category để xóa' });
        }
        return res.status(200).json({ success: true, message: 'Xóa category thành công' });

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).end(`Phương thức ${req.method} không được phép`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Lỗi server' });
  }
}
