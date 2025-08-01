import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight, Moon, Sun } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Light } from '../utils/Icons'


const styleForInput = "border-b-border border-b-1 outline-none"
const page = () => {
  return (
    <div className='flex '>
        {/* first section */}
        <section className="md:w-[60%] h-full bg-primary p-10 flex flex-col justify-between"
        style={{
            backgroundImage:"url('/vechtron-accelerator.svg')",
            backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        }}
        >
            {/* first article */}
 <article className=' '>
    <div className='relative w-[180px] h-[50px] '>
    <Image src={"/logo.svg"} alt='logo' fill 
    className='absolute object-contain'
    />
    </div>
 </article>
 {/* second article */}
 <article className='text-background flex'>
    
 <aside className='w-[75%]'>
 <h1 className='font-semibold text-[45px]'>
    Turn Every Drive Into 
    <br />
    a Smarter Journey.
    </h1>
 <h4 className='text-2xl '>
    Unlock the ultimate driving experience with our Ai-powered assistant. Effortless, efficient, and smart
    </h4>
 </aside>
 <aside className='w-[25%] flex items-end justify-end gap-x-2'>
        <Button className='bg-background text-primary'>
            <ArrowLeft/>
        </Button>
        <Button className='bg-background text-primary'>
            <ArrowRight/>
        </Button>
    </aside>
 </article>

</section>

{/* Second section */}
<section  className="md:w-[40%] py-8 px-16 max-h-screen" >

    <div className='flex flex-col justify-evenly '>
    {/* Header */}
<div className='flex items-center justify-between '>
<CardTitle className=' text-xl'>Sign Up</CardTitle>
<Button  variant={"ghost"}><Sun/></Button>
</div>

<div className='flex flex-col gap-y-4 my-4'>
    <div className='flex'>
    <span>Have and Account?</span>
    <Link href={"/"} className='font-semibold'>Login</Link>
    </div>
    {/* Sign up with google */}
    <article>
        <Button className='w-full font-normal py-6' variant={"outline"} size={"lg"}>
<img src={"./google.svg"} />
Sign Up with Google
        </Button>
    </article>

    {/* Or */}
    <div className='flex items-center justify-between my-6'>
        <hr className='w-[45%] h-[5px]'  />
        <span >or</span>
        
        <hr className='w-[45%]' />
        
    </div>
</div>
    </div>
<form action="" className='flex flex-col justify-evenly  gap-y-6'>
    <div className='flex justify-between'>
        {/* first name */}
        <aside className='flex flex-col w-[45%]'>
<label htmlFor="">First Name</label>
      <input 
      className={styleForInput}
      type="text" />
        </aside>
      {/* last name */}
        <aside className='flex flex-col w-[45%]'>
<label htmlFor="" >Last Name</label>
        <input 
        className={styleForInput}
        type="text" />
        </aside>
    </div>
{/* email */}
    <div className='flex flex-col'>
    <label htmlFor="" >Email</label>
        <input 
        className={styleForInput}
        type="text" /> 
    </div>
{/* password */}
<div className='flex flex-col'>
    <label htmlFor="" >Password</label>
    <aside className='relative w-full'>
        <input 
        className={`${styleForInput} w-full`}
        type="text" /> 
        <button className='absolute right-[3%] top-[00%]'><FaEye/></button>
        </aside>
    </div>
{/* confirm password */}
<div className='flex flex-col'>
    <label htmlFor="" >Confirm Password</label>
    <aside className='relative w-full'>
        <input 
        className={`${styleForInput} w-full`}
        type="text" /> 
        <button className='absolute right-[3%] top-[0%]'><FaEye/></button>
        </aside>
    </div>

    <Button className='w-full font-medium text-lg'  size={"lg"}>

Sign Up 
        </Button>
</form>

</section>

    </div>
  )
}

export default page