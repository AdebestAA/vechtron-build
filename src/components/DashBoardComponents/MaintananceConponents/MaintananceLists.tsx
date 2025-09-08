"use client"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ChevronDown, TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
const maintananceListData = [
    {
        id: 1,
        title: "Oil Change Required",
        status: "Urgent",
        percentageInfo: "Steering Fluid at",
        percentage: 43,
        info: "Schedule oil change within next 500 miles"
    },
    {
        id: 1,
        title: "Oil Change Required",
        status: "Urgent",
        percentageInfo: "Steering Fluid at",
        percentage: 15,
        info: "Schedule oil change within next 500 miles"
    },
    {
        id: 1,
        title: "Oil Change Required",
        status: "Urgent",
        percentageInfo: "Steering Fluid at",
        percentage: 75,
        info: "Schedule oil change within next 500 miles"
    },
    {
        id: 1,
        title: "Oil Change Required",
        status: "Urgent",
        percentageInfo: "Steering Fluid at",
        percentage: 64,
        info: "Schedule oil change within next 500 miles"
    },
    {
        id: 1,
        title: "Coolant Level Low",
        status: "Urgent",
        percentageInfo: "Oil life at",
        percentage: 84,
        info: "Schedule oil change within next 500 miles"
    },
    {
        id: 1,
        title: "Coolant Level Low",
        status: "Urgent",
        percentageInfo: "Oil life at",
        percentage: 38,
        info: "Schedule oil change within next 500 miles"
    },
    {
        id: 1,
        title: "Coolant Level Low",
        status: "Urgent",
        percentageInfo: "Oil life at",
        percentage: 35,
        info: "Schedule oil change within next 500 miles"
    },
]

const MaintananceLists = () => {
    const [currBtn,] = useState("all")
    return (
        <div className='text-sm my-4'>
            <header className='flex md:flex-row flex-col md:justify-between items-center'>
                <h1 className='font-medium text-3xl my-2'>Maintanance List</h1>
                <div>
                    {["all", "upcoming", "overdue", "done"].map((item, index) => {
                        return <Button key={index + 1} variant={currBtn == item ? "default" : "ghost"} className={`gap-x-2${currBtn == item ? "bg-white" : ""} capitalize`}>
                            {item}
                        </Button>
                    })}
                </div>
            </header>

            <section className='flex flex-wrap justify-between items-start gap-y-4 my-6'>
                {maintananceListData.map((item, index) => {

                    return <div key={index + 1} className='bg-[var(--overview-container)] md:mx-0 mx-auto w-[95%] md:w-[45%] lg:w-[30%] rounded-lg text-white px-4 py-4 '>
                        <aside className='flex justify-between items-center'>
                            <span className='flex gap-x-2 font-semibold'><TriangleAlert
                                className={` ${item.percentage <= 25 ? 'text-[#F80000]' : item.percentage <= 60 ? "text-[#AA9D05] " : "text-[#499C00]"}`}
                            />{item.title}</span>
                            <span className={`rounded-lg px-2 ${item.percentage <= 25 ? 'bg-[#F80000]' : item.percentage <= 60 ? "bg-[#AA9D05] " : "bg-[#499C00]"}`}>{item.percentage <= 25 ? 'Urgent' : item.percentage <= 60 ? "Warning " : "Good"}</span>
                        </aside>
                        <aside className='my-2'>
                            <p>{item.percentageInfo} {item.percentage}%</p>
                            <Progress className={`${item.percentage <= 25 ? '[&>div]:bg-[#F80000]' : item.percentage <= 60 ? "[&>div]:bg-[#AA9D05] " : "[&>div]:bg-[#499C00]"}`} value={item.percentage} />
                            <p>{item.info}</p>
                        </aside>
                        <aside className='flex justify-between'>
                            <Link href={"#"} className={`underline ${item.percentage <= 25 ? 'text-[#F80000]' : ""}`}>Learn why</Link>
                            <Link href={"#"} className='underline'>Done</Link>
                        </aside>
                    </div>
                })}
            </section>
            <section>
                <Button variant={"ghost"} className='font-light flex items-center '>See more <ChevronDown /></Button>
            </section>
        </div>
    )
}

export default MaintananceLists
