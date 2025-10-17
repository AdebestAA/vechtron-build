"use client"
import React from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { health } from './Main'
import { Progress } from '../ui/progress'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { data } from './about-vehicle'

const EngineHealth = () => {

    const { slug }: { slug: string } = useParams()
    console.log(slug);

    const findContent = data.find(item => item.value.replace(/ /g, "-").toLocaleLowerCase() == slug)
    return (
        <>
            <header className='flex justify-between items-center'>
                <h1 className='font-medium lg:text-3xl my-2 text-lg '>{findContent?.value}</h1>
                <Button variant={"ghost"}>
                    <X />
                </Button>
            </header>


            <section className='flex flex-col justify-between h-full'>

                <div className=' my-2'>
                    <span className={` px-2 rounded-lg  ${findContent?.status == "critical" ? "bg-[yellow] text-black" : findContent?.status == "caution" ? "bg-[red]" : ""} `} >{findContent?.status}</span>

                </div>
                <div className='flex flex-wrap  rounded-lg py-4'>
                    {health.map((item, index) => {

                        return <aside key={index + 1} className={`flex flex-col w-[25%]  items-center   font-light  ${index == 0 ? "" : "border-l border-l-[var(--stroke)]"}`} >
                            <span className='font-semibold lg:text-[1.1rem]'>{item.percent}</span>
                            <span className='text-[0.7rem]'>{item.value}</span>
                        </aside>
                    })}
                </div>


                {/* life progress */}

                <div className=' flex flex-col  gap-y-2'>
                    <h1>life at 15%</h1>
                    <Progress value={25} className='[&>div]:bg-[yellow] max-w-full' />
                    <p>Schedule oil change within next 500 miles</p>
                    <div className='flex justify-between'>

                        <Link className='underline text-sm' href={"#"}>learn more</Link>
                        <Link className='underline text-sm' href={"#"}>Done</Link>

                    </div>
                </div>
            </section>


        </>

    )
}

export default EngineHealth