"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function SingleItemCarousel() {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000 }}
            navigation
            pagination={{ clickable: true }}
            className="w-full h-full"
        >
            <SwiperSlide>
                <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white">
                    Slide 1
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="w-full h-full bg-red-500 flex items-center justify-center text-white">
                    Slide 2
                </div>
            </SwiperSlide>
        </Swiper>
    );
}