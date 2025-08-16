"use client";

import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";



import Spinner from '@/utils/Spinner';
import { useMutation } from '@tanstack/react-query';
import { useTheme } from 'next-themes';

import { desktopImageSlide } from '@/utils/desktop-image-slide';
import { GoogleLogin, } from '@react-oauth/google';
import { useRouter } from 'next/navigation';


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

    // https://api-staging.vechtron.com/auth/api/v1/auth/account/signup

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

    const [curr, setCurr] = useState(0);
    const [show, setShow] = useState({
        password: false,
        confirmPassword: false
    })
    const router = useRouter()
    // const { toggleTheme, theme } = useChangeThemeMode()
    const { theme, setTheme } = useTheme()
    const [errorMsg, setErrorMsg] = useState<string>("")
    const mutation = useMutation({
        mutationFn: postData,
        onSuccess: (data) => {
            if (data.status == "success") {
                router.push("/sign-in")
            }

            console.log("data", data);
            setErrorMsg(data.message)

        },
        onError: (error) => {
            console.log("error", error);
            setErrorMsg("something went wrong please try again")
            alert("an error occured check console for error info")

        },
    })



    useEffect(() => {
        console.log(theme);

    }, [theme])

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log(formState);
        setErrorMsg("")
        mutation.mutate(formState)

    }

    const handleThemeChange = () => {
        if (theme == "dark") {
            setTheme("light")
        }
        else {
            setTheme("dark")
        }

    }
    const { imageSrc, header, content } = desktopImageSlide[curr]

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSuccess = async (credentialResponse: any) => {
        const googleToken = credentialResponse.credential;
        console.log("google token", googleToken);
        console.log("google credentials", credentialResponse);



        const res = await fetch("https://api-staging.vechtron.com/auth/api/v1/auth/google/oauth2callback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: googleToken }),

        });

        const data = await res.json();
        console.log("Backend Response:", data);
        if (data.status === "success") {
            localStorage.setItem("tokens", JSON.stringify({ accessToken: data.data.access_token, resfreshToken: data.data.resfresh_token }))
            localStorage.setItem("userInfo", JSON.stringify(data.data.user))
            router.push("/dashboard")
        }


    };

    const handleError = () => {
        // console.log("Google Login Failed");
        setErrorMsg("something went wrong, cant signup with google")
        alert("Couldn't login with google at the moment, plase try again later")
    };


    return (
        <div className='lg:flex max-h-screen'>
            {/* first section */}
            <section className="lg:w-[60%] relative hidden h-full h-screen bg-primary p-10 lg:flex flex-col justify-between text-[#FFFFFF]"
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




                <article className=' flex  '>
                    <>
                        {/* <div className='absolute w-full h-full inset-0 object-cover bg-red'>

                    </div> */}
                        <Image src={imageSrc}
                            alt=''
                            fill
                            className='absolute w-full h-full inset-0 object-cover '

                        />
                    </>
                    <aside className='w-[75%] text-white z-10' >
                        <h1 className='font-semibold text-[45px]'>
                            {header}
                        </h1>
                        <h4 className='text-2xl '>
                            {content}
                        </h4>
                    </aside>
                    <aside className='w-[25%] flex items-end justify-end gap-x-2 z-10'>
                        <Button
                            onClick={() => {
                                if (curr == 0) {
                                    return
                                }
                                setCurr(prev => prev - 1)
                            }}
                            className='bg-white text-[#3F2A5C] hover:text-white cursor-pointer'>
                            <ArrowLeft />
                        </Button>
                        <Button
                            onClick={() => {
                                if (curr == desktopImageSlide.length - 1) {
                                    return
                                }
                                setCurr(prev => prev + 1)
                            }}
                            className='bg-white text-[#3F2A5C] hover:text-white cursor-pointer'>
                            <ArrowRight />
                        </Button>
                    </aside>
                </article>

            </section>

            {/* Second section */}
            <section className="lg:w-[40%]  py-8 lg:px-20 px-6 max-h-screen flex flex-col justify-center" >

                <div className='flex flex-col justify-evenly '>
                    {/* Header */}
                    <div className='flex items-center justify-between '>
                        <CardTitle className=' text-xl'>Sign Up</CardTitle>
                        <Button className='cursor-pointer' variant={"ghost"} onClick={handleThemeChange} >{theme == "dark" ? <Sun /> : <Moon />}</Button>
                    </div>

                    <div className='flex flex-col gap-y-3 my-4'>
                        <div className='flex gap-x-2'>
                            <span>Have an Acount?</span>
                            <Link href={"/sign-in"} className='font-semibold'>Login</Link>
                        </div>
                        {/* Sign up with google */}
                        <article className='w-full relative inline-block'>

                            <Button

                                className='w-full font-normal py-5 cursor-pointer absolute inset-0 ' variant={"outline"} size={"lg"}>
                                <Image src={"/google.svg"} alt="google icon" width={24} height={24} />
                                Sign Up with Google
                            </Button>
                            <div className='opacity-0'>
                                <GoogleLogin
                                    onSuccess={handleSuccess}
                                    onError={handleError}
                                    theme="outline" size="large" text="continue_with" shape="pill"
                                />
                            </div>
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
                    <p className='text-[red]'>{errorMsg ? errorMsg : ""}</p>
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

                    <Button type='submit' className='w-full font-medium text-lg text-[#FFFFFF] cursor-pointer mt-8' size={"lg"}>
                        {mutation.isPending ? <Spinner /> : "Sign Up"}
                        {/* <Spinner/> */}
                    </Button>
                </form>

            </section>

        </div>
    )
}

export default Page