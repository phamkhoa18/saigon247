'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import slugify from 'slugify';
import { toast } from 'react-hot-toast';
import { ITour } from '@/lib/types/itour';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/calendar-date-range-picker';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import ImageUploader from '@/components/cloudinaryUpload';
import TextEditor from '@/components/TextEditor';
import MultiImageUploader from '@/components/MultiImageUploader';
import Image from 'next/image';

export default function EditTour() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [formData, setFormData] = useState<Omit<ITour, 'createdAt' | 'updatedAt'>>({
    _id: '',
    code: '',
    name: '',
    description: '',
    totalDuration: '',
    departureDates: [],
    slug: '',
    transport: 'Xe',
    departure: '',
    destination: '',
    itinerary: [{ title: '', content: '' }],
    price: 0,
    thumbnail: '',
    images: [],
    overview: '',
    notes: '',
  });

  const [departureDates, setDepartureDates] = useState<Date[]>([]);
  const [customerSelectedDate, setCustomerSelectedDate] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // List of Australian cities
  const australianCities = [
    // New South Wales (NSW)
    { value: "sydney", label: "Sydney, NSW" },
    { value: "newcastle", label: "Newcastle, NSW" },
    { value: "wollongong", label: "Wollongong, NSW" },
    { value: "maitland", label: "Maitland, NSW" },
    { value: "albury", label: "Albury, NSW" },
    { value: "wagga-wagga", label: "Wagga Wagga, NSW" },
    { value: "port-macquarie", label: "Port Macquarie, NSW" },
    { value: "tamworth", label: "Tamworth, NSW" },
    { value: "orange", label: "Orange, NSW" },
    { value: "dubbo", label: "Dubbo, NSW" },
    { value: "bathurst", label: "Bathurst, NSW" },
    { value: "lismore", label: "Lismore, NSW" },
    { value: "queanbeyan", label: "Queanbeyan, NSW" },
    { value: "coffs-harbour", label: "Coffs Harbour, NSW" },
    { value: "armidale", label: "Armidale, NSW" },
    { value: "goulburn", label: "Goulburn, NSW" },
    { value: "tweed-heads", label: "Tweed Heads, NSW" },
    // Victoria (VIC)
    { value: "melbourne", label: "Melbourne, VIC" },
    { value: "geelong", label: "Geelong, VIC" },
    { value: "ballarat", label: "Ballarat, VIC" },
    { value: "bendigo", label: "Bendigo, VIC" },
    { value: "shepparton", label: "Shepparton, VIC" },
    { value: "mildura", label: "Mildura, VIC" },
    { value: "wodonga", label: "Wodonga, VIC" },
    { value: "warrnambool", label: "Warrnambool, VIC" },
    { value: "trarlagon", label: "Traralgon, VIC" },
    { value: "wangaratta", label: "Wangaratta, VIC" },
    // Queensland (QLD)
    { value: "brisbane", label: "Brisbane, QLD" },
    { value: "gold-coast", label: "Gold Coast, QLD" },
    { value: "sunshine-coast", label: "Sunshine Coast, QLD" },
    { value: "townsville", label: "Townsville, QLD" },
    { value: "cairns", label: "Cairns, QLD" },
    { value: "toowoomba", label: "Toowoomba, QLD" },
    { value: "mackay", label: "Mackay, QLD" },
    { value: "rockhampton", label: "Rockhampton, QLD" },
    { value: "bundaberg", label: "Bundaberg, QLD" },
    { value: "hervey-bay", label: "Hervey Bay, QLD" },
    { value: "gladstone", label: "Gladstone, QLD" },
    // Western Australia (WA)
    { value: "perth", label: "Perth, WA" },
    { value: "bunbury", label: "Bunbury, WA" },
    { value: "geraldton", label: "Geraldton, WA" },
    { value: "albany", label: "Albany, WA" },
    { value: "kalgoorlie", label: "Kalgoorlie, WA" },
    { value: "fremantle", label: "Fremantle, WA" },
    { value: "port-hedland", label: "Port Hedland, WA" },
    { value: "broome", label: "Broome, WA" },
    // South Australia (SA)
    { value: "adelaide", label: "Adelaide, SA" },
    { value: "mount-gambier", label: "Mount Gambier, SA" },
    { value: "whyalla", label: "Whyalla, SA" },
    { value: "murray-bridge", label: "Murray Bridge, SA" },
    { value: "port-lincoln", label: "Port Lincoln, SA" },
    { value: "port-augusta", label: "Port Augusta, SA" },
    // Tasmania (TAS)
    { value: "hobart", label: "Hobart, TAS" },
    { value: "launceston", label: "Launceston, TAS" },
    { value: "devonport", label: "Devonport, TAS" },
    { value: "burnie", label: "Burnie, TAS" },
    // Australian Capital Territory (ACT)
    { value: "canberra", label: "Canberra, ACT" },
    // Northern Territory (NT)
    { value: "darwin", label: "Darwin, NT" },
    { value: "alice-springs", label: "Alice Springs, NT" },
    { value: "palmerston", label: "Palmerston, NT" },
  ];

  // Fetch tour data by ID
  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/tours/${id}`);
        const data = await res.json();
        if (data.success) {
          setFormData(data.data);
          console.log(data.data);
          
          setDepartureDates(data.data.departureDates || []);
        } else {
          toast.error(data.message || 'Không thể tải thông tin tour!');
        }
      } catch {
        toast.error('Không thể kết nối đến server!');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTour();
    }
  }, [id]);

  // Reset customerSelectedDate when departureDates change
  useEffect(() => {
    if (!formData.departureDates || formData.departureDates.length === 0) {
      setCustomerSelectedDate('');
    }
  }, [formData.departureDates]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (value: string) => {
    setFormData({ ...formData, overview: value });
  };

  const handleEditorChangeNotes = (value: string) => {
    setFormData({ ...formData, notes: value });
  };

  const generateSlug = () => {
    const newSlug = slugify(formData.name || '', {
      lower: true,
      strict: true,
      locale: 'vi',
      trim: true,
    });
    setFormData((prev) => ({ ...prev, slug: newSlug }));
  };

  // Handle image upload success
  const handleImageUploadSuccess = (url: string) => {
    setFormData((prev) => ({ ...prev, thumbnail: url }));
  };

  const handleMultiImageUpload = (url: string[]) => {
    setFormData((prev) => ({ ...prev, images: url }));
  };

  const handleSubmit = async () => {
    // Validate
    formData.departureDates = departureDates;
    if (!formData.name.trim()) return toast.error('Tên tour không được để trống');
    if (!formData.slug.trim()) return toast.error('Slug không được để trống');
    if (!formData.price || formData.price <= 0) return toast.error('Giá tour phải lớn hơn 0');
    if (!formData.itinerary.length || formData.itinerary.some((i) => !i.title.trim() || !i.content.trim()))
      return toast.error('Vui lòng điền đầy đủ thông tin hành trình');
    if (!formData.departureDates.length) return toast.error('Vui lòng chọn khoảng ngày nhận khách');

    try {
      setLoading(true);
      const res = await fetch(`/api/tours/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          customerSelectedDate,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Cập nhật tour thành công!');
        router.push('/admin/tours');
      } else {
        toast.error(data.message || 'Có lỗi xảy ra!');
      }
    } catch {
      toast.error('Không thể kết nối đến server!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa tour</h1>
      <Card>
        <CardContent className="flex flex-col gap-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="mb-2.5" htmlFor="code">Code Tour</Label>
              <Input
                id="code"
                name="code"
                value={formData.code}
                readOnly
              />
            </div>

            <div>
              <Label className="mb-2.5" htmlFor="title">Tiêu đề</Label>
              <Input
                id="title"
                name="title"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <Label className="mb-2.5 block" htmlFor="slug">Slug (URL)</Label>
              <div className="relative">
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="slug-tu-dong-se-o-day"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-0 text-muted-foreground hover:text-primary"
                  onClick={generateSlug}
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="sr-only">Generate slug</span>
                </Button>
              </div>
            </div>

            <div>
              <Label className="mb-2.5" htmlFor="totalDuration">Tổng thời gian Tour</Label>
              <Input
                id="totalDuration"
                name="totalDuration"
                placeholder="3 Ngày 2 Đêm"
                value={formData.totalDuration}
                onChange={(e) => setFormData({ ...formData, totalDuration: e.target.value })}
              />
            </div>

            <div>
              <Label className="mb-2.5" htmlFor="price">Giá Chuyến đi</Label>
              <Input
                id="price"
                name="price"
                placeholder='$ Úc'
                type='number'
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              />
            </div>

            <div>
              <Label className="mb-2.5" htmlFor="departure">Điểm khởi hành Tour</Label>
              <Select
                value={formData.departure}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, departure: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn Khởi hành Tour" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {australianCities.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2.5" htmlFor="departure">Điểm đến Tour</Label>
              <Select
                value={formData.destination}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, destination: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn Điểm đến Tour" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {australianCities.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2.5" htmlFor="totalDuration">Thời gian đặt tour và diễn ra tour</Label>
              <DateRangePicker
                value={
                  departureDates.length > 0
                    ? { from: departureDates[0], to: departureDates[departureDates.length - 1] }
                    : undefined
                }
                onChange={setDepartureDates}
              />
            </div>

            <div>
              <Label className="mb-2.5" htmlFor="transport">Phương tiện</Label>
              <Select
                value={formData.transport}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, transport: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn Phương tiện" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Xe">Xe</SelectItem>
                    <SelectItem value="Máy bay">Máy bay</SelectItem>
                    <SelectItem value="Cả hai">Cả hai</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="mb-2.5" htmlFor="thumbnail">Hình ảnh nổi bật</Label>
            <ImageUploader onUploadSuccess={handleImageUploadSuccess} />
            {formData.thumbnail && (
              <Image src={formData.thumbnail} width={100} height={100} alt={''}></Image>
            )}
            <div className="hinhdaco">
            </div>
          </div>

          <div>
            <Label className="mb-2.5" htmlFor="featuredImage">Hình ảnh tour (Danh sách hình ảnh)</Label>
            <MultiImageUploader onUploadSuccess={handleMultiImageUpload} />
            {formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {formData.images.map((img: string, index: number) => (
                <div key={index} className="relative w-[200px] h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src={img}
                    alt={`Hình ảnh ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg top-0 h-full w-full"
                  />
                </div>
              ))}
            </div>
          )}
          </div>

          <div>
            <Label className="mb-2.5">Lịch trình Tour</Label>
            {formData.itinerary.map((item, idx) => (
              <div key={idx} className="mb-4 p-4 border rounded">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">Ngày {idx + 1}</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const newItinerary = formData.itinerary.filter((_, i) => i !== idx);
                      const reindexed = newItinerary.map((d, i) => ({ ...d, day: i + 1 }));
                      setFormData({ ...formData, itinerary: reindexed });
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Xóa
                  </button>
                </div>
                <Input
                  type="text"
                  placeholder="Tiêu đề ngày"
                  value={item.title}
                  onChange={(e) => {
                    const newItinerary = [...formData.itinerary];
                    newItinerary[idx].title = e.target.value;
                    setFormData({ ...formData, itinerary: newItinerary });
                  }}
                  className="mb-2"
                />
                <TextEditor
                  value={item.content}
                  onChange={(content) => {
                    const newItinerary = [...formData.itinerary];
                    newItinerary[idx].content = content;
                    setFormData({ ...formData, itinerary: newItinerary });
                  }}
                />
              </div>
            ))}
            <Button
              type="button"
              className="cursor-pointer"
              onClick={() => {
                setFormData({
                  ...formData,
                  itinerary: [...formData.itinerary, { title: '', content: '' }],
                });
              }}
            >
              Thêm ngày mới
            </Button>
          </div>

          <div>
            <Label className="mb-2.5" htmlFor="description">Mô tả ngắn</Label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label className="mb-2.5">Tổng quan Tour</Label>
            <TextEditor value={formData.overview} onChange={handleEditorChange} />
          </div>

          <div>
            <Label className="mb-2.5">Lưu ý Tour</Label>
            <TextEditor value={formData.notes} onChange={handleEditorChangeNotes} />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Đang cập nhật...' : 'Cập nhật bài viết'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}