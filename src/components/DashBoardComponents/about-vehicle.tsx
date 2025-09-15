"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { ChevronRight, Lightbulb } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSideChatStore } from '@/app/store/zustand-stores/use-show-side-chat'



export const data = [
    {
        id: 1,
        value: "Engine Health",
        status: "caution",

    },
    {
        id: 2,
        value: "Transmission",
        status: "critical",

    },
    {
        id: 2,
        value: "Fuel and Efficiency",
        status: "",

    },
    {
        id: 2,
        value: "Battery and Electrical",
        status: "",

    },
    {
        id: 2,
        value: "Emission",
        status: "critical",

    },
    {
        id: 2,
        value: "Transmission",
        status: "critical",

    },
    {
        id: 2,
        value: "Battery and Electrical",
        status: "",

    },
    {
        id: 2,
        value: "Emission",
        status: "critical",

    },
]
const AboutVehicle = () => {
    const [currBtn,] = useState("all")
    const contentContainer = useRef<HTMLElement | null>(null)
    const { sideChatState } = useSideChatStore()



    const router = useRouter()

    useEffect(() => {
        if (sideChatState) {

        }

    }, [contentContainer, sideChatState])
    return (


        <div className='text-sm my-4'>
            <header className='flex md:flex-row flex-col md:justify-between items-center'>
                <h1 className='font-medium text-3xl my-2'>About Vehicle</h1>
                <div className='space-x-2'>
                    {["all", "caution", "critical"].map((item, index) => {
                        return <Button key={index + 1} variant={currBtn == item ? "default" : "ghost"} className={`gap-x-2 ${currBtn == item ? "bg-primary" : ""} capitalize`}>
                            {item}
                        </Button>
                    })}
                </div>
            </header>


            <section ref={contentContainer} className='flex flex-wrap justify-between items-start gap-y-4 my-6'>
                {data.map((item, index) => {


                    return <div key={index + 1}
                        onClick={() => router.push(`/dashboard/about-vehicle/${item.value.replace(/ /g, "-").toLocaleLowerCase()}`)}
                        className={`flex justify-between bg-[var(--light-two)] w-[95%] md:w-[45%] ${sideChatState ? "lg:w-[45%]" : "lg:w-[30%]"} mx-auto md:mx-0  rounded-lg my-2  py-6 px-6  cursor-pointer`}>
                        <aside className='flex justify-between   items-center'>

                            <span><Lightbulb /></span>
                            <span className='font-medium text-sm'>{item.value}</span>
                        </aside>
                        <aside className='flex justify-between gap-x-4  items-center'>
                            <span className={` px-2 rounded-lg  ${item.status == "critical" ? "bg-[yellow] text-black" : item.status == "caution" ? "bg-[red]" : ""}`}>{item.status}</span>
                            <span><ChevronRight /></span>
                        </aside>

                    </div>
                })}

            </section>


        </div>
    )
}

export default AboutVehicle