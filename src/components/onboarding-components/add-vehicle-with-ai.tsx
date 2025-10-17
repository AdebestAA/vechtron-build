"use client"
import Image from 'next/image'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { Input } from '../ui/input'
import { useOnBoardingSlideState } from '@/app/store/zustand-stores/useOnBoardingSlideState'
import { useMutation } from '@tanstack/react-query'
import { useModalStore } from '@/app/store/zustand-stores/useModelStore'
import Spinner from '@/utils/Spinner'
import { useRouter } from 'next/navigation'
import { useOnBoardingFormStore } from '@/app/store/zustand-stores/useOnboardingForm'

const url = process.env.NEXT_PUBLIC_AI_API_URL as string

// const postData = async (description: string) => {

//     console.log(url);

//     const accessToken = JSON.parse(localStorage.getItem("tokens") as string).accessToken
//     const refreshToken = JSON.parse(localStorage.getItem("tokens") as string).refreshToken
//     console.log(accessToken);


//     if (!url) {
//         alert("end point not available")
//         return
//     }
//     if (!accessToken) {

//     }

//     const res = await fetch(`${url}/chat/api/v1/parse-vehicle`, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${accessToken}`
//         },

//         body: JSON.stringify({ description: description })
//     })

//     if (!res.ok) {
//         console.log(res);

//         console.log("error");

//     }
//     const response = await res.json()
//     return response
// }


const AddVehicleWithAi = () => {
    const { increment, decrement } = useOnBoardingSlideState()
    const [userInput, setUserInput] = useState<string>("")
    const { updateAll } = useOnBoardingFormStore()

    const router = useRouter()

    const { openModal, } = useModalStore()
    const mutation = useMutation({
        mutationFn: postData,
        onSuccess: (data) => {
            console.log(data);
            if (data?.status == "success") {

                updateAll(data.data)
                decrement()
                console.log(data);


                return

            }
            // openModal(data.message)


        },
        onError: (error) => {
            // console.error(error);
            openModal(error.message)


        },
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        const accessToken = JSON.parse(localStorage.getItem("tokens") as string)?.accessToken
        const refreshToken = JSON.parse(localStorage.getItem("tokens") as string)?.refreshToken
        // console.log(refreshToken);
        // console.log(accessToken);


        if (!url) {
            // alert("end point not available")
            console.log("end point not available");

            return
        }
        mutation.mutate(userInput)

        // if (accessToken && refreshToken) {



        // }
        // else {
        //     console.log("doesn't exist");

        //     router.push("/sign-in")

        //     return

        // }


    }




    async function postData(description: string) {
        console.log(url);

        const accessToken = JSON.parse(localStorage.getItem("tokens") as string).accessToken
        const refreshToken = JSON.parse(localStorage.getItem("tokens") as string).refreshToken


        console.log(refreshToken);

        const res = await fetch(`${url}/api/v1/parse-vehicle`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },

            body: JSON.stringify({ description: description })
        })
        // if (res.status == 401) {
        //     const res = await fetch(`${url}/api/v1/auth/refresh`, {
        //         method: 'POST',
        //         headers: {
        //             // "Content-Type": "application/json",
        //             "Authorization": `Bearer ${refreshToken}`
        //         },
        //         body: null
        //     })

        //     console.log(res.text());
        //     return

        // }
        if (!res.ok) {
            // console.log(res);
            if (res.status == 401) {
                router.push("/sign-in")
                return
            }

            console.log("error");
            openModal("en error occured please try again")
            return null

        }
        const response = await res.json()
        return response
    }
    // create vehicle function


    // useEffect(() => {
    //     console.log(userInput);

    // }, [userInput])
    return (
        <div className='lg:px-8 px-5 md:block flex flex-col md:justify-between md:py-8 justify-center h-screen  gap-y-30 min-w-full'>
            <article className=' overflow-x-hidden flex md:justify-between justify-center'>
                <div className='relative w-[180px] min-h-[50px]'>
                    <Image src={"/logo.svg"} alt='logo' fill
                        className='absolute object-contain'
                    />
                </div>
                <Button variant={"ghost"}
                    onClick={() => router.push("/chat")}
                    className='font-normal cursor-pointer md:inline hidden'>skip for now</Button>
            </article>

            <main className='md:min-h-[80vh] flex flex-col  justify-evenly  '>
                <h1 className='md:text-3xl text-2xl font-semibold text-center'>Describe what your car looks like in a sentence or two </h1>

                <form
                    onSubmit={handleSubmit}
                    className='flex justify-between items-center  rounded-lg border-1 border-stroke md:w-[90%] w-full mx-auto  py-3 px-2 my-4'>
                    <Input
                        type='text'
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder='E.g I have a white electric sienna 2024 with 13000km mileage'
                        className='w-[80%] text-center outline-0 border-none !bg-transparent focus-visible:ring-0'

                    />
                    <Button variant={"ghost"}
                        type='submit'
                        // onClick={incrementByTwo}
                        className='cursor-pointer' >{mutation.isPending ? <Spinner /> : <ArrowRight />}</Button>
                </form>
                <div className='flex gap-x-2  justify-center '>
                    <Button className='bg-[#DDC7DF]' onClick={increment}>Back</Button>
                    <Button className='' variant={"ghost"} onClick={increment}>Enter Details Myself</Button>
                </div>
            </main>

            <div className='md:hidden block flex items-center justify-center'>
                <Button variant={"ghost"} className='font-normal cursor-pointer ' onClick={() => router.push("/chat")}>Skip for now</Button>
            </div>
        </div>
    )
}

export default AddVehicleWithAi