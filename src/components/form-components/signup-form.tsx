"use client"
import { useMutation } from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { CardTitle } from '../ui/card'

import { Moon, Sun } from 'lucide-react'
import Image from 'next/image'
import { GoogleLogin } from '@react-oauth/google'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Spinner from '@/utils/Spinner'
import Link from 'next/link'
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
// import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,

    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"



const formSchema = z.object({
    firstName: z.string().min(2, { message: "First Name must be atleast 2 characters" }),
    username: z.string().min(2, { message: "username must be atleast 2 characters" }),
    lastName: z.string().min(2, { message: "Last Name must be atleast 2 characters" }),
    email: z.email({ message: "Enter a valid email" }),
    password: z.string().min(8, "password must be atleast 8 characters"),
    confirmPassword: z.string().min(8, "password must be atleast 8 characters")
})





// const zodSchema = z.object({
//     firstName: z.string(),
//     username: z.string(),
//     lastName: z.string(),
//     email: z.email({ message: "Enter a valid email" }),
//     password: z.string().min(8, "password must be atleast 8 characters"),
//     confirmPassword: z.string().min(8, "password must be atleast 8 characters")
// })


interface typeFormState<S> {
    firstName: S,
    username: S,
    lastName: S,
    email: S,
    password: S,
    confirmPassword: S
}

