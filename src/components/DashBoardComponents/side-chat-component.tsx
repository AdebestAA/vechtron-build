import React from 'react'
import { chatAiData } from './Main'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { ArrowRight, Globe, Mic, Paperclip, Radio } from 'lucide-react'

const SideChatComponent = () => {
    return (
        <>
            {/* first section */}
            <div>
                <h1 className='font-semibold text-lg'>Chat AI</h1>
                <div className=''>
                    {chatAiData.map((item, index) => {

                        return <Button className='font-light w-full px-0 my-2 text-[var(--text-color-one)] flex items-center justify-start pl-16 py-6' key={index + 1}>

                            <img src={item.iconSrc} alt={item.value} />
                            <span className='text-left'>{item.value}</span>
                        </Button>
                    })}
                </div>
            </div>
            {/* chat */}
            <div className='bg-[var(--light-one)] rounded-lg p-2'>
                <Textarea
                    className=' border-none h-[70px] overflow-hidden px-0 border-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    style={{
                        background: "transparent",
                        resize: "none"
                    }}
                    defaultValue={"Lorem ipsum dolor sit amet consecte tur Amet velit amet "}
                />
                <footer className='flex justify-between'>
                    <section className='flex justify-between gap-x-3 items-center'>
                        <span className='cursor-pointer'><Globe size={18} /></span>
                        <span className='cursor-pointer'><Radio size={18} /></span>
                        <span className='cursor-pointer'><Paperclip size={18} /></span>
                        <span className='cursor-pointer'><Mic size={18} /></span>
                    </section>
                    <Button className='text-[var(--text-color-one)] cursor-pointer'><ArrowRight /></Button>
                </footer>
            </div>
        </>
    )
}

export default SideChatComponent