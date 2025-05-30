'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import Link from "next/link"

export default function Tour() {

    const location = [
    { title: "Blue Mountains", image: "/images/blue.webp" },
    { title: "Bondi Beach", image: "/images/bondi.jpg" },
    { title: "Fraser Island", image: "/images/gari.jpg" },
    { title: "Kakadu National Park", image: "/images/kangaroo.webp" },
    { title: "Melbourne CBD & Laneways", image: "/images/melbourne.jpg" },
    { title: "Blue Mountains National Park", image: "/images/mountains.jpg" },
    { title: "Great Ocean Road", image: "/images/road.jpg" },
    { title: "Great Barrier Reef", image: "/images/sanho.webp" },
    { title: "Sydney", image: "/images/sydney.jpg" },
    { title: "Tasmania", image: "/images/tasma.jpg" },
    { title: "Uluru", image: "/images/uluru.jpg" }
    ]

    const typetour = [
        { name: "Gia đình", img: 'https://images.blacktomato.com/2023/12/family-trips.jpg?auto=compress%2Cformat&fit=crop&h=1460&ixlib=php-3.3.1&q=82&w=978&s=4e42aa070091021bce69221672db87b7' },
        { name: "Cặp đôi", img: 'https://images.blacktomato.com/2023/12/couples-trips.jpg?auto=compress%2Cformat&fit=crop&h=1460&ixlib=php-3.3.1&q=82&w=978&s=a93f0a42d30f30a6d69227f2bc6586dc' },
        { name: "Hội nhóm", img: 'https://images.blacktomato.com/2023/12/group-trips.jpg?auto=compress%2Cformat&fit=crop&h=1460&ixlib=php-3.3.1&q=82&w=978&s=d5d5117a12586c86f40f6a7720573ce4' },
        { name: "Hôn lễ", img: 'https://images.blacktomato.com/2023/12/honeymoon-trips.jpg?auto=compress%2Cformat&fit=crop&h=1460&ixlib=php-3.3.1&q=82&w=978&s=0ec834a20be3dd47823625b82f74b42b' },
        { name: "1 Mình", img: 'https://images.blacktomato.com/2023/12/solo-trips-2.jpg?auto=compress%2Cformat&fit=crop&h=1460&ixlib=php-3.3.1&q=82&w=978&s=b1824e0575c0c83795773e3c9ad3ff55' }
    ]

    const plugin = React.useRef(
        Autoplay({
            delay: 1000,
            stopOnMouseEnter: true,
        })
    )

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

    // Animation variants for items (location and typetour)
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

    // Animation variants for tabs
    const tabsVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.4, 
                ease: "easeOut",
                delay: 0.3
            }
        },
        exit: { 
            opacity: 0, 
            y: 20, 
            transition: { 
                duration: 0.3, 
                ease: "easeIn" 
            }
        }
    }

    // Animation variants for buttons
    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { 
                duration: 0.4, 
                ease: "easeOut",
                delay: 0.5
            }
        },
        exit: { 
            opacity: 0, 
            scale: 0.8, 
            transition: { 
                duration: 0.3, 
                ease: "easeIn" 
            }
        }
    }

    return (
        <section className="tour py-20 overflow-hidden" style={{ background: '#f9f9f9' }}>
            <div className="container mx-auto">
                <motion.div
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: false, amount: 0.5 }}
                    className="top_tour text-center"
                >
                    <h1 className='text-black font-normal text-[2.4125rem] leading-[1] tracking-[2.25px] mb-[12.75px] uppercase'>
                        Khám phá nước Úc cùng Saigon247
                    </h1>
                </motion.div>
                <div className="body_tour">
                    <Tabs defaultValue="location" className="w-full lg:gap-10 md:gap-8 gap-5">
                        <motion.div
                            variants={tabsVariants}
                            initial="hidden"
                            whileInView="visible"
                            exit="exit"
                            viewport={{ once: false, amount: 0.5 }}
                        >
                            <TabsList className="flex bg-transparent mx-auto overflow-x-auto">
                                <TabsTrigger
                                    value="location"
                                    className="relative font-light bg-transparent border-none outline-none shadow-none uppercase mr-8 p-0 text-sm text-black cursor-pointer
                                        data-[state=active]:text-[#e7247a]
                                        data-[state=active]:after:content-['']
                                        data-[state=active]:after:absolute
                                        data-[state=active]:after:bottom-0
                                        data-[state=active]:after:left-0
                                        data-[state=active]:after:h-[2px]
                                        data-[state=active]:shadow-none
                                        data-[state=active]:bg-transparent
                                        data-[state=active]:after:w-full
                                        data-[state=active]:after:bg-[#e7247a]"
                                >
                                    Các địa điểm nổi bật
                                </TabsTrigger>
                                <TabsTrigger
                                    value="typetour"
                                    className="relative font-light bg-transparent border-none outline-none shadow-none uppercase mr-8 p-0 text-sm text-black cursor-pointer
                                        data-[state=active]:text-[#e7247a]
                                        data-[state=active]:after:content-['']
                                        data-[state=active]:after:absolute
                                        data-[state=active]:after:bottom-0
                                        data-[state=active]:after:left-0
                                        data-[state=active]:after:h-[2px]
                                        data-[state=active]:shadow-none
                                        data-[state=active]:bg-transparent
                                        data-[state=active]:after:w-full
                                        data-[state=active]:after:bg-[#e7247a]"
                                >
                                    Loại Tour
                                </TabsTrigger>
                            </TabsList>
                        </motion.div>
                        <TabsContent value="location">
                            <div className="location flex flex-col">
                                <Carousel
                                    plugins={[plugin.current]}
                                    onMouseEnter={plugin.current.stop}
                                    onMouseLeave={plugin.current.reset}
                                    className="w-full max-w-full"
                                >
                                    <CarouselContent className="gap-2">
                                        {location.map((value, index) => (
                                            <CarouselItem
                                                key={index}
                                                className="basis-full md:basis-1/2 lg:basis-1/4"
                                            >
                                                <motion.div
                                                    variants={itemVariants}
                                                    initial="hidden"
                                                    whileInView="visible"
                                                    exit="exit"
                                                    viewport={{ once: false, amount: 0.3 }}
                                                    className="item-location bg-cover min-h-[500px] relative bg-center cursor-pointer rounded overflow-hidden"
                                                    style={{ backgroundImage: `url('${value.image}')` }}
                                                >
                                                    <Link href={'/tours'} className="absolute p-2.5 w-full h-full flex items-center justify-center">
                                                        <h5 className="font-bold text-xl text-white z-10">
                                                            {value.title}
                                                        </h5>
                                                        <div className="overlay absolute w-full h-full bg-black opacity-20 hover:opacity-30 transition-all" />
                                                    </Link>
                                                </motion.div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="cursor-pointer" />
                                    <CarouselNext className="cursor-pointer" />
                                </Carousel>
                                <motion.div
                                    variants={buttonVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="exit"
                                    viewport={{ once: false, amount: 0.5 }}
                                    className="flex justify-center"
                                >
                                    <Button className="hover:bg-transparent hover:text-black hover:border-black hover:border cursor-pointer transition-all mx-auto mt-10 rounded-[5px] border border-transparent duration-300">
                                        <Link href={'/tours'} >Xem thêm</Link>
                                    </Button>
                                </motion.div>
                            </div>
                        </TabsContent>
                        <TabsContent value="typetour">
                            <div className="typetour flex flex-col">
                                <div className="w-full max-w-full grid grid-cols-1 lg:grid-cols-5 gap-4">
                                    {typetour.map((value, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            initial="hidden"
                                            whileInView="visible"
                                            exit="exit"
                                            viewport={{ once: false, amount: 0.3 }}
                                            className="item-location bg-cover lg:min-h-[500px] min-h-[150px] relative bg-center cursor-pointer rounded overflow-hidden"
                                            style={{ backgroundImage: `url('${value.img}')` }}
                                        >
                                            <a className="absolute p-2.5 w-full h-full flex items-center justify-center">
                                                <h5 className="font-bold text-xl text-white z-10">
                                                    {value.name}
                                                </h5>
                                                <div className="overlay absolute w-full h-full bg-black opacity-5 hover:opacity-20 transition-all" />
                                            </a>
                                        </motion.div>
                                    ))}
                                </div>
                                <motion.div
                                    variants={buttonVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="exit"
                                    viewport={{ once: false, amount: 0.5 }}
                                    className="flex justify-center"
                                >
                                    <Button className="hover:bg-transparent hover:text-black hover:border-black hover:border cursor-pointer transition-all mx-auto mt-10 rounded-[5px] border border-transparent duration-300">
                                        <Link href={'/tours'} >Xem thêm</Link>
                                    </Button>
                                </motion.div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </section>
    )
}
