'use client'

import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import { ChevronRight, Home } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { IPost } from '@/lib/types/ipost'
import { ICategory } from '@/lib/types/icategory'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Post() {
  const [posts, setposts] = useState<IPost[]>([])
  const [category, setcategory] = useState<ICategory[]>([])
  const [loading, setLoading] = useState(true)
  const [, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      try {
        const res = await fetch('/api/posts')
        const data = await res.json()
        if (data.success) {
          setposts(data.data)
          setError(null)
        } else {
          setError('Không thể tải danh sách bài viết')
        }
      } catch {
        setError('Lỗi kết nối đến máy chủ')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

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
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex flex-col lg:flex-row gap-8"
      >
                {/* Post List Placeholder (bên phải) */}
        <div className="lg:w-[70%] w-full space-y-6 ">
          <motion.div
            variants={shimmerVariants}
            animate="animate"
            className="h-8 w-1/3 bg-gray-200/50 backdrop-blur-md rounded-lg"
            style={{
              background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
              backgroundSize: '200% 100%',
            }}
          />
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex flex-col lg:flex-row gap-3 pb-6" style={{ borderBottom: '1px solid #D6D6D6' }}>
                <motion.div
                  variants={shimmerVariants}
                  animate="animate"
                  className="w-full lg:w-[256px] h-[196px] bg-gray-200/50 backdrop-blur-md rounded-md"
                  style={{
                    background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
                    backgroundSize: '200% 100%',
                  }}
                />
                <div className="w-full lg:w-[calc(100%-256px)] space-y-3">
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
                    className="h-6 w-3/4 bg-gray-200/50 backdrop-blur-md rounded"
                    style={{
                      background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
                      backgroundSize: '200% 100%',
                    }}
                  />
                  <div className="space-y-3">
                    {Array(4)
                      .fill(0)
                      .map((_, j) => (
                        <motion.div
                          key={j}
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
              </div>
            ))}
        </div>
        {/* Sidebar Placeholder (bên trái) */}
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
    )
  }

  return (
    <>
      <Header />
      <section className="post py-20 pt-25">
        <div className="container mx-auto">
          <ul className="breadcrumb flex items-center space-x-2 text-sm">
            <li className="relative pr-4 after:content-[''] after:absolute after:top-1/2 after:right-1 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:border-t after:border-l after:border-black after:rotate-135 last:after:content-none">
              <a href="https://www.luavietours.com/">
                <Home strokeWidth={1} className="w-4 h-4 text-black" />
              </a>
            </li>
            <li>
              <span>Tin tức và sự kiện</span>
            </li>
          </ul>

          <div className="post-tour mt-8">
            <h3 className="font-bold text-3xl mb-8">Tin tức và sự kiện</h3>

            {loading ? (
              <LoadingPlaceholder />
            ) : (
              <div className="main-post flex gap-8 flex-col lg:flex-row">
                <div className="lg:w-[70%] w-full ">
                  <div className="list-tour flex flex-col gap-3">
                    <div className="space-y-6">
                      {posts.length > 0 &&
                        posts.map((item, index) => (
                          <div
                            key={index}
                            className="flex lg:gap-5 cursor-pointer gap-3 group pb-6 flex-col lg:flex-row"
                            style={{ borderBottom: '1px solid #D6D6D6' }}
                          >
                            <div className="w-full lg:w-[256px] lg:h-[196px] overflow-hidden rounded-md">
                              <div
                                className="w-full h-full group-hover:scale-110 transition-transform duration-300 bg-cover bg-center before:content-[''] before:block before:w-full before:pt-[75.67568%]"
                                style={{
                                  backgroundImage: `url(${item.featuredImage})`,
                                }}
                              />
                            </div>
                            <div className="flex w-full lg:w-[calc(100%-256px)] flex-col justify-center">
                              <div className="flex gap-5 text-sm">
                                <div className="bg-blue-500 rounded-3xl">
                                  <span className="px-2.5 py-4 text-white">25/02/2025</span>
                                </div>
                                <span className="text-[#8B8B8B]">
                                  {item.updatedAt &&
                                    new Date(item.updatedAt).toLocaleDateString('vi-VN', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    })}
                                </span>
                              </div>
                              <h4 className="line-clamp-2 font-semibold lg:text-[1rem] text-sm lg:my-[15px] my-[10px] leading-6 lg:leading-[1.475] uppercase">
                                <Link href={'/post/' + item.slug}>{item.title}</Link>
                              </h4>
                              <div className="line-clamp-4 text-sm text-justify">{item.excerpt}</div>
                            </div>
                          </div>
                        ))}
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
      <Footer />
    </>
  )
}