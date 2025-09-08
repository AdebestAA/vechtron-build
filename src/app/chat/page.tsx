"use client"
import React, { useState } from 'react'
import {
    SidebarInset,
    SidebarProvider
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/app-sidebar"
import DashboardHeader from '@/components/DashBoardComponents/dashboard-header'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Globe, Mic, Paperclip, Radio, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
const url = process.env.NEXT_PUBLIC_AI_API_URL as string

import ReactMarkdown from "react-markdown";




const charts = [
    {
        id: 1,
        user: true,
        message: "how are you"
    },
    {
        id: 2,
        user: false,
        message: "Hello! How can I assist you today?"
    },
    {
        id: 3,
        user: true,
        message: "how are you doing?"
    },
    {
        id: 4,
        user: false,
        message: "I'm just a program, so I don't have feelings, but I'm here and ready to help you! What do you need assistance with?"
    },
    {
        id: 5,
        user: true,
        message: "why this"
    },
    {
        id: 5,
        user: false,
        message: "There are several reasons why a car might consume too much fuel. Here are some common factors to consider:\n\n1. **Engine Problems**: Faulty spark plugs, dirty air filters, or malfunctioning fuel injectors can impact fuel efficiency.\n\n2. **Tire Pressure**: Under-inflated tires can increase rolling resistance, leading to higher fuel consumption.\n\n3. **Weight**: Carrying excess weight in the car can lead to increased fuel consumption.\n\n4. **Driving Habits**: Aggressive driving, rapid acceleration, and high-speed driving can all lead to poorer fuel economy.\n\n5. **Fuel Quality**: Using low-quality fuel may affect engine performance and efficiency.\n\n6. **Maintenance**: Neglecting regular maintenance can lead to decreased efficiency.\n\n7. **Air Conditioning Usage**: Using air conditioning frequently can also increase fuel consumption.\n\n8. **Poor Aerodynamics**: Added accessories like roof racks can create drag and reduce fuel efficiency.\n\nIf you would like more precise information, I can check the specific details of your car. Would you like me to do that?"
    },
    {
        id: 5,
        user: false,
        message: "There are several reasons why a car might consume too much fuel. Here are some common factors to consider:\n\n1. **Engine Problems**: Faulty spark plugs, dirty air filters, or malfunctioning fuel injectors can impact fuel efficiency.\n\n2. **Tire Pressure**: Under-inflated tires can increase rolling resistance, leading to higher fuel consumption.\n\n3. **Weight**: Carrying excess weight in the car can lead to increased fuel consumption.\n\n4. **Driving Habits**: Aggressive driving, rapid acceleration, and high-speed driving can all lead to poorer fuel economy.\n\n5. **Fuel Quality**: Using low-quality fuel may affect engine performance and efficiency.\n\n6. **Maintenance**: Neglecting regular maintenance can lead to decreased efficiency.\n\n7. **Air Conditioning Usage**: Using air conditioning frequently can also increase fuel consumption.\n\n8. **Poor Aerodynamics**: Added accessories like roof racks can create drag and reduce fuel efficiency.\n\nIf you would like more precise information, I can check the specific details of your car. Would you like me to do that?"
    },
]

const postData = async (formState?: string) => {
    console.log(formState);


    console.log(url);
    const accessToken = JSON.parse(localStorage.getItem("tokens") as string).accessToken
    console.log(accessToken);


    if (!url) {
        alert("end point not available")
        return
    }

    const res = await fetch(`${url}/chat/api/v1/new-message`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            conversation_id: 0,
            message: "whats up"

        })
    })
    if (!res.ok) {
        console.log("error");

    }
    const response = await res.json()
    return response
}

