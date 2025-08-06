"use client"
import { ArrowLeft, ArrowRight, ChevronDown, Globe, Menu, Mic, Moon, Paperclip, Pencil, Plus, Radio, Sun } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import useChangeThemeMode from '@/lib/CustomHooks/useChangeThemeMode'
import Image from 'next/image'

import { Textarea } from "@/components/ui/textarea"
const health = [
  {
    id:1,
    percent:"20%",
    value:"overall health"
  },
  {
    id:1,
    percent:"20%",
    value:"overall health"
  },
  {
    id:1,
    percent:"20%",
    value:"overall health"
  },
  {
    id:1,
    percent:"20%",
    value:"overall health"
  },
]

const chatAiData = [
  {
    id:1,
    value:"Quick Vehicle Analysis",
    iconSrc:"/search.svg"
  },
  {
    id:2,
    value:"Add maintenance",
    iconSrc:"/search.svg"
  },
  {
    id:1,
    value:"Quick Vehicle Analysis",
    iconSrc:"/search.svg"
  },
  {
    id:2,
    value:"Add maintenance",
    iconSrc:"/search.svg"
  },
]
const Main = () => {
    const {toggleTheme,theme} = useChangeThemeMode()
  return (
    <div className='md:min-w-[80%] w-full md:px-8 px-4 my-4 '>
      {/* header */}
        <header className='flex justify-between '>
            <h1 className='font-semibold'>Vehicle</h1>
            <>
            <Button className='md:hidden' variant={"ghost"}><Menu/></Button>
            <div className='md:block hidden'>
            <Button className='cursor-pointer'  variant={"ghost"} onClick={toggleTheme} >{theme == "dark" ? <Sun/> : <Moon/>}</Button>
            {Array(4).fill("").map((item,index)=>{

                return    <Button key={index} className='cursor-pointer bg-[#DDC7DF] mx-1 p-3'   onClick={toggleTheme} >{index == 0 ? "Upgrade" : "#1"}</Button>
              })}
            </div>
              </>
        </header>

        {/* name of vehicle */}
        <div className='flex justify-between mt-4'>
          <div className='flex flex-col'>
          <Button variant={"ghost"} className='px-0'>
            <span className='text-2xl font-semibold'>2024 Rav4 Toyota</span>
             <span><ChevronDown/></span></Button>
             <Button variant={"ghost"} className='px-0 flex justify-start text-sm font-light'>
             <span>Edit Vehicle</span>
             <span><Pencil /></span></Button>
            
          </div>
          {/* add vehivel */}
          <>
          <Button className='text-[var(--text-color-one)] md:hidden'><Plus/></Button>
          <Button className='text-[var(--text-color-one)] md:inline hidden'>Add new Vehicle</Button>
          </>
        </div>

        {/*  */}
     <div className='flex flex-col md:flex-row gap-y-4 md:gap-x-6'>
  {/* car image section */}
<section className='md:w-[70%] flex flex-col gap-y-4'>
  <div className='relative w-full h-[250px] md:min-h-[350px]'>
  <Image alt='car' src={"/car.svg"} fill  className='absolute w-full h-full object-cover rounded-lg'/>
  </div>
  {/* health */}
  <div className='flex flex-wrap bg-[var(--light-one)] rounded-lg py-4'>
{health.map((item,index)=>{

  return <aside className={`flex flex-col w-[25%]  items-center   font-light  ${index == 0 ? "" : "border-l border-l-[var(--stroke)]"}`} >
    <span className='font-semibold md:text-[1.1rem]'>{item.percent}</span>
    <span className='text-[0.7rem]'>{item.value}</span>
  </aside>
})}
  </div>
</section>
{/* Chat section */}
<section className='bg-[var(--light-one)] p-4 rounded-lg md:w-[30%] flex flex-col justify-between'>
  {/* first section */}
  <div>
<h1 className='font-semibold text-lg'>Chat AI</h1>
<div className=''>
  {chatAiData.map((item,index)=>{
    
    return <Button className='font-light w-full px-0 my-2 text-[var(--text-color-one)] flex items-center justify-start pl-16 py-6' key={index + 1}>

      <img src={item.iconSrc} alt={item.value} />
      <span className='text-left'>{item.value}</span>
    </Button>
  })}
</div>
  </div>
  {/* chat */}
  <div className='bg-[var(--light-one)] rounded-lg p-2'>
    <Textarea
    className=' border-none h-[70px] overflow-hidden px-0 border-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
    style={{
      background:"transparent",
      resize:"none"
    }}
    value={"Lorem ipsum dolor sit amet consecte tur Amet velit amet "}
    />
   <footer className='flex justify-between'>
    <section className='flex justify-between gap-x-3 items-center'>
      <span className='cursor-pointer'><Globe size={18}/></span>
      <span className='cursor-pointer'><Radio size={18}/></span>
      <span className='cursor-pointer'><Paperclip size={18}/></span>
      <span className='cursor-pointer'><Mic size={18}/></span>
    </section>
    <Button  className='text-[var(--text-color-one)] cursor-pointer'><ArrowRight/></Button>
   </footer>
  </div>
</section>


     </div>
    </div>
  )
}

export default Main