"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Phone } from 'lucide-react';
import Link from 'next/link';
import { IMenu } from '@/lib/types/imenu';

export default function Footer() {

    const [menu, setMenu] = useState<IMenu[]>([]) ;
  const [, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);


  useEffect(() => {
    fetchMenus();
  }, []);

  async function fetchMenus() {
      setLoading(true);
      try {
        const res = await fetch("/api/menus");
        const data = await res.json();       
        if (data.success) {
          setMenu(data.data);
          setError(null);
        } else {
          setError("Không thể tải danh sách menu");
        }
      } catch {
        setError("Lỗi kết nối đến máy chủ");
      } finally {
        setLoading(false);
      }
    }

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Thông tin công ty */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold">Saigon247</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Saigon247 chuyên cung cấp các tour du lịch nội địa Úc đáng nhớ, mang đến những trải nghiệm được thiết kế riêng, khám phá vẻ đẹp thiên nhiên và văn hóa của Úc. Hãy cùng chúng tôi tạo nên những kỷ niệm khó quên!
            </p>
          </motion.div>

          {/* Liên kết nhanh */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">Liên Kết Nhanh</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              {menu.length > 0 &&
                menu.map((item, index) => (
                  <li key={index}>
                    <Link href={item.link} className="hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </motion.div>

          {/* Thông tin liên hệ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">Liên Hệ Với Chúng Tôi</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:0489 21 21 21" className="hover:text-white">
                  0489 21 21 21
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Đăng ký nhận tin */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">Đăng Ký Nhận Tin</h3>
            <p className="text-gray-300 text-sm">
              Nhận thông tin mới nhất về các tour du lịch và ưu đãi đặc biệt!
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button
                variant="outline"
                className="border-white  hover:bg-white text-black hover:text-black"
              >
                Đăng Ký
              </Button>
            </div>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5 hover:text-blue-500 transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 hover:text-pink-500 transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 hover:text-blue-400 transition-colors" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300 text-sm"
        >
          <p>&copy; 2025 Saigon247. Mọi bản quyền được bảo lưu.</p>
        </motion.div>
      </div>
    </footer>
  );
}