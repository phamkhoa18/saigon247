'use client';

import Header from '@/components/common/Header';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { Check, ChevronsUpDown, Home, TicketsPlane as  Ticket, MapPinned, Clock, TicketsPlane, SlidersHorizontal, ArrowDownWideNarrow, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link'
import {ITour} from '@/lib/types/itour'
import Image from "next/image";
import Footer from '@/components/common/Footer';
export default function Tours() {
  const money = [
    { name: 'Dưới $500', value: 500 },
    { name: 'Từ $500 – $1,000', value: [500, 1000] },
    { name: 'Từ $1,000 – $2,000', value: [1000, 2000] },
    { name: 'Trên $2,000', value: 2000 },
  ];


const sortOptions = [
  { label: "Mới nhất", value: "newest" },
  { label: "Giá tăng dần", value: "price_asc" },
  { label: "Giá giảm dần", value: "price_desc" },
  { label: "Ưu đãi tốt nhất", value: "best_deal" },
];
  const tourTypes = [
    { name: 'Cao cấp' },
    { name: 'Tiêu chuẩn' },
    { name: 'Tiết kiệm' },
    { name: 'Giá tốt' },
  ];

  const carTypes = [
    { name: 'Xe' },
    { name: 'Máy bay' },
  ];

  const departurePoints = [
    { value: 'sydney', label: 'Sydney' },
    { value: 'melbourne', label: 'Melbourne' },
    { value: 'brisbane', label: 'Brisbane' },
    { value: 'perth', label: 'Perth' },
    { value: 'adelaide', label: 'Adelaide' },
    { value: 'darwin', label: 'Darwin' },
    { value: 'hobart', label: 'Hobart' },
    {value: 'all' , label: 'Tất cả'}
  ];

  const destinations = [
    { value: 'sydney', label: 'Sydney' },
    { value: 'melbourne', label: 'Melbourne' },
    { value: 'brisbane', label: 'Brisbane' },
    { value: 'perth', label: 'Perth' },
    { value: 'adelaide', label: 'Adelaide' },
    { value: 'darwin', label: 'Darwin' },
    { value: 'hobart', label: 'Hobart' },
    {value: 'all' , label: 'Tất cả'}
  ];

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [value2, setValue2] = React.useState('');
  const [width, setWidth] = useState<number>();
  const [width2, setWidth2] = useState<number>();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonRef2 = useRef<HTMLButtonElement>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showFilter2, setShowFilter2] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const [activeMoneyIndex, setActiveMoneyIndex] = useState<number | null>(null);
  const [activeTourTypeIndex, setActiveTourTypeIndex] = useState<number | null>(null);
  const [activeCarTypeIndex, setActiveCarTypeIndex] = useState<number | null>(null);

  const [tours, setTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

const [isAtBottom, setIsAtBottom] = useState(false)

useEffect(() => {
  const footerEl = document.querySelector('footer') // hoặc class tương ứng

  const handleScroll = () => {
    if (!boxRef.current || !footerEl) return

    const boxRect = boxRef.current.getBoundingClientRect()
    const footerRect = footerEl.getBoundingClientRect()
    const boxHeight = boxRef.current.offsetHeight

    // Khi scroll qua top
    if (boxRect.top <= 20) {
      setIsSticky(true)
    } else {
      setIsSticky(false)
    }

    console.log(footerRect);
    

    // Khi filter sắp chạm footer → dừng lại
    if (footerRect.top <= boxHeight + 100) {
      setIsAtBottom(true)
    } else {
      setIsAtBottom(false)
    }
  }

  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

  useEffect(() => {
    async function fetchTours() {
      setLoading(true);
      try {
        const res = await fetch("/api/tours");
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

  useEffect(() => {
    if (buttonRef.current) {
      setWidth(buttonRef.current.offsetWidth);
    }
  }, [open]);

  useEffect(() => {
    if (buttonRef2.current) {
      setWidth2(buttonRef2.current.offsetWidth);
    }
  }, [open2]);

  const shimmerVariants = {
  animate: {
    backgroundPosition: ["-200% 0", "200% 0"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
  

  // shimmer loading item với Framer Motion fade animation
   const LoadingItem = () => (
  <div className="item-tour flex flex-col gap-3 lg:flex-row lg:h-[18rem] overflow-hidden border border-slate-200 rounded-xl cursor-pointer bg-white">
    <div className="thumbnail lg:w-[40%] w-full lg:h-full relative h-[180px] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded"
        variants={shimmerVariants}
        animate="animate"
        style={{ backgroundSize: "200% 100%" }}
      />
    </div>
    <div className="body-tour lg:w-[60%] w-full p-4 flex flex-col gap-3 justify-between">
      <motion.div className="bg-slate-200 rounded-md h-6 w-4/5" variants={shimmerVariants} animate="animate" style={{ backgroundSize: "200% 100%" }} />
      <div className="info flex flex-col gap-3">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex flex-col lg:flex-row gap-2">
            <motion.div className="bg-slate-200 rounded-md h-4 flex-1" variants={shimmerVariants} animate="animate" style={{ backgroundSize: "200% 100%" }} />
            <motion.div className="bg-slate-200 rounded-md h-4 flex-1" variants={shimmerVariants} animate="animate" style={{ backgroundSize: "200% 100%" }} />
          </div>
        ))}
        <motion.div className="bg-slate-200 rounded-md h-4 w-1/2" variants={shimmerVariants} animate="animate" style={{ backgroundSize: "200% 100%" }} />
      </div>
      <div className="price flex items-end justify-between">
        <motion.div className="bg-slate-200 rounded-md h-5 w-24" variants={shimmerVariants} animate="animate" style={{ backgroundSize: "200% 100%" }} />
        <motion.div className="bg-slate-200 rounded-md h-9 w-28" variants={shimmerVariants} animate="animate" style={{ backgroundSize: "200% 100%" }} />
      </div>
    </div>
  </div>
);

  return (
    <>
      <Header />
      <div className="tour py-20 pt-25">
        <div className="container mx-auto">
          <ul className="breadcrumb flex items-center space-x-2 text-sm">
            <li className="relative pr-4 after:content-[''] after:absolute after:top-1/2 after:right-1 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:border-t after:border-l after:border-black after:rotate-135 last:after:content-none">
              <a href="https://www.luavietours.com/">
                <Home  strokeWidth={1} className="w-4 h-4 text-black" />
              </a>
            </li>
            <li><span>Danh Sách Các Tour Du Lịch</span></li>
          </ul>

          <div className="main-tour flex lg:mt-8 mt-4 lg:flex-row flex-col gap-6">
            <div
                ref={boxRef}
                className="relative transition-all duration-300 filter-tour h-fit lg:w-[25%] lg:flex hidden w-full bg-[#f8f8f8] gap-6 flex-col rounded-lg max-h-[95vh] overflow-y-auto"
              >
                <div
                  className={`rounded-xl bg-[#f8f8f8] ${
                    isSticky && !isAtBottom
                      ? 'fixed top-[80px] z-10 lg:w-[calc(25%_-_2rem)] max-w-[350px] w-full'
                      : isAtBottom
                      ? 'absolute bottom-[100px]'
                      : ''
                  }`}
                >
                     <div className="filter p-[20px]">
                      {/* Ngân sách */}
                      <div className="filter_money">
                        <div className="flex justify-between">
                          <h4 className="font-bold text-base text-gray-800 mb-3">Ngân sách</h4>
                          {activeMoneyIndex !== null && (
                            <span
                              className="text-sm font-medium text-blue-700 hover:text-blue-700 cursor-pointer underline"
                              onClick={() => setActiveMoneyIndex(null)}
                            >
                              Xóa
                            </span>
                          )}
                        </div>
                        <div className="list_money flex flex-wrap gap-2 mb-3">
                          {money.map((item, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className={cn(
                                'w-[calc(50%-0.25rem)] h-8 text-sm font-semibold rounded-sm cursor-pointer transition-colors shadow-none',
                                activeMoneyIndex === index
                                  ? 'bg-blue-700 text-white border-blue-700'
                                  : 'text-gray-600 hover:text-blue-700 hover:border-blue-700 hover:bg-blue-50'
                              )}
                              onClick={() => setActiveMoneyIndex(index)}
                            >
                              {item.name}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Điểm khởi hành */}
                    <div className="filter_departure mb-3">
                      <h4 className="font-bold text-base text-gray-800 mb-3">Điểm khởi hành</h4>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            ref={buttonRef}
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className={`w-full h-10 justify-between text-base text-gray-800 rounded-sm 
                              outline-0
                              hover:border-blue-700 focus:border-blue-700 
                              hover:bg-[#daefff] focus:ring-1 focus:ring-blue-700
                              ${value ? 'bg-blue-100 border-blue-700 text-blue-700' : ''}`}
                          >
                            {value
                              ? departurePoints.find((p) => p.value === value)?.label
                              : 'Chọn điểm khởi hành'}
                            <ChevronsUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 rounded-lg shadow-lg" style={{ width }}>
                          <Command>
                            <CommandInput placeholder="Tìm thành phố..." className="h-12 text-base" />
                            <CommandList>
                              <CommandEmpty>Không tìm thấy địa điểm.</CommandEmpty>
                              <CommandGroup className="gap-2 p-3 flex flex-col">
                                {departurePoints.map((point) => (
                                  <CommandItem
                                    key={point.value}
                                    value={point.value}
                                    onSelect={(currentValue) => {
                                      setValue(currentValue === value ? '' : currentValue);
                                      setOpen(false);
                                    }}
                                    className={cn(
                                      'text-[0.9rem] py-3 px-4 cursor-pointer text-black font-bold hover:bg-[#daefff]',
                                      value === point.value ? 'text-blue-700' : 'text-black',
                                      'hover:text-black'
                                    )}
                                  >
                                    {point.label}
                                    <Check
                                      className={cn(
                                        'ml-auto h-5 w-5',
                                        value === point.value ? 'opacity-100 text-blue-700' : 'opacity-0'
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                      {/* Điểm đến */}
                      <div className="filter_departure mb-3">
                        <h4 className="font-bold text-base text-gray-800 mb-3">Điểm đến</h4>
                        <Popover open={open2} onOpenChange={setOpen2}>
                          <PopoverTrigger asChild>
                            <Button
                              ref={buttonRef2}
                              variant="outline"
                              role="combobox"
                              aria-expanded={open2}
                              className={`w-full h-10 justify-between text-base text-gray-800 rounded-sm 
                                outline-0
                              hover:border-blue-700 focus:border-blue-700 
                              hover:bg-[#daefff] focus:ring-1 focus:ring-blue-700
                              ${value2 ? 'bg-blue-100 border-blue-700 text-blue-700' : ''}`}
                            >
                              {value2
                                ? destinations.find((d) => d.value === value2)?.label
                                : 'Chọn điểm đến'}
                              <ChevronsUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 rounded-lg shadow-lg" style={{ width: width2 }}>
                            <Command>
                              <CommandInput placeholder="Tìm thành phố..." className="h-12 text-base" />
                              <CommandList>
                                <CommandEmpty>Không tìm thấy địa điểm.</CommandEmpty>
                                <CommandGroup className='gap-2 p-3 flex flex-col'>
                                  {destinations.map((destination) => (
                                    <CommandItem
                                      key={destination.value}
                                      value={destination.value}
                                      onSelect={(currentValue) => {
                                        setValue2(currentValue === value2 ? '' : currentValue);
                                        setOpen2(false);
                                      }}
                                      className={cn(
                                        'text-[0.9rem] py-3 px-4 cursor-pointer text-black font-bold hover:bg-[#daefff]',
                                        value2 === destination.value ? 'text-blue-700' : 'text-black',
                                        'hover:bg-[#daefff] hover:text-black'
                                      )}
                                    >
                                      {destination.label}
                                      <Check
                                        className={cn(
                                          'ml-auto h-5 w-5',
                                          value2 === destination.value ? 'opacity-100 text-blue-700' : 'opacity-0'
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Ngày đi */}
                      <div className="filter_departure mb-3">
                        <h4 className="font-bold text-base text-gray-800 mb-3">Ngày đi</h4>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full h-10 justify-start text-left text-base rounded-sm border-gray-200 hover:border-blue-700 focus:border-blue-700 focus:ring-1 focus:ring-blue-700',
                                !date && 'text-gray-500'
                              )}
                            >
                              {date
                                ? format(date, "EEE, dd 'tháng' M, yyyy", { locale: vi })
                                : 'Chọn ngày đi...'}
                              <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 rounded-xl shadow-lg">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              locale={vi}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              initialFocus
                              className="bg-white rounded-xl border-none"
                              classNames={{
                                months:
                                  'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                                month: 'space-y-4',
                                caption: 'flex justify-center pt-1 relative items-center',
                                caption_label: 'text-sm font-medium text-gray-800',
                                nav: 'space-x-1 flex items-center',
                                nav_button:
                                  'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-sm hover:bg-gray-100',
                                table: 'w-full border-collapse space-y-1',
                                head_row: 'flex',
                                head_cell:
                                  'text-gray-600 rounded-md w-9 font-normal text-[0.8rem]',
                                row: 'flex w-full mt-2',
                                cell:
                                  'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                                day:
                                  'h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-sm hover:bg-gray-100',
                                day_selected:
                                  'bg-blue-700 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-700 focus:text-white rounded-sm',
                                day_today: 'bg-gray-100 text-gray-900 rounded-sm',
                                day_disabled: 'text-gray-400 opacity-50',
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Dòng tour */}
                      <div className="filter_tour_type mb-3">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-base text-gray-800">Dòng tour</h4>
                          {activeTourTypeIndex !== null && (
                            <span
                              className="text-sm font-medium text-blue-700 hover:text-blue-700 cursor-pointer underline"
                              onClick={() => setActiveTourTypeIndex(null)}
                            >
                              Xóa
                            </span>
                          )}
                        </div>
                        <div className="list_tour_type flex flex-wrap gap-2 mb-3">
                          {tourTypes.map((item, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className={cn(
                                'w-[calc(50%-0.25rem)] h-8 text-sm font-semibold rounded-sm cursor-pointer transition-colors shadow-none',
                                activeTourTypeIndex === index
                                  ? 'bg-blue-700 text-white border-blue-700'
                                  : 'text-gray-600 hover:text-blue-700 hover:border-blue-700 hover:bg-blue-50'
                              )}
                              onClick={() => setActiveTourTypeIndex(index)}
                            >
                              {item.name}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Di chuyển */}
                      <div className="filter_tour_type">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-base text-gray-800">Phương tiện</h4>
                          {activeCarTypeIndex !== null && (
                            <span
                              className="text-sm font-medium text-blue-700 hover:text-blue-700 cursor-pointer underline"
                              onClick={() => setActiveCarTypeIndex(null)}
                            >
                              Xóa
                            </span>
                          )}
                        </div>
                        <div className="list_tour_type flex flex-wrap gap-2 mb-5">
                          {carTypes.map((item, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className={cn(
                                'w-[calc(50%-0.25rem)] h-8 text-sm font-semibold rounded-sm cursor-pointer transition-colors shadow-none',
                                activeCarTypeIndex === index
                                  ? 'bg-blue-700 text-white border-blue-700'
                                  : 'text-gray-600 hover:text-blue-700 hover:border-blue-700 hover:bg-blue-50'
                              )}
                              onClick={() => setActiveCarTypeIndex(index)}
                            >
                              {item.name}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full cursor-pointer bg-[#0b5da7] hover:bg-blue-600 rounded-sm h-8 text-base">
                        Áp dụng
                      </Button>
              </div>
                </div>             
            </div>

            <div className="list-tour lg:w-[calc(100%-350px)] w-full">
              {/* Tựa đề tour */}
              <div className="title-tour flex flex-col lg:flex-row justify-between items-center">
                  <h3 className='font-bold text-3xl'>Các chuyến đi nổi bật</h3>
                  <div className="sort lg:flex items-center hidden">
                      <span className='font-bold mr-4'>Sắp xếp theo: </span>
                      <Select>
                        <SelectTrigger className='w-[250px] outline-0 shadow-none'>
                          <SelectValue placeholder="Theme" className='outline-0 shadow-none' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả</SelectItem>
                          <SelectItem value="lowtohigh">Giá từ thấp đến cao</SelectItem>
                          <SelectItem value="hightolow">Giá từ cao đến thấp</SelectItem>
                          <SelectItem value="datestart">Ngày khởi hành gần nhất</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
              </div>
              {/* Danh sách tour sẽ hiển thị ở đây */}

              <div className="list-tour mt-6">
                {loading && (
                  <>
                    {/* Hiển thị 3 item loading */}
                    {[1, 2, 3].map((i) => (
                      <LoadingItem key={i} />
                    ))}
                  </>
                )}

                {error && (
                  <div className="text-red-600 font-semibold text-center">{error}</div>
                )}

                {!loading &&
                  !error &&
                  tours.map((tour) => (
                    <div
                      key={tour._id}
                      className="item-tour flex flex-col lg:flex-row lg:h-[18rem] overflow-hidden max-h-[40rem] border rounded-xl hover:shadow-lg cursor-pointer mb-6"
                    >
                      <div className="thumbnail lg:w-[40%] w-full lg:h-full relative h-[200px]">
                        <Image
                            src={tour.thumbnail}
                            alt={tour.name}
                            fill
                            className="object-cover absolute top-0 z-10"
                          />
                        <div className="tag relative z-11 flex h-full items-end">
                          <span className="bg-[#f25a29] px-4 py-1.5 w-fit h-fit m-3 rounded-sm text-sm font-bold text-white">
                            Giá tốt
                          </span>
                        </div>
                      </div>
                      <div className="body-tour lg:w-[60%] w-full lg:h-full h-[60%]">
                        <div className="p-4 w-full h-full flex flex-col gap-3 justify-between">
                          <div className="title font-bold lg:text-xl text-lg line-clamp-2">
                            <Link href={`/tours/${tour.slug}`}>{tour.name}</Link>
                          </div>
                          <div className="info flex flex-col gap-3 lg:text-[1rem] text-sm">
                            <div className="row-1 flex flex-col lg:flex-row ">
                              <div className="matour flex gap-2.5 lg:flex-1/2 w-full">
                                <span className="flex items-center">
                                  <Ticket
                                    strokeWidth={1}
                                    className="mr-1.5 font-normal w-[19px] h-[19px] lg:w-[24px] lg:h-[24px]"
                                  />{" "}
                                  Mã tour:
                                </span>
                                <span className="font-bold">{tour.code}</span>
                              </div>

                              <div className="khoihanh flex gap-2.5 lg:flex-1/2 w-full">
                                <span className="flex items-center">
                                  <MapPinned
                                    strokeWidth={1}
                                    className="mr-1.5 font-normal  w-[19px] h-[19px] lg:w-[24px] lg:h-[24px]"
                                  />{" "}
                                  Khởi hành:
                                </span>
                                <span className="font-bold text-[#0b5da7]">
                                  {tour.departure}
                                </span>
                              </div>
                            </div>

                            <div className="row-1 flex flex-col lg:flex-row ">
                              <div className="matour flex gap-2.5 lg:flex-1/2 w-full">
                                <span className="flex items-center">
                                  <Clock
                                    strokeWidth={1}
                                    className="mr-1.5 font-normal  w-[19px] h-[19px] lg:w-[24px] lg:h-[24px]"
                                  />{" "}
                                  Thời gian:
                                </span>
                                <span className="font-semibold">{tour.totalDuration}</span>
                              </div>

                              <div className="khoihanh flex gap-2.5 lg:flex-1/2 w-full">
                                <span className="flex items-center">
                                  <TicketsPlane
                                    strokeWidth={1}
                                    className="mr-1.5 font-normal  w-[19px] h-[19px] lg:w-[24px] lg:h-[24px]"
                                  />{" "}
                                  Phương tiện:
                                </span>
                                <span className="font-semibold">{tour.transport}</span>
                              </div>
                            </div>

                            <div className="matour flex w-full gap-3 items-center">
                              <span className="flex w-fit items-center">
                                <MapPinned
                                  strokeWidth={1}
                                  className="mr-1.5  w-[19px] h-[19px] lg:w-[24px] lg:h-[24px]"
                                />{" "}
                                Ngày khởi hành:
                              </span>

                              <Carousel
                                  opts={{ align: "start" }}
                                  className="flex lg:w-[60%] w-[50%] items-center gap-2"
                                >
                                  <CarouselPrevious className="relative translate-0 left-0 lg:block hidden" />

                                  <div className="flex-1 overflow-hidden">
                                    <CarouselContent>
                                      {(tour.departureDates || []).map((date, index) => (
                                        <CarouselItem
                                          key={index}
                                          className="basis-1/3 md:basis-1/3 lg:basis-1/4"
                                        >
                                          <div className="h-[30px] hover:bg-red-600 hover:text-white cursor-pointer border border-red-600 text-red-600 px-2 flex justify-center items-center rounded-sm text-xs shadow-sm backdrop-blur-sm bg-white/70">
                                            {dayjs(date).format('DD/MM')}
                                          </div>
                                        </CarouselItem>
                                      ))}
                                    </CarouselContent>
                                  </div>

                                  <CarouselNext className="relative translate-0 left-0 lg:block hidden" />
                                </Carousel>
                            </div>
                          </div>
                          <div className="price flex items-end justify-between">
                            <div>
                              <span className="text-sm font-semibold">Giá từ: </span>
                              <div className="font-bold text-[#e01600] lg:text-2xl text-xl">
                                ${tour.price} đô la Úc
                              </div>
                            </div>
                            <div>
                              <Button className="bg-[#0b5da7] rounded-sm cursor-pointer text-white">
                                Xem chi tiết
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thanh mobile fixed dưới */}
      <div className="section_filter_mobile fixed h-[6vh] min-h-[6vh] w-full max-h-[10vh] z-50 shadow-lg bg-white bottom-0 lg:hidden block">
        <div className="mx-auto flex h-full justify-between text-[#0b5da7] font-semibold">
          <div
            className="filter_1 flex w-[50%] items-center justify-center border-1"
            onClick={() => setShowFilter(true)}
          >
            <SlidersHorizontal strokeWidth={1} width={'16px'} height={'16px'} />
            <span className="ml-2 text-sm">Bộ Lọc</span>
          </div>
          <div className="filter_2 flex w-[50%] items-center justify-center border-1"
            onClick={() => setShowFilter2(true)}
          >
            <ArrowDownWideNarrow strokeWidth={1} width={'16px'} height={'16px'} />
            <span className="ml-2 text-sm">Sắp Xếp</span>
          </div>
        </div>
      </div>

      {/* Bottom Sheet - Hiệu ứng trượt từ dưới lên */}
      <AnimatePresence>
        {showFilter && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed bg-black bg-opacity-50 top-0 h-full w-full z-[99]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilter(false)}
            />

            {/* Sheet content */}
            <motion.div
              className="fixed bottom-0 left-0 w-full bg-white z-[100] rounded-t-3xl max-h-[95vh] overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {/* Header */}
              <div className="header-sheet pt-3 px-4 pb-2 border-b border-gray-300">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xl">Bộ Lọc</span>
                  <button onClick={() => setShowFilter(false)}>
                    <X />
                  </button>
                </div>
              </div>

              {/* Body filter (gắn nội dung của bạn vào đây) */}
              <div className="p-4">
                {/* TODO: Dán phần nội dung filter của bạn vào đây */}
                <div className="filter">
                {/* Ngân sách */}
                <div className="filter_money">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-base text-gray-800 mb-3">Ngân sách</h4>
                    {activeMoneyIndex !== null && (
                      <span
                        className="text-sm font-medium text-blue-700 hover:text-blue-700 cursor-pointer underline"
                        onClick={() => setActiveMoneyIndex(null)}
                      >
                        Xóa
                      </span>
                    )}
                  </div>
                  <div className="list_money flex flex-wrap gap-2 mb-3">
                    {money.map((item, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={cn(
                          'w-[calc(50%-0.25rem)] h-8 text-sm font-semibold rounded-sm cursor-pointer transition-colors shadow-none',
                          activeMoneyIndex === index
                            ? 'bg-blue-700 text-white border-blue-700'
                            : 'text-gray-600 hover:text-blue-700 hover:border-blue-700 hover:bg-blue-50'
                        )}
                        onClick={() => setActiveMoneyIndex(index)}
                      >
                        {item.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Điểm khởi hành */}
              <div className="filter_departure mb-3">
                <h4 className="font-bold text-base text-gray-800 mb-3">Điểm khởi hành</h4>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      ref={buttonRef}
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className={`w-full h-10 justify-between text-base text-gray-800 rounded-sm 
                        outline-0
                        hover:border-blue-700 focus:border-blue-700 
                        hover:bg-[#daefff] focus:ring-1 focus:ring-blue-700
                        ${value ? 'bg-blue-100 border-blue-700 text-blue-700' : ''}`}
                    >
                      {value
                        ? departurePoints.find((p) => p.value === value)?.label
                        : 'Chọn điểm khởi hành'}
                      <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 rounded-lg shadow-lg" style={{ width }}>
                    <Command>
                      <CommandInput placeholder="Tìm thành phố..." className="h-12 text-base" />
                      <CommandList>
                        <CommandEmpty>Không tìm thấy địa điểm.</CommandEmpty>
                        <CommandGroup className="gap-2 p-3 flex flex-col">
                          {departurePoints.map((point) => (
                            <CommandItem
                              key={point.value}
                              value={point.value}
                              onSelect={(currentValue) => {
                                setValue(currentValue === value ? '' : currentValue);
                                setOpen(false);
                              }}
                              className={cn(
                                'text-[0.9rem] py-3 px-4 cursor-pointer text-black font-bold hover:bg-[#daefff]',
                                value === point.value ? 'text-blue-700' : 'text-black',
                                'hover:text-black'
                              )}
                            >
                              {point.label}
                              <Check
                                className={cn(
                                  'ml-auto h-5 w-5',
                                  value === point.value ? 'opacity-100 text-blue-700' : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

                {/* Điểm đến */}
                <div className="filter_departure mb-3">
                  <h4 className="font-bold text-base text-gray-800 mb-3">Điểm đến</h4>
                  <Popover open={open2} onOpenChange={setOpen2}>
                    <PopoverTrigger asChild>
                      <Button
                        ref={buttonRef2}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open2}
                        className={`w-full h-10 justify-between text-base text-gray-800 rounded-sm 
                          outline-0
                        hover:border-blue-700 focus:border-blue-700 
                        hover:bg-[#daefff] focus:ring-1 focus:ring-blue-700
                        ${value2 ? 'bg-blue-100 border-blue-700 text-blue-700' : ''}`}
                      >
                        {value2
                          ? destinations.find((d) => d.value === value2)?.label
                          : 'Chọn điểm đến'}
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 rounded-lg shadow-lg" style={{ width: width2 }}>
                      <Command>
                        <CommandInput placeholder="Tìm thành phố..." className="h-12 text-base" />
                        <CommandList>
                          <CommandEmpty>Không tìm thấy địa điểm.</CommandEmpty>
                          <CommandGroup className='gap-2 p-3 flex flex-col'>
                            {destinations.map((destination) => (
                              <CommandItem
                                key={destination.value}
                                value={destination.value}
                                onSelect={(currentValue) => {
                                  setValue2(currentValue === value2 ? '' : currentValue);
                                  setOpen2(false);
                                }}
                                className={cn(
                                  'text-[0.9rem] py-3 px-4 cursor-pointer text-black font-bold hover:bg-[#daefff]',
                                  value2 === destination.value ? 'text-blue-700' : 'text-black',
                                  'hover:bg-[#daefff] hover:text-black'
                                )}
                              >
                                {destination.label}
                                <Check
                                  className={cn(
                                    'ml-auto h-5 w-5',
                                    value2 === destination.value ? 'opacity-100 text-blue-700' : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>


                {/* Dòng tour */}
                <div className="filter_tour_type mb-3">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-base text-gray-800">Dòng tour</h4>
                    {activeTourTypeIndex !== null && (
                      <span
                        className="text-sm font-medium text-blue-700 hover:text-blue-700 cursor-pointer underline"
                        onClick={() => setActiveTourTypeIndex(null)}
                      >
                        Xóa
                      </span>
                    )}
                  </div>
                  <div className="list_tour_type flex flex-wrap gap-2 mb-3">
                    {tourTypes.map((item, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={cn(
                          'w-[calc(50%-0.25rem)] h-8 text-sm font-semibold rounded-sm cursor-pointer transition-colors shadow-none',
                          activeTourTypeIndex === index
                            ? 'bg-blue-700 text-white border-blue-700'
                            : 'text-gray-600 hover:text-blue-700 hover:border-blue-700 hover:bg-blue-50'
                        )}
                        onClick={() => setActiveTourTypeIndex(index)}
                      >
                        {item.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Di chuyển */}
                <div className="filter_tour_type">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-base text-gray-800">Phương tiện</h4>
                    {activeCarTypeIndex !== null && (
                      <span
                        className="text-sm font-medium text-blue-700 hover:text-blue-700 cursor-pointer underline"
                        onClick={() => setActiveCarTypeIndex(null)}
                      >
                        Xóa
                      </span>
                    )}
                  </div>
                  <div className="list_tour_type flex flex-wrap gap-2 mb-5">
                    {carTypes.map((item, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={cn(
                          'w-[calc(50%-0.25rem)] h-8 text-sm font-semibold rounded-sm cursor-pointer transition-colors shadow-none',
                          activeCarTypeIndex === index
                            ? 'bg-blue-700 text-white border-blue-700'
                            : 'text-gray-600 hover:text-blue-700 hover:border-blue-700 hover:bg-blue-50'
                        )}
                        onClick={() => setActiveCarTypeIndex(index)}
                      >
                        {item.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button className="w-full cursor-pointer bg-[#0b5da7] hover:bg-blue-600 rounded-sm h-8 text-base">
                  Áp dụng
                </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sắp xếp filter */}
      <AnimatePresence>
        {showFilter2 && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed bg-black bg-opacity-50 top-0 h-full w-full z-[99]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilter2(false)}
            />

            {/* Sheet content */}
            <motion.div
              className="fixed bottom-0 left-0 w-full bg-white z-[100] rounded-t-3xl max-h-[95vh] overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {/* Header */}
              <div className="header-sheet pt-3 px-4 pb-2 border-b border-gray-300">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xl">Sắp xếp theo thứ tự</span>
                  <button onClick={() => setShowFilter2(false)}>
                    <X />
                  </button>
                </div>
              </div>

              {/* Body filter (gắn nội dung của bạn vào đây) */}
              <div className="p-4">
                {/* TODO: Dán phần nội dung filter của bạn vào đây */}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={`w-full h-10 justify-between text-base text-gray-800 rounded-sm 
                        outline-0
                        hover:border-blue-700 focus:border-blue-700 
                        hover:bg-[#daefff] focus:ring-1 focus:ring-blue-700
                        ${selected ? 'bg-blue-100 border-blue-700 text-blue-700' : ''}`}
                    >
                      {selected
                        ? sortOptions.find((opt) => opt.value === selected)?.label
                        : "Chọn cách sắp xếp"}
                      <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 rounded-lg shadow-lg w-full">
                    <div className="flex flex-col p-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          className={`flex items-center justify-between px-4 py-2 text-left text-sm font-medium rounded hover:bg-[#daefff] ${
                            selected === option.value ? "text-blue-700" : "text-black"
                          }`}
                          onClick={() => {
                            setSelected(option.value);
                            setOpen(false);
                          }}
                        >
                          {option.label}
                          {selected === option.value && (
                            <Check className="h-4 w-4 text-blue-700" />
                          )}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer></Footer>
    </>
  );
}