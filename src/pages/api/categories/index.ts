import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/dbConnect';
import { Category } from '@/models/Category';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  try {
    switch (req.method) {
      case 'GET':
        const categories = await Category.find({}).sort({ name: 1 }).lean();
        return res.status(200).json({ success: true, data: categories });

      case 'POST':
        const { name, slug, description, isActive } = req.body;

        if (!name || !slug) {
          return res.status(400).json({ success: false, message: 'Thiếu trường name hoặc slug' });
        }

        const exist = await Category.findOne({ slug });
        if (exist) {
          return res.status(400).json({ success: false, message: 'Slug đã tồn tại' });
        }

        const newCategory = new Category({
          name,
          slug,
          description: description || '',
          isActive: isActive !== undefined ? isActive : true,
        });

        await newCategory.save();

        return res.status(201).json({ success: true, data: newCategory });

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Phương thức ${req.method} không được phép`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Lỗi server' });
  }
}
