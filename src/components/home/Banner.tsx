'use client';
import React, { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Header() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Đảm bảo play() không bị reject do browser policy
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Video play bị chặn:', error);
        });
      }
    }
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const subTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2, ease: 'easeOut' } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.4, ease: 'easeOut' } },
  };

  return (
    <section className="video_banner h-[100vh] overflow-hidden bg-cover relative">
      <div className="video">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.blacktomato.com/2024/04/Website-Homepage-V9.00_00_00_00.Still002.jpg"
        >
          <source
            src="https://black-tomato.s3.eu-west-2.amazonaws.com/2025/02/black-tomato-homepage.mp4"
            type="video/mp4"
          />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      </div>

      <div className="absolute inset-0 bg-black/30 z-[1]"></div>

      <div className="box-home absolute w-full h-full">
        <div className="container mx-auto w-full h-full flex items-center justify-center">
          <div className="text-home flex flex-col w-full items-center z-10">
            <motion.h1
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="text-white text-2xl lg:text-4xl text-center font-bold tracking-tight uppercase mb-4"
            >
              Hành Trình Đến Xứ Sở Chuột Túi
            </motion.h1>
            <motion.p
              variants={subTextVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="text-white text-lg lg:text-xl mb-8 text-center max-w-xl"
            >
              Cùng Saigon247 Travel khám phá vẻ đẹp ngoạn mục của Úc, từ rạn san hô Great Barrier Reef đến sa
              mạc đỏ Uluru.
            </motion.p>
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <Button
                asChild
                variant="outline"
                className="border-white w-fit cursor-pointer bg-transparent text-white hover:bg-white hover:text-black mx-auto"
              >
                <Link href={'/tours'}>Khám phá ngay</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
