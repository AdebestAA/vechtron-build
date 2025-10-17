"use client"
import { AppSidebar } from "@/components/app-sidebar"
import Main from "@/components/DashBoardComponents/Main"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { PageLoader } from "@/utils/page-loader"
import { CarFront, MessageCircleMore } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
  const [userExist, setUserExist] = useState<boolean>(true)
  // const router = useRouter()
  // useEffect(() => {
  //   if (!localStorage.getItem("userInfo")) {
  //     router.push("/sign-in")
  //   }
  //   else {
  //     setUserExist(true)
  //   }
  // }, [router])

  return (
    <>
      {userExist ? (
        <>
          <div className="md:hidden flex items-end flex-col gap-y-2  w-full fixed top-[50%] z-100  px-3">
            <Button className="text-white shadow-2xl"><CarFront /></Button>
            {/* <br /> */}
            <Button className="text-white shadow-2xl zoom"><MessageCircleMore /> chatA1 </Button>


          </div>
          <SidebarProvider >
            <AppSidebar />
            <SidebarInset>
              <Main />
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
