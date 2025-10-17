"use client"
import { ChevronDown, Pencil, Plus, } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'

import gsap from 'gsap'
import { useSelector } from 'react-redux'
import { RootStoreType } from '@/app/store'
import OverviewComponent from './OverviewComponent'
import Maintenance from './Maintenance'
import DashboardHeader from './dashboard-header'
import SideChatComponent from './side-chat-component'
import DashBoardImageDisplay from './dashboard-image-display'
import AsideChat from './aside-chat'
import { useSideChatStore } from '@/app/store/zustand-stores/use-show-side-chat'
import { useRouter } from 'next/navigation'



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
const Main = () => {
  // const { theme, setTheme } = useTheme()
  const [currBtn, setCurrBtn] = useState("maintenance")
  // const dispatch = useDispatch<dispatchType>()
  const mobileSidebarState = useSelector((store: RootStoreType) => {

    return store.mobileSidebarSlice
  })
  const { sideChatState, openSideChat, closeSideChat } = useSideChatStore()

  const router = useRouter()


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
  }, [mobileSidebarState,])
  return (
    <div className='lg:min-w-[80%] w-full   flex '>
      <section className={`lg:px-8 px-4 py-4 transition-[width] duration-500 ease-in-out ${sideChatState ? "md:w-[70%] " : "w-full"} `}>

        {/* header */}
        <DashboardHeader />

        {/* name of vehicle */}

        <div className='flex justify-between mt-4'>
          <div className='flex flex-col'>
            <Button variant={"ghost"} className='px-0'>
              <span className='text-2xl font-semibold'>2024 Rav4 Toyota</span>
              <span><ChevronDown /></span></Button>
            <Button variant={"ghost"} className='px-0 flex justify-start text-sm font-light'>
              <span>Edit Vehicle</span>
              <span><Pencil /></span></Button>

          </div>
          {/* add vehicle */}
          <>
            <Button onClick={() => router.push("/onboarding")} className='text-[var(--text-color-one)] lg:hidden'><Plus /></Button>
            <Button
              onClick={() => router.push("/onboarding")}
              className='text-[var(--text-color-one)] lg:flex px-2 hidden'><Plus /> Add new Vehicle</Button>
          </>
        </div>

        {/*  */}
        <div className='flex flex-col lg:flex-row gap-y-4 lg:gap-x-6'>
          {/* car image section */}
          <section
            onClick={closeSideChat}
            className={`${sideChatState ? "lg:w-full" : "lg:w-[70%]"} flex flex-col gap-y-4 transition-[width] duration-500 ease-in-out`}>
            <DashBoardImageDisplay />
          </section>
          {/* Chat section */}
          <section
            onClick={openSideChat}
            className={`bg-[var(--light-one)] p-4 rounded-lg  flex flex-col justify-between transition-[width] duration-500 ease-in-out ${sideChatState ? "w-0 hidden" : "md:w-[30%] md:block hidden "} `}>
            <SideChatComponent />
          </section>


        </div>

        {/* alert, overview, Maintanance */}

        <div className='my-6'>
          <header className='space-x-2'>
            <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => setCurrBtn(e.currentTarget.textContent?.toLocaleLowerCase() || "")}
              variant={currBtn == "maintenance" ? "default" : "ghost"}
            >Maintanance</Button>
            <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => setCurrBtn(e.currentTarget.textContent?.toLocaleLowerCase() || "")}
              variant={currBtn == "overview" ? "default" : "ghost"}
            >Overview</Button>
            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => setCurrBtn(e.currentTarget.textContent?.toLocaleLowerCase() || "")}
              variant={currBtn == "alert" ? "default" : "ghost"}>Alert</Button>
          </header>

          <>
            {currBtn == "overview" ? <OverviewComponent /> : currBtn == "maintenance" ? <Maintenance /> : ""}
          </>
        </div>
      </section>
      <section className={`bg-[var(--light-one)] px-4 py-4 flex flex-col justify-between min-h-screen transition-[width] duration-500 ease-in-out ${sideChatState ? "lg:w-[30%] block" : "w-0 hidden"}`}>
        <AsideChat />
      </section>
    </div>
  )
}

export default Main