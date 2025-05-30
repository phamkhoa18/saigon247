'use client';

import { IMenu } from '@/lib/types/imenu';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Menu({ isOpen }: { isOpen: boolean }) {
  const items = [
    { title: 'Tháng 1' },
    { title: 'Tháng 2' },
    { title: 'Tháng 3' },
    { title: 'Tháng 4' },
    { title: 'Tháng 5' },
    { title: 'Tháng 6' },
    { title: 'Tháng 7' },
    { title: 'Tháng 8' },
    { title: 'Tháng 9' },
    { title: 'Tháng 10' },
    { title: 'Tháng 11' },
    { title: 'Tháng 12' }
  ]

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
          console.log(data);
          
          if (data.success) {
            console.log(data.data);
            
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: -60,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  const sidebarContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3, ease: 'easeIn' },
    },
  };

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const gridItemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: { duration: 0.3, ease: 'easeIn' },
    },
  };

  // Reverse items for right-to-left animation

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      exit="exit"
      className="fixed top-[70px] left-0 right-0 h-[calc(100vh-72px)] w-full bg-white text-black z-40"
    >
      <div className="container mx-auto h-full px-4">
        <div className="flex flex-col lg:flex-row h-full max-h-[calc(100vh-72px)]">
          {/* Sidebar */}
          <motion.div
            variants={sidebarContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full lg:w-[250px] p-4 overflow-y-auto menu-lg"
          >
            <ul className="space-y-3 text-base sm:text-lg">
              {menu.length > 0 && menu.map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className={`uppercase ${index === 0 ? 'text-[#e7247a] ' : 'text-gray-700'} transition-colors`}
                >
                  <Link href={item.link}>{item.name}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full lg:w-[calc(100%-250px)] h-full overflow-y-auto p-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  variants={gridItemVariants}
                  className="box-item relative group"
                >
                  <Link href="/tours" className="block w-full h-full">
                    <div className="relative w-full h-[370px] overflow-hidden shadow-lg">
                      <Image
                        src="https://images.blacktomato.com/2023/12/Months_january.jpg?auto=compress%2Cformat,webp"
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 768px) 100%, 25vw, 20vw"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 z-10 transition-all duration-300"></div>
                      <span className="absolute inset-0 flex justify-center items-center z-20 text-white text-lg sm:text-xl font-bold uppercase">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
