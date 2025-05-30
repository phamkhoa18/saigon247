'use client'
import React, { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'; // Updated path
import Image from "next/image";
import { motion } from 'framer-motion'
import { IPost } from '@/lib/types/ipost';
import Link from 'next/link';
export default function Testimonials() {
    const testimonials = [
        {
            quote: "Chuyến đi Úc cùng công ty du lịch thật tuyệt vời! Mọi thứ được tổ chức chuyên nghiệp, từ vé máy bay đến lịch trình tham quan.",
            author: "Lan, TP. Hồ Chí Minh"
        },
        {
            quote: "Tôi rất ấn tượng với tour Melbourne – thiên nhiên đẹp, hướng dẫn viên nhiệt tình, và lịch trình rất hợp lý.",
            author: "Minh, Hà Nội"
        },
        {
            quote: "Gia đình tôi có kỳ nghỉ đáng nhớ tại Sydney nhờ tour du lịch Úc này. Dịch vụ chu đáo và thân thiện.",
            author: "Thảo, Đà Nẵng"
        },
        {
            quote: "Tôi từng đi nhiều tour nhưng đây là lần đầu tôi cảm thấy được chăm sóc kỹ lưỡng đến vậy. Rất hài lòng!",
            author: "Tuấn, Cần Thơ"
        },
        {
            quote: "Chuyến đi Úc đúng nghĩa ‘du lịch nghỉ dưỡng’. Không bị chạy tour mà vẫn khám phá được rất nhiều điều thú vị.",
            author: "Hương, Hải Phòng"
        }
    ];

    // Animation variants for title
    const titleVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.5, 
                ease: "easeOut",
                delay: 0.2
            }
        },
        exit: { 
            opacity: 0, 
            y: 30, 
            transition: { 
                duration: 0.3, 
                ease: "easeIn" 
            }
        }
    }

    const [posts, setposts] = useState<IPost[]>([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState<string | null>(null);

    useEffect(() => {
      async function fetchposts() {
        setLoading(true);
        try {
          const res = await fetch("/api/posts?limit=4");
          const data = await res.json();
          if (data.success) {
            setposts(data.data);
            setError(null);
          } else {
            setError("Không thể tải danh sách tour");
          }
        } catch {
          setError("Lỗi kết nối đến máy chủ");
        } finally {
          setLoading(false);
        }
      }
      fetchposts();
    }, []);

    // Animation variants for items (testimonials and tour grid)
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.6, 
                ease: "easeOut" 
            }
        },
        exit: { 
            opacity: 0, 
            y: 50, 
            transition: { 
                duration: 0.4, 
                ease: "easeIn" 
            }
        }
    }

    return (
        <>
            <section 
                className='testimonials py-20 overflow-hidden bg-position-[100% 0] bg-cover min-h-[320px]' 
                style={{ backgroundImage: `url('https://images.blacktomato.com/2022/08/Testimonials-x-4-on-white.jpg?auto=compress%2Cformat&ixlib=php-3.3.1&q=82&s=ee14704aec5dde3ea37ef7e37e3c2398')` }}
            >
                <div className="container mx-auto">
                    <Carousel opts={{ align: "start", slidesToScroll: 1, loop: true }}>
                        <div className="list_testimonials">
                            <CarouselContent>
                                {testimonials.map((item, index) => (
                                    <CarouselItem 
                                        key={`testimonial-${index}`} 
                                        className="basis-full md:basis-1/2 lg:basis-1/4"
                                    >
                                        <motion.div
                                            variants={itemVariants}
                                            initial="hidden"
                                            whileInView="visible"
                                            exit="exit"
                                            viewport={{ once: false, amount: 0.3 }}
                                            className="item_test max-w-[300px] text-center mx-auto"
                                        >
                                            <div className="logo flex items-center justify-center">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    width="16" 
                                                    height="16" 
                                                    fill="currentColor" 
                                                    className="bi bi-quote text-[#e7247a]" 
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z"/>
                                                </svg>
                                            </div>
                                            <div className="body_test mt-2">
                                                <p className='text-[#52575c] uppercase text-sm font-semibold'>{item.quote}</p>
                                                <p className='my-2 text-[#e7247a] font-semibold'><em>{item.author}</em></p>
                                            </div>
                                        </motion.div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </div>
                    </Carousel>
                </div>
            </section>

            <section className="australia bg-white pb-20">
                <div className="container mx-auto">
                    <motion.div
                        variants={titleVariants}
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: false, amount: 0.5 }}
                        className='mb-8'
                    >
                        <h2 className='text-black writing-vertical text-5xl alter mb-3 text-center'>Tin Tức Và Sự Kiện</h2>
                        <p className='text-black text-center'><em>Remarkable experiences to inspire the mind</em></p>
                    </motion.div>
                    <div className="list_tour grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {posts.length >0 && posts.map((item, index) => (
                            <motion.div
                                key={`news-${index}`}
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: false, amount: 0.3 }}
                                className="item-tour flex flex-col bg-white rounded-lg shadow hover:shadow-lg transition"
                            >
                              <Link href={`/post/${item.slug}`}>
                                <div className="relative w-full h-[200px] overflow-hidden rounded-t-xl">
                                    {item.featuredImage && (
                                      <Image
                                          src={item.featuredImage}
                                          alt={item.title}
                                          fill
                                          className="object-cover transition-transform duration-500 hover:scale-105"
                                      />
                                    )}
                                </div>
                                <div className="content-tour p-4">
                                    <div className='text-xs text-gray-600'>
                                   {item.updatedAt && new Date(item.updatedAt).toLocaleDateString('vi-VN', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })}
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{item.title}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-4">
                                        {item.excerpt}
                                    </p>
                                </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
