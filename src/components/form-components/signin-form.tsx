"use client"
import { useMutation } from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { GoogleLogin } from '@react-oauth/google'
import Spinner from '@/utils/Spinner'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Form,
    FormControl,

    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useSaveUserInfo } from '@/app/store/zustand-stores/use-save-user-info'

// const styleForInput = "border-b-border border-b-1 outline-none "

const formSchema = z.object({

    email: z.email({ message: "Enter a valid email" }),
    password: z.string().min(8, "password must be atleast 8 characters"),

})




interface typeFormState<S> {
    email: S,
    password: S,
}
const url = process.env.NEXT_PUBLIC_API_URL as string
const postData = async (formState: typeFormState<string>) => {
    if (!url) {
        console.log("end point not available");
        // alert("end point not available")
        return
    }
    const res = await fetch(`${url}/api/v1/auth/account/login`, {
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

const SigninForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",

        },
    })
    const { saveUserInfo } = useSaveUserInfo()


    function onSubmit(values: z.infer<typeof formSchema>) {


        // console.log(values);
        router.push("/dashboard")

        // setErrorMsg("")
        // mutation.mutate(values)
    }


    // const [formState] = useState<typeFormState<string>>({

    //     email: "",
    //     password: "",
    // })
    const [show, setShow] = useState({
        password: false,

    })
    const [errorMsg, setErrorMsg] = useState<string>("")
    const router = useRouter()
    // const [curr, setCurr] = useState(0);
    const { theme, setTheme } = useTheme()
    // const { toggleTheme, theme } = useChangeThemeMode()

    const mutation = useMutation({
        mutationFn: postData,
        onSuccess: (data) => {
            console.log(data);
            if (data.status == "success") {
                if (data.status === "success") {
                    console.log(data);

                    saveUserInfo(data.data.user)
                    localStorage.setItem("tokens", JSON.stringify({ accessToken: data.data.access_token, refreshToken: data.data.refresh_token }))
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


    // const handleSubmit = (e: React.SyntheticEvent) => {
    //     e.preventDefault()
    //     console.log(formState);
    //     setErrorMsg("")
    //     mutation.mutate(formState)

    // }
    const handleThemeChange = () => {
        if (theme == "dark") {
            setTheme("light")
        }
        else {
            setTheme("dark")
        }

    }



    useEffect(() => {
        // if (!localStorage.getItem("user")) {
        //   router.push("sign-in")
        // }
        // console.log(localStorage.getItem("userInfo"));

    }, [])



    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSuccess = async (credentialResponse: any) => {
        const googleToken = credentialResponse.credential;
        console.log("google token", googleToken);
        console.log("google credentials", credentialResponse);



        const res = await fetch(`${url}/auth/api/v1/auth/google/oauth2callback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: googleToken }),

        });

        const data = await res.json();
        console.log("Backend Response:", data);
        if (data.status === "success") {
            localStorage.setItem("tokens", JSON.stringify({ accessToken: data.data.access_token, refreshToken: data.data.resfresh_token }))
            localStorage.setItem("userInfo", JSON.stringify(data.data.user))
            router.push("/dashboard")
        }


    };

    const handleError = () => {
        // console.log("Google Login Failed");
        alert("Couldn't login with google at the moment, plase try again later")
    };

    return (
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
                            {/* <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={handleError}
                                theme="outline" size="large" text="continue_with" shape="pill"
                            /> */}
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


            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <p className='text-[red] text-sm'>{errorMsg ? errorMsg : ""}</p>

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem
                                className=" my-2"
                            >
                                <FormLabel className='font-normal'>Email</FormLabel>
                                <FormControl>
                                    <Input className="px-0 border-b-1  border-x-0 border-t-0  rounded-none outline-none focus-visible:ring-0" placeholder="enter your username" {...field}
                                        style={{ background: "transparent" }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* password */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem
                                className=" my-2"
                            >
                                <FormLabel className='font-normal'>Password</FormLabel>
                                <FormControl>
                                    <div className='relative'>

                                        <Input
                                            type={show.password ? "text" : "password"}
                                            className="px-0 border-b-1  border-x-0 border-t-0  rounded-none outline-none focus-visible:ring-0" placeholder="enter your password" {...field}
                                            style={{ background: "transparent" }}
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

                                            }} className='absolute right-[3%] top-[20%]'>{show.password ? <FaEyeSlash /> : <FaEye />}</button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <Button type='submit' className='w-full font-medium text-lg text-[#FFFFFF] cursor-pointer mt-2' size={"lg"}>
                        {mutation.isPending ? <Spinner /> : "Sign In"}
                    </Button>
                    {/* <Button type="submit">Submit</Button> */}
                </form>
            </Form>
        </section>
    )
}

export default SigninForm