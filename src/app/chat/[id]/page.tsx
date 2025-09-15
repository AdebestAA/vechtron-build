"use client"
import React, { useEffect, useRef, useState } from 'react'
import {
    SidebarInset,
    SidebarProvider
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/app-sidebar"
import DashboardHeader from '@/components/DashBoardComponents/dashboard-header'

import { ArrowRight, Globe, Mic, Paperclip, Radio } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMutation, useQuery } from '@tanstack/react-query'
const url = process.env.NEXT_PUBLIC_AI_API_URL as string

import ReactMarkdown from "react-markdown";
import Spinner, { ChatSpinner } from '@/utils/Spinner'
import { useParams } from 'next/navigation'
import { useChatStore } from '@/app/store/zustand-stores/useChatStore'





const Page = () => {



    const [message, setMessage] = useState<string>("")
    const param: { id: string } = useParams()
    const { id }: { id: string } = param




    // const [chatState, setChatState] = useState([])
    // const [showChats, setShowChats] = useState(false)
    const { updateChatObj, addMessage, chatObject } = useChatStore()
    const containerEndRef = useRef<HTMLDivElement | null>(null)

    const { data, isLoading, isError } = useQuery({
        queryFn: getConversations,
        queryKey: ["conversation", id,]
    });
    // const {data,isLoading,isError} = useQuery({
    //     queryKey:["data"],
    //     queryFn:getConversations,

    // })
    const mutation = useMutation({
        mutationFn: postData,
        onSuccess: (data) => {

            if (data.status == "success") {
                // console.log(data.data.conversation.uuid);

                addMessage({ content: data.data.message.content, role: "assitant" })





            }
        },
        onError: (error) => {
            console.error(error);


        },
    })

    useEffect(() => {
        if (!containerEndRef.current) {
            return
        }
        containerEndRef.current?.scrollIntoView({
            behavior: "smooth"
        })
        console.log(chatObject);

    }, [containerEndRef, chatObject])
    async function postData(formState: string) {

        const accessToken = JSON.parse(localStorage.getItem("tokens") as string).accessToken




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
                conversation_id: param.id,
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
        const accessToken = JSON.parse(localStorage.getItem("tokens") as string).accessToken
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










        // setShowChats(true)
        if (!message) {


            return
        }
        setMessage("")
        mutation.mutate(message)
        addMessage({ content: message, role: "user" })
        // setShowChats(true)

    }



    async function getConversations({ queryKey }: { queryKey: [string, string] }) {


        const accessToken = JSON.parse(localStorage.getItem("tokens") as string).accessToken

        console.log(accessToken);



        if (!url) {
            alert("end point not available")
            return
        }



        const res = await fetch(`${url}/chat/api/v1/conversations/${queryKey[1]}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },

        })
        if (!res.ok) {
            console.log("error");

        }
        const response = await res.json()
        return response


    }


    useEffect(() => {
        // console.log(data?.data?.messages, "messages");
        // console.log(isLoading, "isLoading");

        if (isError) {
            alert("something went wrong")
            return
        }
        updateChatObj(data?.data?.messages)


    }, [isLoading, updateChatObj, data])


    return (
        <>
            <SidebarProvider >
                <AppSidebar />
                <SidebarInset>
                    <main className='lg:min-w-[80%] w-full lg:px-8 px-4 flex flex-col justify-between  h-screen'>
                        <DashboardHeader />


                        <div className='h-[90vh] w-full '>


                            {isError && (

                                <div className='h-full w-full py-4 flex items-center justify-center '>
                                    <h1>Something went wrong,please reload the page</h1>
                                </div>
                            )}

                            {isLoading ? (
                                <div className='h-full w-full py-4 flex flex-col items-center justify-center '>
                                    <Spinner />
                                    <h1>Loading chat</h1>
                                </div>
                            ) : <section className={`h-full w-full py-4 transition-all duration-300 ease-in-out scale-in block  `}>

                                <div className=' h-[75%] overflow-y-scroll hide-scrollbar'>

                                    {chatObject?.length > 0 && chatObject.map((item, index) => {

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

                                            <div ref={containerEndRef} />


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



                            </section>}

                        </div>
                    </main>
                    {/* <Main /> */}
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}

export default Page