import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/dbConnect';
import Tour from '@/models/Tour';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const { param } = req.query;

  if (typeof param !== 'string') {
    return res.status(400).json({ success: false, message: 'Param không hợp lệ' });
  }

  try {
    let tour = null;

    // Giả sử id là ObjectId 24 ký tự hex, còn slug thì không
    const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id);

    if (isValidObjectId(param)) {
      // Nếu param là id
      tour = await Tour.findById(param);
    } else {
      // Nếu param không phải id => coi như slug
      tour = await Tour.findOne({ slug: param });
    }

    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour không tồn tại' });
    }

    switch (req.method) {
      case 'GET':
        return res.status(200).json({ success: true, data: tour });

      case 'PUT':
        const updatedTour = await Tour.findByIdAndUpdate(tour._id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedTour) {
          return res.status(404).json({ success: false, message: 'Không tìm thấy tour để cập nhật' });
        }
        return res.status(200).json({ success: true, data: updatedTour });

      case 'DELETE':
        const deletedTour = await Tour.findByIdAndDelete(tour._id);
        if (!deletedTour) {
          return res.status(404).json({ success: false, message: 'Không tìm thấy tour để xóa' });
        }
        return res.status(200).json({ success: true, message: 'Đã xóa tour thành công' });

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).end(`Phương thức ${req.method} không được hỗ trợ`);
    }
  } catch (error) {
    console.error('Lỗi xử lý tour:', error);
    return res.status(500).json({ success: false, message: 'Lỗi server' });
  }
}
