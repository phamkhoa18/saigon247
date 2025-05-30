'use client'

import Header from '@/components/common/Header'
import { Button } from '@/components/ui/button'
import { Bell, ChevronLeft, ChevronRight, Clock, FolderKanban, Home, Loader2, MapPinned, Pyramid, Ticket, TicketsPlane, X } from 'lucide-react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { vi } from "date-fns/locale"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ITour } from '@/lib/types/itour'
import { Calendar } from '@/components/ui/calendar'
import { isSameDay } from "date-fns"
import Footer from '@/components/common/Footer'
import { Input } from '@/components/ui/input'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(8, "Số điện thoại không hợp lệ"),
  code: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function DetailTour() {
  const { slug } = useParams() as { slug: string }

  // useState
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [direction, setDirection] = useState(0) // 1: next, -1: prev
  const [isSticky, setIsSticky] = useState(false)
  const [tours, setTours] = useState<ITour | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [departureDates, setDepartureDates] = useState<Date[]>([])
  const [selected, setSelected] = useState<Date | undefined>()
  const [showCalendar, setShowCalendar] = useState(false)

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"info" | "form">("info");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });


  const handleTour = () => {
    if(selected == undefined) {
      toast.error("Vui lòng chọn ngày đi tour");
      return ;
    }

    setOpen(true) ;
  }

  const onSubmit = async (value: FormData) => {
    try {
      // Tạo dữ liệu gửi đi
        const arraycontent = [
          {  'username': value.name , 
             'phone': value.phone,
             'email': value.email,
             'codesale' : value.code,
             'tour': tours?.name ,
             'datego': selected
           },
        ];
        const data = {
          title: 'ĐẶT TOUR QUA WEBSITE',
          name: value.name,
          content: JSON.stringify(arraycontent),
          posision: 'tours',
        };

              
        // Gửi dữ liệu qua API
        fetch('https://saigon247.au/api/addform', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            if(data.status == '200') {
              toast.success("Đặt tour thành công! Chúng tôi sẽ liên hệ bạn sớm.");
            } else {
              toast.error("Đặt tour thất bại! Vui lòng thử lại sau.");
            }
    
          })
          .catch((error) => {
            console.error('Error:', error);
            toast.error("Đặt tour thất bại! Vui lòng thử lại sau.");
          });
      setOpen(false);
      setStep("info");
    } catch {
      toast.error("Đặt tour thất bại! Vui lòng thử lại sau.");
    }
  }

  // useRef
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchTours() {
      setLoading(true)
      try {
        const res = await fetch(`/api/tours/${slug}`)
        const data = await res.json()
        if (data.success) {
          setTours(data.data)
          const dates = data.data.departureDates.map((d: string) => new Date(d))
          setDepartureDates(dates)
          setError(null)
        } else {
          setError("Không thể tải danh sách tour")
        }
      } catch {
        setError("Lỗi kết nối đến máy chủ")
      } finally {
        setLoading(false)
      }
    }
    fetchTours()
  }, [slug])

  const disabledDates = (date: Date) => {
    return !departureDates.some((d) => isSameDay(d, date))
  }

