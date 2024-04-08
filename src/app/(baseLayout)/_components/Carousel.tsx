"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

function Carousel({
  images,
  style,
}: {
  images: string[];
  style?: React.CSSProperties;
}) {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className=""
        style={style}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={img}
              alt="img"
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 800px"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