const url = process.env.NEXT_PUBLIC_API_URL as string
const postData = async (formState: typeFormState<string>) => {

    if (!url) {
        // alert("end point not available")
        console.log("end point not available");

        return
    }

    const res = await fetch(`${url}/auth/api/v1/auth/account/signup`, {
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

const SignupForm = () => {
    // const [formState, setFormState] = useState<typeFormState<string>>({
    //     firstName: "",
    //     lastName: "",
    //     username: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: ""
    // })

    // const [curr, setCurr] = useState(0);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            username: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    const password = form.watch("password")
    const confirmPassword = form.watch("confirmPassword")
    console.log(password);


    function onSubmit(values: z.infer<typeof formSchema>) {


        // console.log(values);
        // setErrorMsg("")
        router.push("/dashboard")
        // mutation.mutate(values)
    }
    const [show, setShow] = useState({
        password: false,
        confirmPassword: false
    })
    const router = useRouter()




    const { theme, setTheme } = useTheme()
    const [errorMsg, setErrorMsg] = useState<string>("")
    const mutation = useMutation({
        mutationFn: postData,
        onSuccess: (data) => {
            if (data.status == "success") {
                localStorage.setItem("tokens", JSON.stringify({ accessToken: data.data.access_token, refreshToken: data.data.resfresh_token }))
                localStorage.setItem("userInfo", JSON.stringify(data.data.user))
                router.push("/dashboard")
            }
            else {

                // console.log("data", data);
                setErrorMsg(data.message)
            }


        },
        onError: (error) => {
            console.log("error", error);
            setErrorMsg("something went wrong please try again")
            // alert("an error occured check console for error info")

        },
    })


    // const handleSubmit = (e: React.SyntheticEvent) => {

    //     e.preventDefault()
    //     setErrorMsg("")
    //     // console.log(formState);
    //     // const checkValidation = zodSchema.safeParse(formState)
    //     // if (!checkValidation.success) {
    //     //     setErrorMsg(checkValidation.error?.issues[0].message)
    //     //     return
    //     //     // console.log(checkValidation.error?.issues[0].message);
    //     // }

    //     setErrorMsg("")
    //     // mutation.mutate(formState)

    // }

    const handleThemeChange = () => {
        if (theme == "dark") {
            setTheme("light")
        }
        else {
            setTheme("dark")
        }

    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSuccess = async (credentialResponse: any) => {
        const googleToken = credentialResponse.credential
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
        setErrorMsg("something went wrong, cant signup with google")
        alert("Couldn't login with google at the moment, plase try again later")
    };


    return (
        <section className="lg:w-[40%] min-h-screen  py-8 lg:px-20 px-6 flex flex-col justify-center" >

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

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <p className='text-[red]'>{errorMsg ? errorMsg : ""}</p>
                    <div className="flex justify-between ">

                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem
                                    className="w-[45%] my-2"
                                >
                                    <FormLabel className='font-normal'>First Name</FormLabel>
                                    <FormControl>
                                        <Input className="px-0 bg-transparent border-b-1 bg-[var(--primary)] border-x-0 border-t-0  rounded-none outline-none focus-visible:ring-0" placeholder="enter your first name" {...field}

                                            style={{ background: "transparent" }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="w-[45%] my-2">
                                    <FormLabel className='font-normal'>Last Name</FormLabel>
                                    <FormControl>
                                        <Input className="px-0 border-b-1 border-x-0 border-t-0  rounded-none outline-none focus-visible:ring-0" placeholder="enter your last name" {...field}
                                            style={{ background: "transparent" }}
                                        />
                                    </FormControl>
                                    {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* username */}
                    <FormField
                        control={form.control}
                        name="username"

                        render={({ field }) => (
                            <FormItem
                                className=" my-2"
                            >
                                <FormLabel className='font-normal my-0 '>Username</FormLabel>
                                <FormControl className=''>
                                    <Input className="px-0 border-b-1   border-x-0 border-t-0  rounded-none outline-none focus-visible:ring-0" placeholder="enter your username" {...field}
                                        style={{ background: "transparent" }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                    <Input className="px-0 border-b-1  border-x-0 border-t-0  rounded-none outline-none focus-visible:ring-0" placeholder="enter your email" {...field}
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
                    {/* confirm password */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (


                            <FormItem
                                className="my-2"
                            >
                                <FormLabel className='font-normal'>Confirm Password</FormLabel>
                                <FormControl >
                                    <div className='relative'>

                                        <Input
                                            type={show.confirmPassword ? "text" : "password"}
                                            className="px-0 border-b-1  border-x-0 border-t-0  rounded-none outline-none focus-visible:ring-0" placeholder="confirm password" {...field}
                                            // onChange={() => {
                                            //     console.log(field);

                                            // }}
                                            style={{ background: "transparent" }}
                                        />
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
                                            className='absolute right-[3%] top-[20%]'>{show.confirmPassword ? <FaEyeSlash /> : <FaEye />}</button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p className={`${!password ? "" : password === confirmPassword ? "text-[green]" : "text-[red]"} text-sm`}>{!password ? "" : password === confirmPassword ? "Passwords match ✅" : "Passwords do not match ❌"}</p>

                    <Button type='submit' className='w-full font-medium text-lg text-[#FFFFFF] cursor-pointer mt-2' size={"lg"}>
                        {mutation.isPending ? <Spinner /> : "Sign Up"}
                    </Button>
                    {/* <Button type="submit">Submit</Button> */}
                </form>
            </Form>

        </section>

    )
}

export default SignupForm




// <form action="" onSubmit={handleSubmit} className='flex flex-col justify-evenly  gap-y-2'>
// <p className='text-[red]'>{errorMsg ? errorMsg : ""}</p>
// <div className='flex justify-between'>

//     {/* first name */}
//     <aside className='flex flex-col w-[45%]'>
//         <label htmlFor="">First Name</label>
//         <input
//             onChange={(e) => {
//                 setErrorMsg("")
//                 setFormState({ ...formState, [e.target.name]: e.target.value.trim() })
//             }}
//             className={styleForInput}
//             name="firstName"
//             type="text" />
//     </aside>
//     {/* last name */}
//     <aside className='flex flex-col w-[45%]'>
//         <label htmlFor="" >Last Name</label>
//         <input
//             className={styleForInput}
//             onChange={(e) => {
//                 setErrorMsg("")
//                 setFormState({ ...formState, [e.target.name]: e.target.value.trim() })
//             }}
//             name="lastName"
//             type="text" />
//     </aside>
// </div>
// {/* username */}
// <div className='flex flex-col'>
//     <label htmlFor="" >Username</label>
//     <input
//         className={styleForInput}
//         onChange={(e) => {
//             setErrorMsg("")
//             setFormState({ ...formState, [e.target.name]: e.target.value.trim() })
//         }}
//         name="username"
//         type="text" />
// </div>
// {/* email */}
// <div className='flex flex-col'>
//     <label htmlFor="" >Email</label>
//     <input
//         className={styleForInput}
//         onChange={(e) => {
//             setErrorMsg("")
//             setFormState({ ...formState, [e.target.name]: e.target.value.trim() })
//         }}
//         name="email"
//         type="text" />
// </div>
// {/* password */}
// <div className='flex flex-col'>
//     <label htmlFor="" >Password</label>
//     <aside className='relative w-full'>
//         <input
//             className={`${styleForInput} w-full`}
//             onChange={(e) => {
//                 setErrorMsg("")
//                 setFormState({ ...formState, [e.target.name]: e.target.value.trim() })
//             }}
//             name="password"
//             type={show.password ? "text" : "password"}

//         />
//         <button

//             type='button'
//             onClick={() => {
//                 if (show.password) {
//                     setShow({ ...show, password: false })
//                 }
//                 else {
//                     setShow({ ...show, password: true })

//                 }

//             }} className='absolute right-[3%] top-[00%]'>{show.password ? <FaEyeSlash /> : <FaEye />}</button>
//     </aside>
// </div>
// {/* confirm password */}
// <div className='flex flex-col'>
//     <label htmlFor="" >Confirm Password</label>
//     <aside className='relative w-full'>
//         <input
//             className={`${styleForInput} w-full`}
//             onChange={(e) => {
//                 setErrorMsg("")
//                 setFormState({ ...formState, [e.target.name]: e.target.value.trim() })
//             }}
//             name="confirmPassword"
//             type={show.confirmPassword ? "text" : "password"} />
//         <button
//             type='button'
//             onClick={() => {
//                 if (show.confirmPassword) {
//                     setShow({ ...show, confirmPassword: false })
//                 }
//                 else {
//                     setShow({ ...show, confirmPassword: true })

//                 }

//             }}
//             className='absolute right-[3%] top-[0%]'>{show.confirmPassword ? <FaEyeSlash /> : <FaEye />}</button>
//     </aside>
// </div>
// <p className={`${!formState.password ? "" : formState.password === formState.confirmPassword ? "text-[green]" : "text-[red]"}`}>{!formState.password ? "" : formState.password === formState.confirmPassword ? "password match" : "Passwords do not match"}</p>
// <Button type='submit' className='w-full font-medium text-lg text-[#FFFFFF] cursor-pointer mt-8' size={"lg"}>
//     {mutation.isPending ? <Spinner /> : "Sign Up"}
//     {/* <Spinner/> */}
// </Button>
// </form>


