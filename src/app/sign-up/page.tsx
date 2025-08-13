"use client";

import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";


import useChangeThemeMode from '@/lib/CustomHooks/useChangeThemeMode';
import Spinner from '@/utils/Spinner';
import { useMutation } from '@tanstack/react-query';


const styleForInput = "border-b-border border-b-1 outline-none "

interface typeFormState<S> {
    firstName: S,
    username: S,
    lastName: S,
    email: S,
    password: S,
    confirmPassword: S
}


const postData = async (formState: typeFormState<string>) => {
    const res = await fetch("https://api-staging.vechtron.com/auth/api/v1/auth/account/signup", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            first_name: formState.firstName,
            last_name: formState.lastName,
            username: formState.username,
            email: formState.email,
            password: formState.password,
            confirm_password: formState.confirmPassword
        })
    })
    if (!res.ok) {
        console.log("error");

    }
    const response = await res.json()
    return response

}
const Page = () => {
    const [formState, setFormState] = useState<typeFormState<string>>({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [show, setShow] = useState({
        password: false,
        confirmPassword: false
    })
    const { toggleTheme, theme } = useChangeThemeMode()
    const mutation = useMutation({
        mutationFn: postData,
        onSuccess: (data) => {
            console.log(data);
            if (data.status == "success") {
                alert("successfully added user, check console for response")
            }
            else {
                alert("something went wrong, check console for error")
            }

        },
        onError: (error) => {
            console.log(error);
            alert("an error occured check console for error info")

        },
    })



    useEffect(() => {
        console.log(theme);

    }, [theme])

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log(formState);
        mutation.mutate(formState)

    }
    return (
        <div className='lg:flex max-h-screen'>
            {/* first section */}
            <section className="lg:w-[60%] hidden h-full h-screen bg-primary p-10 lg:flex flex-col justify-between text-[#FFFFFF]"
                style={{
                    backgroundImage: "url('/vechtron-accelerator.svg')",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    // height: '100vh',
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
                <article className=' flex '>

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
                        <Button className='bg-[#FFFFFF] text-[#3F2A5C] hover:text-white cursor-pointer'>
                            <ArrowLeft />
                        </Button>
                        <Button className='bg-[#FFFFFF] text-[#3F2A5C] hover:text-white cursor-pointer'>
                            <ArrowRight />
                        </Button>
                    </aside>
                </article>

            </section>

            {/* Second section */}
            <section className="lg:w-[40%]  py-8 lg:px-20 px-6 max-h-screen" >

                <div className='flex flex-col justify-evenly '>
                    {/* Header */}
                    <div className='flex items-center justify-between '>
                        <CardTitle className=' text-xl'>Sign Up</CardTitle>
                        <Button className='cursor-pointer' variant={"ghost"} onClick={toggleTheme} >{theme == "dark" ? <Sun /> : <Moon />}</Button>
                    </div>

                    <div className='flex flex-col gap-y-3 my-4'>
                        <div className='flex gap-x-2'>
                            <span>Have an Acount?</span>
                            <Link href={"/sign-in"} className='font-semibold'>Login</Link>
                        </div>
                        {/* Sign up with google */}
                        <article>
                            <Button className='w-full font-normal py-6 ' variant={"outline"} size={"lg"}>
                                <Image src={"/google.svg"} alt="google icon" width={24} height={24} />
                                Sign Up with Google
                            </Button>
                        </article>

                        {/* Or */}
                        <div className='flex items-center justify-between my-4'>
                            <hr className='w-[45%] h-[5px]' />
                            <span >or</span>

                            <hr className='w-[45%]' />

                        </div>
                    </div>
                </div>
                <form action="" onSubmit={handleSubmit} className='flex flex-col justify-evenly  gap-y-2'>
                    <div className='flex justify-between'>
                        {/* first name */}
                        <aside className='flex flex-col w-[45%]'>
                            <label htmlFor="">First Name</label>
                            <input
                                onChange={(e) => {
                                    setFormState({ ...formState, [e.target.name]: e.target.value.trim() })
                                }}
                                className={styleForInput}
                                name="firstName"
                                type="text" />
                        </aside>
                        {/* last name */}
                        <aside className='flex flex-col w-[45%]'>
                            <label htmlFor="" >Last Name</label>
                            <input
                                className={styleForInput}
                                onChange={(e) => {
                                    setFormState({ ...formState, [e.target.name]: e.target.value.trim() })
                                }}
                                name="lastName"
                                type="text" />
                        </aside>
                    </div>
                    {/* username */}
                    <div className='flex flex-col'>
                        <label htmlFor="" >Username</label>
                        <input
                            className={styleForInput}
                            onChange={(e) => {
                                setFormState({ ...formState, [e.target.name]: e.target.value.trim() })
                            }}
                            name="username"
                            type="text" />
                    </div>
                    {/* email */}
                    <div className='flex flex-col'>
                        <label htmlFor="" >Email</label>
                        <input
                            className={styleForInput}
                            onChange={(e) => {
                                setFormState({ ...formState, [e.target.name]: e.target.value.trim() })
                            }}
                            name="email"
                            type="text" />
                    </div>
                    {/* password */}
                    <div className='flex flex-col'>
                        <label htmlFor="" >Password</label>
                        <aside className='relative w-full'>
                            <input
                                className={`${styleForInput} w-full`}
                                onChange={(e) => {
                                    setFormState({ ...formState, [e.target.name]: e.target.value.trim() })
                                }}
                                name="password"
                                type={show.password ? "text" : "password"}

                            />
                            <button

                                type='button'
                                onClick={() => {
                                    if (show.password) {
                                        setShow({ ...show, password: false })
                                    }
                                    else {
                                        setShow({ ...show, password: true })

                                    }

                                }} className='absolute right-[3%] top-[00%]'>{show.password ? <FaEyeSlash /> : <FaEye />}</button>
                        </aside>
                    </div>
                    {/* confirm password */}
                    <div className='flex flex-col'>
                        <label htmlFor="" >Confirm Password</label>
                        <aside className='relative w-full'>
                            <input
                                className={`${styleForInput} w-full`}
                                onChange={(e) => {
                                    setFormState({ ...formState, [e.target.name]: e.target.value.trim() })
                                }}
                                name="confirmPassword"
                                type={show.confirmPassword ? "text" : "password"} />
                            <button
                                type='button'
                                onClick={() => {
                                    if (show.confirmPassword) {
                                        setShow({ ...show, confirmPassword: false })
                                    }
                                    else {
                                        setShow({ ...show, confirmPassword: true })

                                    }

                                }}
                                className='absolute right-[3%] top-[0%]'>{show.confirmPassword ? <FaEyeSlash /> : <FaEye />}</button>
                        </aside>
                    </div>

                    <Button type='submit' className='w-full font-medium text-lg text-[#FFFFFF] cursor-pointer' size={"lg"}>
                        {mutation.isPending ? <Spinner /> : "Sign Up"}
                        {/* <Spinner/> */}
                    </Button>
                </form>

            </section>

        </div>
    )
}

export default Page