useEffect(() => {
  const handleScroll = () => {
    if (window.innerWidth < 768 || !boxRef.current) {
      setIsSticky(false)
      return
    }

    const rect = boxRef.current.getBoundingClientRect()
    if (rect.top <= 20) {
      setIsSticky(true)
    } else {
      setIsSticky(false)
    }
  }

  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

  // Hàm điều hướng ảnh
  const handleNext = () => {
    setDirection(1)
    setPhotoIndex((photoIndex + 1) % (tours?.images?.length || 1))
  }

  const handlePrev = () => {
    setDirection(-1)
    setPhotoIndex((photoIndex + (tours?.images?.length || 1) - 1) % (tours?.images?.length || 1))
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">Thử lại</Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <AnimatePresence>
        {loading ? (
          <motion.div
              key="loading"
              variants={{
                initial: { opacity: 0, scale: 0.9 },
                animate: { 
                  opacity: 1, 
                  scale: 1,
                  transition: { duration: 0.5, ease: "easeOut" }
                },
                exit: { 
                  opacity: 0, 
                  scale: 0.9,
                  transition: { duration: 0.3, ease: "easeIn" }
                }
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
            >
              <div className="relative flex flex-col items-center">
                {/* Mirror-like loading spinner */}
                <div className="relative w-20 h-20">
                  {/* Outer rotating ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-20 h-20 border-4 border-t-blue-500/50 border-l-blue-500/50 border-blue-200/30 rounded-full"
                  />
                  {/* Inner pulsing glassmorphism circle */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-2 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20"
                  />
                  {/* Reflective glow effect */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 w-20 h-20 bg-blue-500/10 rounded-full blur-md"
                  />
                </div>
                {/* Loading text with fade-in effect */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                  className="mt-6 text-lg font-medium text-gray-800 tracking-wide"
                >
                  Đang tải dữ liệu...
                </motion.p>
              </div>
            </motion.div>
        ) : (
          <motion.section
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="detail_tour py-20"
            style={{ backgroundImage: `url('https://www.blacktomato.com/wp-content/themes/blacktomato/img/itinerary-bg.jpg')` }}
          >
            <div className="container mx-auto">
              <ul className="breadcrumb flex items-center space-x-2 text-sm text-gray-600 overflow-x-auto flex-nowrap whitespace-nowrap py-2">
                <li className="relative pr-4 after:content-[''] after:absolute after:top-1/2 after:right-1 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:border-t after:border-l after:border-black after:rotate-135 last:after:content-none">
                  <a>
                    <Home strokeWidth={1} className="w-4 h-4 text-black" />
                  </a>
                </li>
                <li className="relative pr-4 after:content-[''] after:absolute after:top-1/2 after:right-1 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:border-t after:border-l after:border-black after:rotate-135 last:after:content-none">
                  <span>Tour Du Lịch</span>
                </li>
                <li><span>{slug}</span></li>
              </ul>
              <div className="detail pt-2 lg:pt-4">
                <div className="matour flex gap-2.5 w-full mb-2">
                  <span className="flex items-center">
                    <Ticket strokeWidth={1} className="mr-1.5 font-normal w-[19px] h-[19px] lg:w-[24px] lg:h-[24px]" /> Mã tour:
                  </span>
                  <span className="font-bold">{tours?.code}</span>
                </div>

                <div className="title-tour flex flex-col lg:flex-row gap-6">
                  <div className="w-full">
                    <div className="title font-bold lg:text-3xl text-xl lg:mt-3.5 lg:mb-5 mb-3 leading-[1.5]">
                      {tours?.name}
                    </div>
                    <div className="row-1 flex flex-col lg:flex-row lg:gap-4 gap-2">
                      <div className="matour flex gap-2">
                        <span className="flex items-center">
                          <Clock strokeWidth={1} className="mr-1 font-normal w-[19px] h-[19px] lg:w-[24px] lg:h-[24px]" /> Thời gian:
                        </span>
                        <span className="font-semibold">{tours?.totalDuration}</span>
                      </div>
                      <div className="khoihanh flex gap-2">
                        <span className="flex items-center">
                          <TicketsPlane strokeWidth={1} className="mr-1 font-normal w-[19px] h-[19px] lg:w-[24px] lg:h-[24px]" /> Phương tiện:
                        </span>
                        <span className="font-semibold">{tours?.transport}</span>
                      </div>
                      <div className="matour flex gap-2">
                        <span className="flex items-center">
                          <MapPinned strokeWidth={1} className="mr-1 font-normal w-[19px] h-[19px] lg:w-[24px] lg:h-[24px]" /> Khởi hành:
                        </span>
                        <span className="font-semibold">{tours?.departure}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* image gallery */}
                <div className="tours.images lg:mt-6 mt-4">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-1/2">
                      <div
                        onClick={() => {
                          setPhotoIndex(0)
                          setLightboxOpen(true)
                        }}
                        className="cursor-pointer rounded-lg overflow-hidden shadow-md relative sm:h-[416px] h-[300px]"
                      >
                        <Image
                          src={tours?.images?.[0] || '/placeholder.jpg'}
                          alt="Tour main image"
                          fill
                          className="w-full h-full object-cover"
                          priority
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-1/2 grid grid-cols-4 sm:grid-cols-2 gap-2 sm:gap-4">
                      {tours?.images?.slice(1, 5).map((image, index) => (
                        <div key={index} className="relative">
                          <div
                            className="cursor-pointer rounded-lg overflow-hidden shadow-md"
                            onClick={() => {
                              setPhotoIndex(index + 1);
                              setLightboxOpen(true);
                            }}
                          >
                            <Image
                              src={image}
                              alt={`Tour image ${index + 2}`}
                              width={150}
                              height={100}
                              className="w-full h-[80px] sm:h-[120px] lg:h-[200px] object-cover"
                              referrerPolicy="no-referrer"
                            />
                            {index === 3 && tours?.images?.length > 5 && (
                              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                                <span className="text-white text-xs sm:text-sm lg:text-lg font-semibold">
                                  +{(tours?.images?.length || 0) - 5} more
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tổng quan */}
                <div className="body-tour flex flex-col justify-between lg:flex-row mt-8 gap-4">
                  <div className="content-tour lg:w-[60%] w-full flex flex-col gap-4 lg:order-0 order-1">
                    <div>
                      <div className='flex items-center text-[1.3rem] gap-2 text-[#013879]'>
                        <FolderKanban />
                        <span className='font-bold'>Tổng quan</span>
                      </div>
                      <div className="mce-content-body" dangerouslySetInnerHTML={{ __html: tours?.overview || '' }} />
                    </div>

                    <div>
                      <div className='flex items-center text-[1.3rem] gap-2 text-[#013879]'>
                        <Pyramid />
                        <span className='font-bold'>Lịch trình tour</span>
                      </div>
                      <div className="mt-3.5">
                        <Accordion type="single" collapsible className="w-full border cursor-pointer border-gray-200 rounded-lg shadow-md">
                          {Array.isArray(tours?.itinerary) && tours?.itinerary.map((item, idx) => (
                            <AccordionItem key={idx} value={`item-${idx}`} className='px-3.5'>
                              <AccordionTrigger className="text-sm lg:text-lg font-bold cursor-pointer hover:text-primary-600 transition">
                                <div>
                                  <span className='bg-black text-white p-1.5 custom text-[.8rem] lg:text-[.9rem] mr-2.5'>Ngày {idx + 1}</span> {item.title}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pl-5 py-3 pt-0 text-base leading-relaxed">
                                <div className='mce-content-body' dangerouslySetInnerHTML={{ __html: item.content }} />
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    </div>

                    <div>
                      <div className='flex items-center text-[1.3rem] gap-2 text-[#013879]'>
                        <Bell />
                        <span className='font-bold'>Lưu ý</span>
                      </div>
                      <div className="mce-content-body" dangerouslySetInnerHTML={{ __html: tours?.notes || '' }} />
                    </div>
                  </div>
                  <div ref={boxRef} className={`price-tour lg:w-[30%] w-full transition-all duration-300 relative lg:order-1 order-0`}>
                    <div
                      className={`rounded-xl ${isSticky ? 'fixed top-[90px] z-10 bg-white lg:w-[calc(30%_-_2rem)] max-w-[400px] w-full' : ''}`}
                      style={{ boxShadow: '0 0 10px 0 hsla(0,0%,9%,.12)' }}
                    >
                      <div className="p-3 flex flex-col gap-2 px-4 h-full">
                        <span className="text-xl font-bold block">Thông tin đặt Tour</span>
                        <div className="font-bold text-[#e01600] lg:text-4xl text-2xl py-3 flex items-end gap-3">
                          <span className="text-sm font-bold block">Giá</span>
                          <span>
                            ${tours?.price}<span className="text-black text-xl font-semibold">/ Khách</span>
                          </span>
                        </div>
                        <div className="matour flex gap-2.5 w-full">
                          <span className="flex items-center">
                            <Ticket strokeWidth={1} className="mr-1.5 font-normal w-[19px] h-[19px] lg:w-[24px] lg:h-[24px]" /> Mã tour:
                          </span>
                          <span className="font-bold text-[#0b5da7]">{tours?.code}</span>
                        </div>
                        <div className="matour flex gap-2.5 w-full">
                          <span className="flex items-center">
                            <MapPinned strokeWidth={1} className="mr-1.5 font-normal w-[19px] h-[19px] lg:w-[24px] lg:h-[24px]" /> Khởi hành:
                          </span>
                          <span className="font-bold text-[#0b5da7]">{tours?.departure}</span>
                        </div>
                        <div className="matour relative flex gap-2.5 w-full">
                          <span className="flex items-center">
                            <MapPinned strokeWidth={1} className="mr-1.5 font-normal w-[19px] h-[19px] lg:w-[24px] lg:h-[24px]" /> Ngày khởi hành:
                          </span>
                          <div className="w-fit">
                            {/* Nút bấm */}
                            {!selected && (
                              <div
                                className="text-white rounded-2xl text-sm bg-[#0b5da7] cursor-pointer inline-block"
                                onClick={() => setShowCalendar(!showCalendar)}
                              >
                                <span className="font-bold px-2 text-xs py-1">Chọn ngày đi</span>
                              </div>
                            )}

                            {/* Calendar hiển thị khi showCalendar = true */}
                            {showCalendar && (
                              <div className="absolute z-50 mt-2 left-0 bg-white shadow-xl rounded-xl">
                                <Calendar
                                    mode="single"
                                    selected={selected}
                                    onSelect={(date) => {
                                      setSelected(date)
                                      setShowCalendar(false)
                                    }}
                                    disabled={disabledDates}
                                    locale={vi}
                                  />
                              </div>
                            )}

                            {/* Ngày đã chọn */}
                            {selected && (
                              <p onClick={() => setShowCalendar(!showCalendar)} className="text-white rounded-2xl text-sm font-bold bg-[#0b5da7] px-3 cursor-pointer inline-block">
                                {selected.toLocaleDateString('vi-VN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="matour flex gap-2.5 w-full">
                          <span className="flex items-center">
                            <Clock strokeWidth={1} className="mr-1.5 font-normal w-[19px] h-[19px] lg:w-[24px] lg:h-[24px]" /> Thời gian:
                          </span>
                          <span className="font-bold text-[#0b5da7]">{tours?.totalDuration}</span>
                        </div>
                        <div className="matour flex gap-2.5 w-full">
                          <span className="flex items-center">
                            <TicketsPlane strokeWidth={1} className="mr-1.5 font-normal w-[19px] h-[19px] lg:w-[24px] lg:h-[24px]" /> Phương tiện:
                          </span>
                          <span className="font-bold text-[#0b5da7]">{tours?.transport}</span>
                        </div>
                        <div className="flex gap-2 w-full pt-4">
                          <Button variant="outline" className="w-fit cursor-pointer" onClick={() => setShowCalendar(!showCalendar)}>Ngày khác</Button>
                          <div className="w-full">
                            <Button variant="destructive" className="w-full cursor-pointer" onClick={() => {handleTour()}}>Đặt ngay</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

             <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="lg:max-w-[400px] max-w-[350px] rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-[#e01600] tracking-tight">
                    {step === "info" ? "Xác nhận tour" : "Thông tin liên hệ"}
                  </DialogTitle>
                </DialogHeader>

                {step === "info" ? (
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <div className='text-sm font-bold text-black flex flex-row gap-3 italic' >
                      <strong className="text-[#0b5da7] font-bold text-sm">Mã Tour:</strong> {tours?.code}
                    </div>
                    <div className='text-sm font-bold text-black flex flex-row gap-3 italic'>
                      <strong className="text-[#0b5da7] font-bold text-sm">Tên tour:</strong> {tours?.name}
                    </div>
                    <div className='text-sm font-bold text-black flex flex-row gap-3 italic'>
                      <strong className="text-[#0b5da7] font-bold text-sm">Giá:</strong> ${tours?.price?.toLocaleString()} /Khách
                    </div>
                    <div className='text-sm font-bold text-black flex flex-row gap-3 italic'>
                      <strong className="text-[#0b5da7] font-bold text-sm">Thời gian:</strong> {tours?.totalDuration}
                    </div>
                    <div className='text-sm font-bold text-black flex flex-row gap-3 italic'>
                      <strong className="text-[#0b5da7] font-bold text-sm">Khởi hành:</strong> {tours?.departure}
                    </div>
                    <div className='text-sm font-bold text-black flex flex-row gap-3 italic'>
                      <strong className="text-[#0b5da7] font-bold text-sm">Ngày đặt:</strong> 
                      {selected && (
                        <>{selected.toLocaleDateString('vi-VN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</>
                      )}
                    </div>

                    <Button className="w-full mt-4 bg-[#e01600]" onClick={() => setStep("form")}>
                      Tiếp tục &rarr;
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-1">
                      <Input placeholder="Họ và tên *" {...register("name")} />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <Input placeholder="Email *" {...register("email")} />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <Input placeholder="Số điện thoại *" {...register("phone")} />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <Input placeholder="Mã giảm giá (nếu có)" {...register("code")} />
                    </div>

                    <DialogFooter className="flex justify-between pt-2">
                      <Button type="button" variant="outline" onClick={() => setStep("info")}>
                        ← Quay lại
                      </Button>
                      <Button type="submit" className='bg-[#e01600]' disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Đang gửi...
                          </>
                        ) : (
                          "Xác nhận đặt tour"
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                )}
              </DialogContent>
            </Dialog>

            {/* Lightbox Modal Custom */}
            <AnimatePresence initial={false} custom={direction}>
              {lightboxOpen && (
                <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                  >
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="relative w-full max-w-5xl mx-auto flex items-center justify-center bg-white rounded-2xl"
                    >
                      {/* Prev Button */}
                      {photoIndex > 0 && (
                        <button
                          onClick={handlePrev}
                          className="absolute left-4 cursor-pointer top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full p-3 z-10 shadow-lg transition"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                      )}

                      {/* AnimatePresence riêng cho ảnh */}
                      <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                          key={photoIndex}
                          custom={direction}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ type: "tween", duration: 0.4 }}
                          className="w-full flex justify-center"
                        >
                          <Image
                            src={tours?.images?.[photoIndex] || '/placeholder.jpg'}
                            alt={`Preview ${photoIndex + 1}`}
                            width={1200}
                            height={800}
                            className="rounded-xl shadow-2xl object-contain max-w-full max-h-[90vh] mx-auto block"
                            style={{ aspectRatio: '3 / 2' }}
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Next Button */}
                      {photoIndex < (tours?.images?.length || 1) - 1 && (
                        <button
                          onClick={handleNext}
                          className="absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full p-3 z-10 shadow-lg transition"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      )}

                      {/* Close Button */}
                      <button
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-4 right-4 cursor-pointer text-white bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full p-2 z-10 shadow-md transition"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </motion.div>
                  </motion.div>
                </Dialog>
              )}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>
      <Footer></Footer>
    </>
  )
}