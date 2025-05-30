/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ImageUploader from '@/components/cloudinaryUpload';
import slugify from 'slugify';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TextEditor from '@/components/TextEditor';
import { toast } from 'react-hot-toast';
import { Sparkles } from 'lucide-react';
import { IPost } from '@/lib/types/ipost';
import { ICategory } from '@/lib/types/icategory';
import { IUser } from '@/lib/types/iuser';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
 const { id } = params as { id: string };

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    categories: '',
    author: '',
    status: 'draft',
  });

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<{ _id: string; name: string }[]>([]);
  const [user, setUser] = useState<{ _id: string; name: string }[]>([]);
  const [postFetched, setPostFetched] = useState<IPost | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (value: string) => {
    setFormData({ ...formData, content: value });
  };

  const handleImageUploadSuccess = (url: string) => {
    setFormData((prev) => ({ ...prev, featuredImage: url }));
  };

  const generateSlug = () => {
    const newSlug = slugify(formData.title || '', {
      lower: true,
      strict: true,
      locale: 'vi',
      trim: true,
    });
    setFormData((prev) => ({ ...prev, slug: newSlug }));
  };

  const getDataCategory = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      const simplified = data.data.map((item: ICategory) => ({
        _id: item._id,
        name: item.name,
      }));
      setCategory(simplified);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataUser = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      const simplified = data.data.map((item: IUser) => ({
        _id: item._id,
        name: item.name,
      }));
      setUser(simplified);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();
      if (data.success && data.data) {
        const post = data.data;
        setPostFetched(post);
        setFormData({
          title: post.title || '',
          slug: post.slug || '',
          excerpt: post.excerpt || '',
          content: post.content || '',
          featuredImage: post.featuredImage || '',
          categories: post.categories || '',
          author: post.author || '',
          status: post.status || 'draft',
        });
      } else {
        toast.error('Không tìm thấy bài viết');
        router.push('/admin/blogs');
      }
    } catch {
      toast.error('Lỗi khi tải bài viết');
    }
  };

  // Đồng bộ sau khi cả bài viết và danh sách user/category đã có
  useEffect(() => {
    if (postFetched && category.length > 0 && user.length > 0) {
      setFormData((prev: any) => ({
        ...prev,
        categories: postFetched.categories || '',
        author: postFetched.author || '',
      }));
    }
  }, [postFetched, category, user]);

  useEffect(() => {
    if (id) {
      fetchPost();
      getDataCategory();
      getDataUser();
    }
  }, [id]);

  const handleSubmit = async () => {
    if (!formData.title || !formData.slug || !formData.content) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        toast.success('Cập nhật bài viết thành công!');
        router.push('/admin/blogs');
      } else {
        toast.error(data.message || 'Cập nhật thất bại!');
      }
    } catch {
      toast.error('Lỗi khi gửi yêu cầu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa bài viết</h1>

      <Card>
        <CardContent className="flex flex-col gap-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="title" className='mb-2.5'>Tiêu đề</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="slug" className='mb-2.5'>Slug (URL)</Label>
              <div className="relative">
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-0 text-muted-foreground hover:text-primary"
                  onClick={generateSlug}
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="sr-only mb-2.5" >Tạo slug</span>
                </Button>
              </div>
            </div>

            <div className="w-full">
              <Label className='mb-2.5'>Chọn danh mục</Label>
              <Select
                value={formData.categories}
                onValueChange={(value) =>
                  setFormData({ ...formData, categories: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {category.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full">
              <Label className='mb-2.5'>Chọn Tác giả</Label>
              <Select
                value={formData.author}
                onValueChange={(value) =>
                  setFormData({ ...formData, author: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn tác giả" />
                </SelectTrigger>
                <SelectContent>
                  {user.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className='mb-2.5'>Trạng thái</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Nháp</SelectItem>
                  <SelectItem value="published">Công khai</SelectItem>
                  <SelectItem value="archived">Lưu trữ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="featuredImage" className='mb-2.5'>Hình ảnh nổi bật</Label>
            <ImageUploader onUploadSuccess={handleImageUploadSuccess} />
            {formData.featuredImage && (
              <p className="mt-2 text-sm text-gray-600">
                Ảnh đã chọn:{' '}
                <a
                  href={formData.featuredImage}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {formData.featuredImage}
                </a>
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="excerpt" className='mb-2.5'>Mô tả ngắn</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              rows={3}
              value={formData.excerpt}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label className='mb-2.5'>Nội dung</Label>
            <TextEditor value={formData.content} onChange={handleEditorChange} />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
