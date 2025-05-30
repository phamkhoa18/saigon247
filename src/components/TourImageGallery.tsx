'use client'

import React, { useState } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import Image from 'next/image'

interface Props {
  images: string[]
}

export default function TourImageGallery({ images }: Props) {

  console.log(images)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="cursor-pointer rounded-lg overflow-hidden shadow-md"
            onClick={() => {
              setPhotoIndex(idx)
              setIsOpen(true)
            }}
          >
            <Image
              src={img}
              alt={`Tour image ${idx + 1}`}
              width={300}
              height={200}
              className="object-cover w-full h-[150px] sm:h-[200px]"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
          animationDuration={300}
        />
      )}
    </>
  )
}