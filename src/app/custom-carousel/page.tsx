"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'

const content = [
    { id: 1, content: "Slide 1 " },
    { id: 2, content: "Slide 2" },
    { id: 3, content: "Slide 3" },
];

const Page = () => {

    const [current, setCurrent] = useState(0)

    const handlePrev = () => {
        setCurrent(prev => prev - 1)

    }
    const handleNext = () => {
        setCurrent(prev => prev + 1)
    }

    return (
        <div className='flex items-center flex-col items-center '>
            <h1>custom carousel</h1>
            {/* outer container */}
            <div className='w-[500px] h-[400px] overflow-x-hidden '>
                <div className='w-full h-full flex transition-all ease-in-out duration-500'
                    style={{
                        transform: `translateX(-${current * 100}%)`
                    }}

                >
                    {content.map((item, index) => {

                        return <aside key={index} className={`min-w-full h-full 
                         ${index == 0 ? "bg-red-500" : index == 1 ? "bg-blue-500" : "bg-green-500"}
                        `}>
                            {item.content}
                        </aside>
                    })}
                </div>
                <div>
                </div>

            </div>
            <div className='flex gap-x-4 my-6'>
                <Button onClick={handlePrev}>prev</Button>
                <Button onClick={handleNext}>next</Button>

            </div>

        </div>
    )
}

export default Page