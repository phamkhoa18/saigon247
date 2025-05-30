'use client'

import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { motion, useInView } from "framer-motion"

export default function About() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: false }) // khi scroll ra thì hiện, scroll đi thì ẩn

    return (
        <section
            className="about py-20 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url("https://images.blacktomato.com/2022/08/Text-Centered-Home.jpg?auto=compress,format&ixlib=php-3.3.1&q=82")`,
            }}
        >
            <div className="container mx-auto flex items-center justify-center">
                <motion.div
                    ref={ref}
                    className='max-w-[800px] text-center'
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <h1 className='text-center font-bold text-black text-[1.125rem] leading-[1.28] tracking-[1.8px] mb-4 uppercase'>
                        Saigon247 – Chuyên Tour Úc Cho Người Việt
                    </h1>
                    <p className='leading-7 mb-4 text-justify' style={{ color: '#52575c' }}>
                        Là người Việt sinh sống và làm việc tại Melbourne, <strong>Saigon247</strong> mang đến trải nghiệm du lịch Úc trọn vẹn – từ các tour tham quan hấp dẫn như Great Ocean Road, Phillip Island đến dịch vụ hỗ trợ visa, đón tiễn sân bay và thuê xe riêng.
                        Với sự thấu hiểu cộng đồng, hướng dẫn viên song ngữ và sự tận tâm trong từng hành trình, chúng tôi không chỉ đồng hành cùng bạn – mà còn giúp bạn tạo nên những kỷ niệm không thể nào quên tại xứ sở chuột túi.
                    </p>
                    <Button className="hover:bg-transparent hover:text-black hover:border-black hover:border-1 cursor-pointer transition-all mx-auto rounded-[5px] border-1 border-transparent duration-300">
                        Xem thêm
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
