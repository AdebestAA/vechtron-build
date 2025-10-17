import React from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { ArrowRight, Globe, Mic, Paperclip, Radio } from 'lucide-react'
import { useSideChatStore } from '@/app/store/zustand-stores/use-show-side-chat'

const AsideChat = () => {
    const { closeSideChat } = useSideChatStore()
    return (

        <>
            <div className='min-h-[90vh] max-h-screen  flex flex-col justify-between py-2'>

                <div className=''>
                    <h1 className='font-semibold text-lg'>Chat AI</h1>
                    {/* <div className=''>
                    {chatAiData.map((item, index) => {

                    return <Button className='font-light w-full px-0 my-2 text-[var(--text-color-one)] flex items-center justify-start pl-16 py-6' key={index + 1}>
                    
                    <img src={item.iconSrc} alt={item.value} />
                    <span className='text-left'>{item.value}</span>
                    </Button>
                    })}
                </div> */}
                </div>
                {/* chat */}
                <div className='bg-[var(--light-one)] rounded-lg  h-[25%] relative'>
                    <Textarea
                        className='
                                h-full w-full overflow-hidden  p-4 border-1 border-transparent  focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary text-area-class   p-4  resize-none '
                        style={{
                            background: "transparent",
                            fontSize: "1rem"

                        }}
                        defaultValue={"Lorem ipsum dolor sit amet consecte tur Amet velit amet "}
                    />
                    <aside className='absolute  bottom-[8%] flex px-4 justify-between  w-full'>
                        <div className='flex items-center justify-between w-[50%] '>
                            <span className='cursor-pointer'><Globe size={18} /></span>
                            <span className='cursor-pointer'><Radio size={18} /></span>
                            <span className='cursor-pointer'><Paperclip size={18} /></span>
                            <span className='cursor-pointer'><Mic size={18} /></span>
                        </div>
                        <Button
                            onClick={closeSideChat}
                            className='text-[var(--text-color-one)] cursor-pointer'><ArrowRight /></Button>
                    </aside>

                </div>
            </div>
        </>


    )
}

export default AsideChat