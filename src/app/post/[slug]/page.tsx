'use client'

import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import { ChevronRight, Home } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IPost } from '@/lib/types/ipost'
import { motion } from 'framer-motion'
import { ICategory } from '@/lib/types/icategory'

export default function DetailPost() {
    const { slug } = useParams() as { slug: string }

    const [posts, setposts] = useState<IPost | null>(null)
    const [loading, setLoading] = useState(true)
    const [, setError] = useState<string | null>(null)
    const [category, setcategory] = useState<ICategory[]>([])

    useEffect(() => {
    async function fetchposts() {
        setLoading(true)
        try {
        const res = await fetch(`/api/posts/${slug}`)
        const data = await res.json()
        if (data.success) {
            setposts(data.data)
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
    fetchposts();
    }, [slug])

     useEffect(() => {
        async function fetchCategories() {
          setLoading(true)
          try {
            const res = await fetch('/api/categories')
            const data = await res.json()
            if (data.success) {
              setcategory(data.data)
              setError(null)
            } else {
              setError('Không thể tải danh sách danh mục')
            }
          } catch {
            setError('Lỗi kết nối đến máy chủ')
          } finally {
            setLoading(false)
          }
        }
        fetchCategories()
      }, [])


    const LoadingPlaceholder = () => {
    const shimmerVariants = {
        animate: {
        backgroundPosition: ['-200%', '200%'],
        transition: {
            repeat: Infinity,
            duration: 2,
            ease: 'linear',
        },
        },
    };

    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex flex-col lg:flex-row gap-16"
        >
        {/* Post Placeholder */}
        <div className="lg:w-[70%] w-full space-y-6">
            <div className="flex gap-5">
            <motion.div
                variants={shimmerVariants}
                animate="animate"
                className="h-8 w-24 bg-gray-200/50 backdrop-blur-md rounded-3xl"
                style={{
                background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
                backgroundSize: '200% 100%',
                }}
            />
            <motion.div
                variants={shimmerVariants}
                animate="animate"
                className="h-6 w-20 bg-gray-200/50 backdrop-blur-md rounded"
                style={{
                background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
                backgroundSize: '200% 100%',
                }}
            />
            </div>
            <motion.div
            variants={shimmerVariants}
            animate="animate"
            className="h-10 w-3/4 bg-gray-200/50 backdrop-blur-md rounded-lg"
            style={{
                background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
                backgroundSize: '200% 100%',
            }}
            />
            <div className="space-y-3">
            {Array(3)
                .fill(0)
                .map((_, i) => (
                <motion.div
                    key={i}
                    variants={shimmerVariants}
                    animate="animate"
                    className="h-4 w-full bg-gray-200/50 backdrop-blur-md rounded"
                    style={{
                    background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
                    backgroundSize: '200% 100%',
                    }}
                />
                ))}
            </div>
            <div className="space-y-3">
            {Array(6)
                .fill(0)
                .map((_, i) => (
                <motion.div
                    key={i}
                    variants={shimmerVariants}
                    animate="animate"
                    className="h-4 w-full bg-gray-200/50 backdrop-blur-md rounded"
                    style={{
                    background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
                    backgroundSize: '200% 100%',
                    }}
                />
                ))}
            </div>
        </div>
        {/* Sidebar Placeholder */}
        <div className="lg:w-[30%] w-full space-y-6">
            <motion.div
            variants={shimmerVariants}
            animate="animate"
            className="h-6 w-1/2 bg-gray-200/50 backdrop-blur-md rounded"
            style={{
                background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
                backgroundSize: '200% 100%',
            }}
            />
            {Array(4)
            .fill(0)
            .map((_, i) => (
                <motion.div
                key={i}
                variants={shimmerVariants}
                animate="animate"
                className="h-8 w-full bg-gray-200/50 backdrop-blur-md rounded-lg"
                style={{
                    background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
                    backgroundSize: '200% 100%',
                }}
                />
            ))}
        </div>
        </motion.div>
    );
    };

    return (
      <>
        <Header></Header>
        <section className="post py-20">
            <div className="container mx-auto">

                <ul className="breadcrumb flex items-center space-x-2 text-sm text-gray-600 overflow-x-auto flex-nowrap whitespace-nowrap py-2">
                    <li className="relative pr-4 after:content-[''] after:absolute after:top-1/2 after:right-1 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:border-t after:border-l after:border-black after:rotate-135 last:after:content-none">
                    <a>
                        <Home strokeWidth={1} className="w-4 h-4 text-black" />
                    </a>
                    </li>
                    <li className="relative pr-4 after:content-[''] after:absolute after:top-1/2 after:right-1 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:border-t after:border-l after:border-black after:rotate-135 last:after:content-none">
                    <span>Tin tức và Sự kiện</span>
                    </li>
                    <li><span>{slug}</span></li>
                </ul>

                <div className="post-tour mt-4">
                    {loading ? (
                    <LoadingPlaceholder />
                        ) : ( 
                            <div className="main-post flex gap-16 flex-col lg:flex-row">
                                    <div className="lg:w-[70%] w-full">
                                        <div className="post-tour">
                                            <div className="flex gap-5 text-sm mb-4">
                                                <div className="bg-[#C0E7FD] rounded-3xl">
                                                    <span className="px-2.5 py-4 text-blue-600">{posts?.categories && posts.categories.length > 0 && posts.categories[0].name}</span>
                                                </div>
                                                <span className="text-[#8B8B8B]">
                                                    {posts?.updatedAt && new Date(posts.updatedAt).toLocaleDateString('vi-VN', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <h3 className='font-semibold uppercase lg:text-2xl text-xl lg:mb-4 mb-2 lg:leading-10 leading-8'>{posts?.title}</h3>
                                            <div className="des text-justify">
                                                <em>
                                                    <p>{posts?.excerpt}</p>
                                                </em>
                                            </div>
                                            <div  className="mce-content-body"  dangerouslySetInnerHTML={{ __html: posts?.content || '' }} >
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:w-[30%] w-full">
                                        <div className="sidebar">
                                        <div
                                            className="font-semibold text-lg pb-3 mb-2.5"
                                            style={{ borderBottom: '1px solid #D6D6D6' }}
                                        >
                                            Chủ đề
                                        </div>
                                        <div className="list-sidebar flex-col">
                                            {category.length > 0 &&
                                            category.map((value, index) => (
                                                <div
                                                key={value._id ?? index}
                                                className="flex justify-between pb-2.5 mb-2"
                                                style={{ borderBottom: '1px solid #D6D6D6' }}
                                                >
                                                <span>{value.name}</span>
                                                <ChevronRight />
                                                </div>
                                            ))}
                                        </div>
                                        </div>
                                    </div>
                            </div>
                        )}
                </div>
            </div>
        </section>
        <Footer></Footer>
      </>
    )
}
