"use client"
import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'
import { BellDot, Moon, Sun } from 'lucide-react'

const DashboardHeader = () => {
    const { theme, setTheme } = useTheme()
    const toggleTheme = () => {
        if (theme == "dark") {
            setTheme("light")
        }
        else {
            setTheme("dark")
        }
    }
    return (
        <header className='flex justify-between max-h-[15%] items-center'>
            <h1 className='font-semibold'>Vehicle</h1>
            <>
                {/* btn for mobile */}
                <div className='mdlg:hidden block'>
                    <Button className='cursor-pointer' variant={"ghost"} onClick={toggleTheme} >{theme == "dark" ? <Sun /> : <Moon />}</Button>
                    <SidebarTrigger className="-ml-1" />
                    {/* <Button 
            onClick={()=>{
             
            if (mobileSidebarState) {
              dispatch(closeMobileSidebar())
            }
            else{
              
              dispatch(openMobileSidebar())
            }
            
            
              }}
             
              className='md:hidden cursor-pointer' variant={"ghost"}>{ mobileSidebarState ?<X/>: <Menu/>}</Button> */}
                </div>
                <div className='mdlg:block hidden'>
                    <Button className='cursor-pointer mx-1 p-3' variant={"ghost"}  ><BellDot /></Button>
                    <Button className='cursor-pointer' variant={"ghost"} onClick={toggleTheme} >{theme == "dark" ? <Sun /> : <Moon />}</Button>
                    <Button className='cursor-pointer bg-[#DDC7DF] mx-1 p-3'  >Upgrade</Button>
                    {/* {Array(4).fill("").map((item, index) => {

                        return <Button key={index} className='cursor-pointer bg-[#DDC7DF] mx-1 p-3' onClick={toggleTheme} >{index == 0 ? "Upgrade" : "#1"}</Button>
                    })} */}
                </div>
            </>
        </header>
    )
}

export default DashboardHeader