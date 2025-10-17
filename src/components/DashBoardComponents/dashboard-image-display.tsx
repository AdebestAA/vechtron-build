import Image from 'next/image'
import React from 'react'
import { health } from './Main'

const DashBoardImageDisplay = () => {
    return (
        <>
            <div className='relative w-full h-[250px] lg:min-h-[350px]'>
                <Image alt='car' src={"/car.svg"} fill className='absolute w-full h-full object-cover rounded-lg' />
            </div>
            {/* health */}
            <div className='flex flex-wrap bg-[var(--light-one)] rounded-lg py-4'>
                {health.map((item, index) => {

                    return <aside key={index + 1} className={`flex flex-col w-[25%]  items-center   font-light  ${index == 0 ? "" : "border-l border-l-[var(--stroke)]"}`} >
                        <span className='font-semibold lg:text-[1.1rem]'>{item.percent}</span>
                        <span className='text-[0.7rem]'>{item.value}</span>
                    </aside>
                })}
            </div>
        </>
    )
}

export default DashBoardImageDisplay