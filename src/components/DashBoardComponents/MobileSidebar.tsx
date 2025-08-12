"use client"
import { dispatchType } from '@/app/store'
import { closeMobileSidebar } from '@/app/store/slices/mobileSidebarSlice'
import { ChevronDown, Plus } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '../ui/button'
import { CardContent } from '../ui/card'

interface typeSecondSectionLinks<S, N> {
    id: N,
    value: S,
    iconSrc: S,
    subLinks: S[]
}

const needHelp = [
    {
        id: 1,
        value: "support",
        iconSrc: "/need-help.svg"
    },
    {
        id: 2,
        value: "Feedback",
        iconSrc: "/feedback.svg"
    },
]
const secondSectionLinks: typeSecondSectionLinks<string, number>[] = [
    {
        id: 1,
        value: "Vehicle",
        iconSrc: "/car-icon.svg",
        subLinks: ["ride", "bike"],
    },
    {
        id: 2,
        value: "Navigation",
        iconSrc: "/navigation.svg",
        subLinks: [],
    },
    {
        id: 2,
        value: "Calender",
        iconSrc: "/calender.svg",
        subLinks: [],
    },


]

const chatData = Array(9).fill("Vechtron 001 Bonnet of.....")
const MobileSidebar = () => {

    const [dropDownToShow, setDropDownToShow] = useState<string[]>([])
    const [chatHistory, setChatHistory] = useState([...chatData].splice(0, 3))
    const [showAllChatHistory, setShowAllChatHistory] = useState(false)


    const dispatch = useDispatch<dispatchType>()
    useEffect(() => {
        console.log(dropDownToShow);

    }, [dropDownToShow])

    useEffect(() => {


        if (showAllChatHistory) {
            setChatHistory([...chatData])
        }
        else {
            setChatHistory([...chatData].splice(0, 3))
        }
        console.log(showAllChatHistory);

    }, [showAllChatHistory])




    return (
        <div className='w-[50%] bg-background h-screen  space-y-2 md:hidden py-4 border-r-[#1B1F29] border-r-1 sidebar fixed left-0 z-50 mobile-sidebar'>
            <header className='flex justify-between items-center px-4'>
                <Image width={40} height={20} alt='logo' className='object-contain' src={"/logo-two.svg"} />
                <Button
                    onClick={() => dispatch(closeMobileSidebar())}
                    className='cursor-pointer'
                    variant={"ghost"}>
                    <Image width={25} height={20} alt='logo' className='object-contain' src={"/toggle-side-bar.svg"} />
                </Button>
            </header>
            {/* New chat */}
            <div className='px-4'>
                <Button className='w-full'><Plus />New Chat</Button>
            </div>

            {/* chat history */}
            <div className=' my-4 px-4'>
                <h1 className='text-[var(--stroke)] text-[0.7rem] uppercase my-2'>chat history</h1>
                <div className='transition-height duration-500 ease-in-out  '>
                    {chatHistory.map((item, index) => {

                        return <Button key={index + 1} variant={"ghost"} className='w-full flex justify-start px-1 rounded-sm font-light text-[0.75rem]' >{item}</Button>
                    })}
                </div>
                <div>

                    <Button
                        onClick={() => setShowAllChatHistory(prev => !prev)}
                        className='px-0 cursor-pointer font-light'
                        style={{
                            background: "transparent"
                        }}
                        variant={"ghost"}>SEE MORE</Button>
                </div>
            </div>
            {/* Vehicles */}

            <div className='border-t-1 border-[#1B1F29] py-2 px-4'>
                {secondSectionLinks.map((item, index) => {

                    return <div key={index + 1} className='w-full'>
                        <Button
                            onClick={() => {
                                if (dropDownToShow.some(dropDownItem => dropDownItem == item.value.toLocaleLowerCase())) {
                                    setDropDownToShow(() => {
                                        return dropDownToShow.filter(dropDownItem => dropDownItem !== item.value.toLocaleLowerCase())
                                    })

                                }
                                else {
                                    setDropDownToShow([...dropDownToShow, item.value.toLocaleLowerCase()])
                                }
                            }}
                            className='w-full flex justify-between rounded-sm px-1 cursor-pointer font-light' variant={"ghost"} style={{ textAlign: "start" }} >

                            <span className='flex gap-x-2'><Image src={item.iconSrc} alt={item.value} className='w-[18px] h-[18px]' width={18} height={18} />{item.value}</span>
                            {item.subLinks.length > 0 && <span><ChevronDown /></span>}
                        </Button>
                        <CardContent className=' px-0'>

                            {dropDownToShow.some(dropDownItem => dropDownItem == item.value.toLocaleLowerCase()) && item.subLinks.map((subItem, index) => {

                                return <Button key={index + 1} variant={"ghost"} className='w-full flex justify-start px-1 rounded-sm font-light' >{subItem}</Button>
                            })}
                        </CardContent>
                    </div>
                })}
            </div>

            {/* need help */}

            <div className=' my-4 px-4'>
                <h1 className='text-[var(--stroke)] text-[0.7rem] uppercase my-2'>Need Help?</h1>
                <div className='flex flex-col'>
                    {needHelp.map((item, index) => {

                        return <Button
                            key={index + 1}
                            className='w-full flex justify-between rounded-sm px-1 cursor-pointer font-light' variant={"ghost"} style={{ textAlign: "start" }} >

                            <span className='flex gap-x-2'><Image src={item.iconSrc} alt={item.value} className='w-[18px] h-[18px]' width={18} height={18} />{item.value}</span>

                        </Button>
                    })}
                </div>
                <div>
                </div>
            </div>

            {/* info */}

            <Button

                className='w-full flex justify-between rounded-sm px-1 cursor-pointer font-light px-4' variant={"ghost"} style={{ textAlign: "start" }} >
                <p className='flex items-center gap-x-2 text-[0.7rem]'>
                    <Image src={"white.jpg"} alt={"picture"} className='w-[25px] h-[25px] rounded-full' width={25} height={25} />
                    <span className='flex gap-x-2 flex-col '>
                        <span>osagie</span>
                        <span>edosaosagieev</span>
                    </span>
                </p>
                <span><ChevronDown /></span>
            </Button>

        </div>
    )
}

export default MobileSidebar