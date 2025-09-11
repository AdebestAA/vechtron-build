"use client"

import React, { useEffect } from 'react'

import gsap from 'gsap'
import { useSelector } from 'react-redux'
import { RootStoreType } from '@/app/store'
import DashboardHeader from './dashboard-header'
import SideChatComponent from './side-chat-component'
import EngineHealth from './engine-health'
import MaintananceHistory from './MaintananceConponents/MaintananceHistory'
import LineChartComponent from './line-chart-component'



export const health = [
    {
        id: 1,
        percent: "20%",
        value: "overall health"
    },
    {
        id: 1,
        percent: "20%",
        value: "overall health"
    },
    {
        id: 1,
        percent: "20%",
        value: "overall health"
    },
    {
        id: 1,
        percent: "20%",
        value: "overall health"
    },
]

export const chatAiData = [
    {
        id: 1,
        value: "Quick Vehicle Analysis",
        iconSrc: "/search.svg"
    },
    {
        id: 2,
        value: "Add maintenance",
        iconSrc: "/search.svg"
    },
    {
        id: 1,
        value: "Quick Vehicle Analysis",
        iconSrc: "/search.svg"
    },
    {
        id: 2,
        value: "Add maintenance",
        iconSrc: "/search.svg"
    },
]
const AboutVehicleMainComponent = () => {
    // const { theme, setTheme } = useTheme()
    // const [currBtn, setCurrBtn] = useState("overview")
    // const dispatch = useDispatch<dispatchType>()
    const mobileSidebarState = useSelector((store: RootStoreType) => {

        return store.mobileSidebarSlice
    })



    useEffect(() => {
        if (mobileSidebarState) {
            gsap.to(document.querySelector(".mobile-sidebar"), {
                left: "0%",
                display: "block",
                duration: 0.5

            })
        }
        else {
            gsap.to(document.querySelector(".mobile-sidebar"), {
                left: "-50%",
                display: "none",
                duration: 0.5

            })

        }
    }, [mobileSidebarState])
    return (
        <div className='lg:min-w-[80%] w-full lg:px-8 px-4 my-4 '>
            {/* header */}
            <DashboardHeader />

            {/* name of vehicle */}



            {/*  */}
            <div className='flex flex-col lg:flex-row gap-y-4 lg:gap-x-6 my-8'>
                {/* car image section */}
                <section className='lg:w-[70%] flex flex-col gap-y-4'>
                    <EngineHealth />
                </section>
                {/* Chat section */}
                <section className='bg-[var(--light-one)] p-4 rounded-lg lg:w-[30%] flex flex-col justify-between'>
                    <SideChatComponent />
                </section>
            </div>


            <div>
                <MaintananceHistory />
            </div>
            <div>
                <LineChartComponent />
            </div>
        </div>
    )
}

export default AboutVehicleMainComponent