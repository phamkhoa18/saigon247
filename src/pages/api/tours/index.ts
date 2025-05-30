import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/dbConnect';
import Tour from '@/models/Tour';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  try {
    switch (req.method) {
      case 'GET':
        const {limit} = req.query ;
        const tours = await Tour.find()
        .select('_id code name slug departure departureDates description price thumbnail totalDuration transport') // chỉ lấy các trường cần thiết
        .sort({ createdAt: -1 })
        .limit(limit ? parseInt(limit as string, 10) : 0)
        .lean();
        return res.status(200).json({ success: true, data: tours });

      case 'POST':
        const {
          code,
          name,
          description,
          totalDuration,
          availableMonths,
          departureDates,
          slug,
          transport,
          departure,
          destination,
          itinerary,
          price,
          thumbnail,
          images,
          overview,
          notes,
        } = req.body;

        // Kiểm tra trường bắt buộc
        if (!code || !name || !totalDuration || !slug || !departure || !destination || !price || !itinerary) {
          return res.status(400).json({
            success: false,
            message: 'Thiếu trường bắt buộc: code, name, totalDuration, slug, departure, destination, price hoặc itinerary',
          });
        }

        // Kiểm tra trùng code hoặc slug
        const existing = await Tour.findOne({ $or: [{ code }, { slug }] });
        if (existing) {
          return res.status(400).json({ success: false, message: 'Code hoặc Slug đã tồn tại' });
        }

        const newTour = new Tour({
          code,
          name,
          description: description || '',
          totalDuration,
          availableMonths: availableMonths || [],
          departureDates: departureDates || [],
          slug,
          transport: transport || 'Xe',
          departure,
          destination,
          itinerary,
          price,
          thumbnail: thumbnail || '',
          images: images || [],
          overview: overview || '',
          notes: notes || '',
        });

        await newTour.save();

        return res.status(201).json({ success: true, data: newTour });

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Phương thức ${req.method} không được phép`);
    }
  } catch (error) {
    console.error('Lỗi xử lý tour:', error);
    return res.status(500).json({ success: false, message: 'Lỗi server' });
  }
}
