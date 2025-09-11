"use client";
import { Button } from '@/components/ui/button';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { desktopImageSlide } from '@/utils/desktop-image-slide';
import SignupForm from '@/components/form-components/signup-form';





const Page = () => {


    // const { imageSrc, header, content } = desktopImageSlide[curr]
    const [curr, setCurr] = useState<number>(0)


    useEffect(()=>{
console.log(theme);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (curr == desktopImageSlide.length - 1) {
                setCurr(prev => prev - 1)
                return

            }
            setCurr(prev => prev + 1)
        }, 5000)

        return () => clearInterval(intervalId)

    }, [curr])


    return (
        <div className='lg:flex min-h-screen'>
            {/* first section */}
            <section className="lg:w-[60%] relative hidden h-full min-h-screen bg-primary p-10 lg:flex flex-col justify-between text-[#FFFFFF]"
            // style={{
            //     backgroundImage: "url('/vechtron-accelerator.svg')",
            //     backgroundSize: 'cover',
            //     backgroundRepeat: 'no-repeat',
            //     // height: '100vh',
            // }}
            >
                {/* first article */}
                <article className=' z-10 overflow-x-hidden'>
                    <div className='relative w-[180px] h-[50px] '>
                        <Image src={"/logo.svg"} alt='logo' fill
                            className='absolute object-contain'
                        />
                    </div>
                </article>
                {/* second article */}


                <div className='absolute inset-0 w-full h-full  z-0 overflow-x-hidden'>
                    <div className=' h-full flex w-full  transition-all duration-500 ease-in-out '
                        style={{
                            transform: `translateX(-${curr * 100}%)`
                        }}
                    >


                        {desktopImageSlide.map((item, index) => {

                            return <div key={index} className='min-w-full h-full  relative'>
                                <Image
                                    fill
                                    src={item.imageSrc} alt={item.header} className='min-w-full h-full object-cover absolute' />
                            </div>
                        })}
                    </div>
                </div>
                {/* custom slide */}

                <div className='w-full flex justify-between items-center  z-50'>

                    <div className='w-[70%]  overflow-x-hidden'>
                        <div className=' h-full flex w-full  transition-all duration-500 ease-in-out '
                            style={{
                                transform: `translateX(-${curr * 100}%)`
                            }}
                        >
                            {desktopImageSlide.map((item, index) => {

                                return <div className='min-w-full flex justify-between items-center' key={index} >

                                    <div className='w-full'>

                                        <h1 className='font-bold text-4xl'>{item.header}</h1>
                                        <p className='text-lg'>{item.content}</p>
                                    </div>

                                </div>
                            })}
                        </div>


                    </div>
                    <aside className='w-[30%] flex items-end justify-end gap-x-2'>
                        <Button
                            onClick={() => {

                                if (curr == 0) {
                                    return
                                }
                                setCurr(prev => prev - 1)
                            }}
                            className='bg-[#FFFFFF] text-[#3F2A5C] hover:text-white cursor-pointer'>
                            <ArrowLeft />
                        </Button>
                        <Button
                            onClick={() => {

                                if (curr == desktopImageSlide.length - 1) {
                                    return
                                }
                                setCurr(prev => prev + 1)
                            }}
                            className='bg-[#FFFFFF] text-[#3F2A5C] hover:text-white cursor-pointer'>
                            <ArrowRight />
                        </Button>
                    </aside>
                </div>

                {/* 
                <div className='absolute inset-0'>

                    <Swiper
                        modules={[Pagination, Autoplay]}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 5000 }}
                        className="w-full h-full  "
                    >

                        {desktopImageSlide.map((item, index) => {

                            return <SwiperSlide key={index + 1}>

                                <div className='min-h-screen w-full '>
                                    <Image
                                        fill
                                        className='w-full h-full object-cover'
                                        src={item.imageSrc} alt={item.content} />
                                </div>


                            </SwiperSlide>
                        })}

                    </Swiper>



                </div> */}



                {/* <div className=''>

                    <Swiper
                        modules={[Pagination, Autoplay]}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 5000 }}

                        className="w-full h-full  "
                    >

                        {desktopImageSlide.map((item, index) => {

                            return <SwiperSlide key={index + 1}>

                                <aside className='w-[75%] text-white z-10' >
                                    <h1 className='font-semibold text-[40px]'>
                                        {item.header}
                                    </h1>
                                    <h4 className='text-lg '>
                                        {item.content}
                                    </h4>
                                </aside>

                            </SwiperSlide>
                        })}

                    </Swiper>



                </div> */}

}

            {/* Second section */}
            <SignupForm />

        </div>
    )

}

export default Page