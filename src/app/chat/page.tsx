"use client"
import React, { useState } from 'react'
import {
    SidebarInset,
    SidebarProvider
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/app-sidebar"
import DashboardHeader from '@/components/DashBoardComponents/dashboard-header'
import { ArrowRight, Globe, Mic, Paperclip, Radio, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
const url = process.env.NEXT_PUBLIC_AI_API_URL as string

import ReactMarkdown from "react-markdown";
import { ChatSpinner } from '@/utils/Spinner'
import { useChatStore } from '../store/zustand-stores/useChatStore'







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
    const { addMessage, chatObject } = useChatStore()

    const mutation = useMutation({
        mutationFn: postData,
        onSuccess: (data) => {
            console.log(data);
            if (data.status == "success") {
                console.log(data.data.conversation.uuid);
                addMessage({ content: data.data.message.content, role: "assitant" })
                window.history.pushState({}, "", `/chat/${data.data.conversation.uuid}`)

            }
        },
        onError: (error) => {
            console.error(error);


        },
    })




    async function postData(formState: string) {
        console.log(formState);


        console.log(url);
        const accessToken = JSON.parse(localStorage.getItem("tokens") as string).accessToken
        console.log(accessToken);


        if (!url) {
            alert("end point not available")
            return
        }

        const res = await fetch(`${url}/chat/api/v1/chat`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                conversation_id: 0,
                message: formState

            })
        })
        if (!res.ok) {
            console.log("error");

        }
        const response = await res.json()
        return response
    }

    const handleSendMessage = async () => {
        // const accessToken = JSON.parse(localStorage.getItem("tokens") as string).accessToken
        // const res = await fetch(`${url}/chat/api/v1/chat/stream`, {
        //     method: "POST",
        //     headers: {
        //         // text/event-stream
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${accessToken}`
        //     },
        //     body: JSON.stringify({
        //         "conversation_id": "490e271e-e871-40ab-bdfa-d8363fd115ed",
        //         "message": "I'm glad you found it interesting! If you have any more questions or if there's anything else you'd like to know, feel free to ask."
        //     })
        // })




        // window.history.pushState({}, "", "/chat/skkkds")



        if (!message) {
            console.log("yea");

            return
        }

        setMessage("")
        mutation.mutate(message)
        addMessage({ content: message, role: "user" })
        setShowChats(true)

    }




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

                                <section className='h-[25%]'>

                                    <div className='focus-visible:bg-[var(--light-one)] rounded-lg h-full ring ring-primary pt-2 pb-4'>


                                        <textarea
                                            className='
                                        h-[70%] w-full overflow-x-hidden hide-scrollbar outline-none  rounded-lg  border-1 border-transparent  y text-area-class   p-4  resize-none '
                                            style={{
                                                background: "transparent",
                                                fontSize: "1rem"

                                            }}

                                            value={message}
                                            placeholder='send a message'
                                            onChange={e => setMessage(e.target.value)}
                                        />

                                        <div className='flex gap-x-2 justify-end items-center h-[30%] px-3'>
                                            <span className='cursor-pointer'><Globe size={18} /></span>
                                            <span className='cursor-pointer'><Radio size={18} /></span>
                                            <span className='cursor-pointer'><Paperclip size={18} /></span>
                                            <span className='cursor-pointer'><Mic size={18} /></span>
                                            <Button
                                                disabled={!message ? true : false}
                                                onClick={handleSendMessage}
                                                className='text-[var(--text-color-one)] cursor-pointer'>
                                                {mutation.isPending ? <ChatSpinner /> : <ArrowRight />}
                                                {/* <ChatSpinner /> */}

                                            </Button>
                                        </div>


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
                            <section className={`h-full w-full py-4 transition-all duration-300 ease-in-out scale-in block {/* ${showChats ? "scale-in block" : "scale-in hidden"} */} `}>
                                {/* ${showChats ? "scale-in block" : "scale-in hidden"} */}
                                <div className=' h-[75%] overflow-y-scroll hide-scrollbar'>

                                    {chatObject.length > 0 && chatObject.map((item, index) => {

                                        return <div key={index + 1} className={`my-4 flex  ${item.role == "user" ? "justify-end" : "justify-start"}`} >

                                            <aside className={`rounded-lg px-2 py-1 leading-10 text-[0.8rem]   ${item.role == "user" ? "max-w-[50%] bg-primary" : " text-white "}`}>
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
                                                >{item.content}</ReactMarkdown>

                                            </aside>

                                        </div>
                                    })}
                                </div>


                                <div className=' h-[25%] rounded-lg  ring ring-primary pt-2 pb-4 px-2  overflow-hidden'>


                                    <textarea
                                        className='h-[75%] w-full overflow-x-hidden hide-scrollbar outline-none  rounded-lg  border-1 border-transparent  y text-area-class    resize-none px-4 '
                                        style={{
                                            background: "transparent",
                                            fontSize: "1rem"

                                        }}

                                        value={message}
                                        placeholder='send a message'
                                        onChange={e => setMessage(e.target.value)}
                                    />

                                    <div className='flex gap-x-2 justify-end items-center h-[25%]'>
                                        <span className='cursor-pointer'><Globe size={18} /></span>
                                        <span className='cursor-pointer'><Radio size={18} /></span>
                                        <span className='cursor-pointer'><Paperclip size={18} /></span>
                                        <span className='cursor-pointer'><Mic size={18} /></span>
                                        <Button
                                            onClick={handleSendMessage}
                                            className='text-[var(--text-color-one)] cursor-pointer'>
                                            {mutation.isPending ? <ChatSpinner /> : <ArrowRight />}
                                            {/* <ChatSpinner /> */}

                                        </Button>
                                    </div>


                                </div>


                                {/*                             <div className='bg-[var(--light-one)] rounded-lg  h-[25%] relative'>
                        
                        
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
                        
                                                        </div> */}

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