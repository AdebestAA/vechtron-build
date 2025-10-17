import { AppSidebar } from '@/components/app-sidebar'
import DashboardHeader from '@/components/DashBoardComponents/dashboard-header'
import MaintananceSchedule from '@/components/DashBoardComponents/MaintananceConponents/MaintananceSchedule'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const Page = () => {
    return (
        <>
            <SidebarProvider >
                <AppSidebar />
                <SidebarInset>
                    <main className='lg:min-w-[80%] w-full  px-4 flex flex-col justify-between  h-screen'>
                        <DashboardHeader />

                        <MaintananceSchedule />
                        {/* <div className='h-[90vh] w-full '>

                         

                        </div> */}
                    </main>
                    {/* <Main /> */}
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}

export default Page