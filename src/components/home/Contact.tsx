"use client"

import React from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const subTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2, ease: 'easeOut' } },
  };
export default function Contact() {
  return (
    <section
      className="contact py-10 bg-cover"
      style={{ backgroundImage: `url('https://images.blacktomato.com/2022/09/Itineraries-Home-scaled.jpg?auto=compress%2Cformat&ixlib=php-3.3.1&q=82&s=d80b073b1f2621e890172fb2462b2d13')` }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center">

          <motion.h1 variants={textVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: false, amount: 0.3 }} className="mb-2 text-white alter lg:text-5xl text-2xl">
            Bạn đã sẵn sàng chưa ?
          </motion.h1>
          <motion.p className="text-white mb-5" variants={subTextVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: false, amount: 0.3 }} >Đặt Tour ngay để nhận ưu đãi tốt nhất</motion.p>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-white rounded-[3px] uppercase w-fit cursor-pointer bg-transparent text-white hover:bg-white hover:text-black text-xs mr-8"
              >
                Đặt Tour ngay
              </Button>
            </DialogTrigger>
            <AnimatePresence>
              <DialogContent className="w-full h-screen max-w-none max-h-none p-0 m-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="w-full h-full"
                >
                  <iframe
                    src="https://saigon247.bieumau.xyz"
                    className="w-full h-full border-0"
                    title="Saigon247 Booking"
                  />
                </motion.div>
              </DialogContent>
            </AnimatePresence>
          </Dialog>
        </div>
      </div>
    </section>
  );
}