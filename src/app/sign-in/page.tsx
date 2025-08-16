"use client"
import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'

import { desktopImageSlide } from '@/utils/desktop-image-slide'
import Spinner from '@/utils/Spinner'
import { GoogleLogin } from '@react-oauth/google'
import { useMutation } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa"


const styleForInput = "border-b-border border-b-1 outline-none "

interface typeFormState<S> {
    email: S,
    password: S,
}

const postData = async (formState: typeFormState<string>) => {
    const res = await fetch("https://api-staging.vechtron.com/auth/api/v1/auth/account/login", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: formState.email,
            password: formState.password,
        })
    })
    if (!res.ok) {
        console.log("error");

    }
    const response = await res.json()
    return response

}
export default function Page() {
    const [formState, setFormState] = useState<typeFormState<string>>({

        email: "",
        password: "",
    })
    const [show, setShow] = useState({
        password: false,

    })
    const [errorMsg, setErrorMsg] = useState<string>("")
    const router = useRouter()
    const [curr, setCurr] = useState(0);
    const { theme, setTheme } = useTheme()
    // const { toggleTheme, theme } = useChangeThemeMode()
    const mutation = useMutation({
        mutationFn: postData,
        onSuccess: (data) => {
            console.log(data);
            if (data.status == "success") {
                if (data.status === "success") {
                    localStorage.setItem("tokens", JSON.stringify({ accessToken: data.data.access_token, resfreshToken: data.data.resfresh_token }))
                    localStorage.setItem("userInfo", JSON.stringify(data.data.user))
                    router.push("/dashboard")
                }

            }
            else {
                // alert("something went wrong, check console for error")
                setErrorMsg(data.message)

            }
        },
        onError: (error) => {
            console.log(error);
            setErrorMsg("an error ocurred, please try again later")
            // alert("an error occured check console for error info")

        },
    })

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
                        <CardTitle className=' text-xl'>Log In</CardTitle>
                        <Button className='cursor-pointer' variant={"ghost"} onClick={handleThemeChange} >{theme == "dark" ? <Sun /> : <Moon />}</Button>
                    </div>


                    <div className='text-red'>

                    </div>
                    <div className='flex flex-col gap-y-3 my-4'>
                        <div className='flex gap-x-2'>
                            <span>Do not have an account?  </span>
                            <Link href={"/sign-up"} className='font-semibold'>Sign UP</Link>
                        </div>
                        {/* Sign up with google */}
                        <article className='w-full relative '>
                            <Button

                                className='w-full font-normal py-5 cursor-pointer absolute inset-0 ' variant={"outline"} size={"lg"}>
                                <Image src={"/google.svg"} alt="google icon" width={24} height={24} />
                                Sign In with Google
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

                <div className='text-[red] pb-4 text-sm '>

                    {errorMsg ? errorMsg : ""}

                </div>

                <form action="" onSubmit={handleSubmit} className='flex flex-col justify-evenly  gap-y-2'>
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

                    <div>
                        <Button type='submit' className=' cursor-pointer w-full font-medium text-lg text-white mt-12' size={"lg"}>
                            {mutation.isPending ? <Spinner /> : "Sign In"}
                            {/* <Spinner/> */}
                        </Button>
                    </div>
                    <div className='flex justify-end '>
                        <Link href={"/"} className='text-primary text-sm'>forgot password?</Link>
                    </div>
                </form>
            </section>
        </div>
    )
}