const suggestions = [
    {
        id: 1,
        value: "Book Appointment",
        icon: Search,

    },
    {
        id: 1,
        value: "Book Appointment",
        icon: Search,

    },
    {
        id: 1,
        value: "Book Appointment",
        icon: Search,

    },
    {
        id: 1,
        value: "Book Appointment",
        icon: Search,

    },
]
const Page = () => {

    const [message, setMessage] = useState<string>("")
    // const [chatState, setChatState] = useState([])
    const [showChats, setShowChats] = useState(false)

    const mutation = useMutation({
        mutationFn: postData,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error);


        },
    })


    const handleSendMessage = () => {
        setShowChats(true)
        if (!message) {
            return
        }
        mutation.mutate(message)

    }

    // const value = "There are several reasons why a car might consume too much fuel. Here are some common factors to consider:\n\n1. **Engine Problems**: Faulty spark plugs, dirty air filters, or malfunctioning fuel injectors can impact fuel efficiency.\n\n2. **Tire Pressure**: Under-inflated tires can increase rolling resistance, leading to higher fuel consumption.\n\n3. **Weight**: Carrying excess weight in the car can lead to increased fuel consumption.\n\n4. **Driving Habits**: Aggressive driving, rapid acceleration, and high-speed driving can all lead to poorer fuel economy.\n\n5. **Fuel Quality**: Using low-quality fuel may affect engine performance and efficiency.\n\n6. **Maintenance**: Neglecting regular maintenance can lead to decreased efficiency.\n\n7. **Air Conditioning Usage**: Using air conditioning frequently can also increase fuel consumption.\n\n8. **Poor Aerodynamics**: Added accessories like roof racks can create drag and reduce fuel efficiency.\n\nIf you would like more precise information, I can check the specific details of your car. Would you like me to do that?"
    // useEffect(() => {
    //     console.log(value.split(`\n`))

    // }, [])


    return (
        <>
            <SidebarProvider >
                <AppSidebar />
                <SidebarInset>
                    <main className='lg:min-w-[80%] w-full lg:px-8 px-4 flex flex-col justify-between  h-screen'>
                        <DashboardHeader />


                        <div className='h-[90vh] w-full '>

                            <article className={` flex-col lg:px-32 md:px-16 px-2 justify-evenly h-full transition-all duration-300 ease-in-out  ${showChats ? "scale-out hidden" : "scale-in flex"}`}>

                                <section className='text-center'>
                                    <h1 className='md:text-4xl text-2xl font-semibold'>Welcome to Vechtron AI</h1>
                                    <p className='text-[#DDC7DF] md:text-lg'>How can I help you today?</p>
                                </section>

                                <section className='h-[20%]'>

                                    <div className='bg-[var(--light-one)] rounded-lg h-full  relative'>


                                        <Textarea
                                            className='
                                    h-full w-full overflow-hidden px-0 p-4 border-1 border-transparent  focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary text-area-class p-4 resize-none'
                                            style={{
                                                background: "transparent",
                                                fontSize: "1rem"

                                            }}

                                            value={message}
                                            placeholder='send a message'
                                            onChange={e => setMessage(e.target.value)}
                                        />

                                        <span className='absolute left-[81%] bottom-[8%] flex gap-x-2 items-center'>
                                            <span className='cursor-pointer'><Globe size={18} /></span>
                                            <span className='cursor-pointer'><Radio size={18} /></span>
                                            <span className='cursor-pointer'><Paperclip size={18} /></span>
                                            <span className='cursor-pointer'><Mic size={18} /></span>
                                            <Button
                                                onClick={handleSendMessage}
                                                className='text-[var(--text-color-one)] cursor-pointer'><ArrowRight /></Button>
                                        </span>

                                    </div>
                                    <section className='flex md:justify-between justify-evenly  my-2 flex-wrap items-center gap-y-4'>
                                        {suggestions.map((item, index) => {

                                            return <aside key={index} className='bg-primary rounded-lg  py-2 px-2 flex items-center justify-center text-[0.8rem] lg:w-[23%] md:w-[30%] w-[45%] '>
                                                <span className='flex items-center '>< item.icon size={12} /> </span> <span className=' flex items-center'> {item.value}</span>
                                            </aside>
                                        })}
                                    </section>
                                </section>
                            </article>



                            {/* ON chart */}
                            <section className={`h-full w-full py-4 transition-all duration-300 ease-in-out  ${showChats ? "scale-in block" : "scale-in hidden"} `}>
                                <div className=' h-[75%] overflow-y-scroll hide-scrollbar'>

                                    {charts.map((item, index) => {

                                        return <div key={index + 1} className={`my-4 flex  ${item.user ? "justify-end" : "justify-start"}`} >

                                            <aside className={`rounded-lg px-2 py-1 leading-10 text-[0.8rem]   ${item.user ? "max-w-[50%] bg-primary" : " text-white "}`}>
                                                <ReactMarkdown
                                                    components={{
                                                        h1: ({ ...props }) => {
                                                            // console.log(node);

                                                            return <h1 className="text-3xl font-semibold mb-4" {...props} />
                                                        },
                                                        p: ({ ...props }) => {
                                                            // console.log(node);

                                                            return <p className="text-[1rem] " {...props} />
                                                        },
                                                        strong: ({ ...props }) => {
                                                            // console.log(node);

                                                            return <strong className="" {...props} />
                                                        },
                                                    }}
                                                >{item.message}</ReactMarkdown>

                                            </aside>

                                        </div>
                                    })}
                                </div>

                                <div className='bg-[var(--light-one)] rounded-lg  h-[25%] relative'>


                                    <Textarea
                                        className='
                                        h-full w-full overflow-hidden px-0 p-4 border-1 border-transparent  focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary text-area-class   p-4  resize-none '
                                        style={{
                                            background: "transparent",
                                            fontSize: "1rem"

                                        }}

                                        value={message}
                                        placeholder='send a message'
                                        onChange={e => setMessage(e.target.value)}
                                    />

                                    <span className='absolute left-[85%] bottom-[8%] flex gap-x-2 items-center'>
                                        <span className='cursor-pointer'><Globe size={18} /></span>
                                        <span className='cursor-pointer'><Radio size={18} /></span>
                                        <span className='cursor-pointer'><Paperclip size={18} /></span>
                                        <span className='cursor-pointer'><Mic size={18} /></span>
                                        <Button
                                            onClick={handleSendMessage}
                                            className='text-[var(--text-color-one)] cursor-pointer'><ArrowRight /></Button>
                                    </span>

                                </div>

                            </section>

                        </div>
                    </main>
                    {/* <Main /> */}
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}

export default Page