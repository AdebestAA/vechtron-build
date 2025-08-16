"use client"
import { AppSidebar } from "@/components/app-sidebar"
import Main from "@/components/DashBoardComponents/Main"
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar"
import { PageLoader } from "@/utils/page-loader"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
  const [userExist, setUserExist] = useState<boolean>(false)
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      router.push("/sign-in")
    }
    else {
      setUserExist(true)
    }
  }, [])

  return (
    <>
      {/* {userExist ? (
        <>
          <SidebarProvider >
            <AppSidebar />
            <SidebarInset>
              <Main />
            </SidebarInset>
          </SidebarProvider>
        </>
      ) : (<>
        <PageLoader />
      </>)} */}
      <PageLoader />

    </>
  )
}
