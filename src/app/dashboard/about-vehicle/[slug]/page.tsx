"use client"
import { AppSidebar } from "@/components/app-sidebar"

import AboutVehicleMainComponent from "@/components/DashBoardComponents/about-vehicle-main"

import {
    SidebarInset,
    SidebarProvider
} from "@/components/ui/sidebar"
import { PageLoader } from "@/utils/page-loader"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
    const [userExist, setUserExist] = useState<boolean>(true)
    // const router = useRouter()
    // useEffect(() => {
    //     if (!localStorage.getItem("userInfo")) {
    //         router.push("/sign-in")
    //     }
    //     else {
    //         setUserExist(true)
    //     }
    // }, [router])

    return (
        <>
            {userExist ? (
                <>
                    <SidebarProvider >
                        <AppSidebar />
                        <SidebarInset>
                            <AboutVehicleMainComponent />
                        </SidebarInset>
                    </SidebarProvider>
                </>
            ) : (<>
                <PageLoader />
            </>)}
            {/* <PageLoader /> */}

        </>
    )
}
