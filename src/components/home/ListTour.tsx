/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import { ITour } from '@/lib/types/itour';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ListTour() {
    const [tours, setTours] = useState<ITour[]>([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState<string | null>(null);

    useEffect(() => {
      async function fetchTours() {
        setLoading(true);
        try {
          const res = await fetch("/api/tours?limit=5");
          const data = await res.json();
          if (data.success) {
            setTours(data.data);
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
      fetchTours();
    }, []);

    // Animation variants for tour items
    const tourVariants = {
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
    };

    // Animation variants for title section
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
    };

    return (
      <section 
        className='list_tour py-20 bg-cover overflow-hidden' 
        style={{ backgroundImage: "url('https://images.blacktomato.com/2022/09/Itineraries-Home-scaled.jpg?auto=compress%2Cformat&ixlib=php-3.3.1&q=82&s=d80b073b1f2621e890172fb2462b2d13')" }}
      >
        <div className="flex lg:flex-row flex-col">
          <motion.div
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.5 }}
            className="top_listtour w-full block lg:hidden mb-3.5"
          >
            <div className="container mx-auto">
              <h2 className='text-white writing-vertical text-5xl alter mb-2 text-center'>Các Tour nổi bật</h2>
              <p className='text-white text-center'><em>Tour Úc hot hit <br /> Vừa đẹp, vừa tiết kiệm!</em></p>
            </div>
          </motion.div>
          <Carousel className="w-full">
            <div className="body_listtour w-full flex lg:flex-row flex-col px-[15px] md:px-0">
              <CarouselContent>
                <div className='lg:block hidden'>
                  <motion.div
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: false, amount: 0.5 }}
                    className="top_listtour lg:min-w-[300px] ml-[50px] lg:block w-full pr-[30px] hidden"
                  >
                    <div className="container">
                      <h2 className='text-white writing-vertical text-5xl alter mb-2'>Các Tour nổi bật</h2>
                      <p className='text-white'><em>Tour Úc hot hit <br /> Vừa đẹp, vừa tiết kiệm!</em></p>
                    </div>
                  </motion.div>
                </div>
                {tours && tours.map((tour, index) => (
                  <CarouselItem key={index} className='md:basis-1/3 lg:basis-1/5'>
                    <motion.div
                      variants={tourVariants}
                      initial="hidden"
                      whileInView="visible"
                      exit="exit"
                      viewport={{ once: false, amount: 0.3 }}
                      className="item_tour group relative bg-cover bg-posision-[50%] overflow-hidden w-full h-[460px]"
                    >
                      <img 
                        className='aspect-[1/2] w-full h-auto object-cover' 
                        src={tour.thumbnail} 
                        alt={tour.name} 
                      />
                      <div className="overimage absolute w-full h-full bg-black opacity-25 top-0 group-hover:opacity-50 transition-all duration-500 ease-in-out"></div>
                      <div className="content_tour absolute w-full h-full top-0 flex flex-col justify-between">
                        <div className="flex justify-end p-6">
                          <div 
                            className="night text-white z-20 relative text-xs font-bold text-shadow uppercase text-right w-fit" 
                            style={{ textShadow: "1px 1px 1px rgba(0,0,0,.6)" }}
                          >
                            {tour.totalDuration}
                          </div>
                        </div>
                        <div className="name_tour max-h-[70%] h-full p-6 flex justify-end flex-col z-30 text-white">
                          <Link href={`/tours/${tour.slug}`}>
                            <div className="uppercase text-xs mb-1 font-semibold">{tour.departure}</div>
                            <div className='text-base uppercase font-bold leading-[1.4] tracking-[1.5px] mb-2.5'>{tour.name}</div>
                            <div className="description mb-3 overflow-hidden max-h-0 opacity-0 translate-y-4 transition-all duration-500 ease-in-out group-hover:max-h-[300px] group-hover:opacity-100 group-hover:translate-y-0">
                              <div className="line-clamp-3 text-base leading-[1.4] my-0.5">
                                {tour.description}
                              </div>
                              <div className="price italic">
                                Giá chỉ ${tour.price}/ Khách
                              </div>
                            </div>
                          </Link>
                          <Button 
                            variant="outline" 
                            className="border-white rounded-[3px] uppercase w-fit cursor-pointer bg-transparent text-white hover:bg-white hover:text-black text-xs"
                          >
                            Xem ngay
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
                <Button 
                  variant="outline" 
                  className="border-white rounded-[3px] uppercase w-fit cursor-pointer bg-transparent text-white hover:bg-white hover:text-black text-xs mr-8"
                >
                  Xem ngay
                </Button>
              </CarouselContent>
            </div>
          </Carousel>
        </div>
      </section>
    )
}