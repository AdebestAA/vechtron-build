"use client"

import { useChatHistory } from "@/app/store/zustand-stores/useChatStore"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,

  SidebarMenuButton,
  SidebarMenuItem,

} from "@/components/ui/sidebar"
import Spinner from "@/utils/Spinner"
import { useQuery } from "@tanstack/react-query"
const url = process.env.NEXT_PUBLIC_AI_API_URL as string

import { useEffect, useState } from "react"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string

  }[]
}) {


  console.log(projects);

  // const { isMobile } = useSidebar()
  const [showAll, setShowAll] = useState<boolean>(false)

  const { data: historyData, isLoading: historyIsLoading, isError: histroyIsError, error: historyError, isSuccess: historyIsSuccess } = useQuery({
    queryKey: ["history"],
    queryFn: getHistory
  })

  console.log(historyError);

  const { addHistory, chatHistory } = useChatHistory()

  async function getHistory() {


    const accessToken = JSON.parse(localStorage.getItem("tokens") as string).accessToken




    if (!url) {
      alert("end point not available")
      return
    }



    const res = await fetch(`${url}/chat/api/v1/conversations`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },

    })
    if (!res.ok) {
      console.log("error");

    }
    const response = await res.json()
    return response


  }


  useEffect(() => {

    if (historyIsSuccess) {
      addHistory(historyData?.data?.conversations)

    }

  }, [historyIsLoading, addHistory])

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden ">
      <SidebarGroupLabel className="text-[0.7rem]">CHAT HISTORY</SidebarGroupLabel>
      <SidebarMenu className="min-h-[150px] flex flex-col  justify-between">

        {/* loading data */}
        {historyIsLoading && (
          <div className="flex flex-col items-center justify-center h-full">

            <Spinner />
            Loading..
          </div>
        )}

        {/* if an error occurs */}
        {histroyIsError && (
          <div className="flex flex-col items-center justify-center h-full">


            <p>Unable to load chats</p>
          </div>
        )}

        {/* an empty [] returned */}
        {historyIsSuccess && chatHistory.length < 1 && (
          <div className="flex flex-col items-center justify-center h-full">
            <p>You currently dont have any chat</p>
          </div>
        )}
        {/* [] more than one */}
        {chatHistory.length > 0 && chatHistory.filter(((item, index) => {
          if (showAll) {
            return index
          }
          else {
            return index < 3
          }

        })).map((item, index) => (
          <SidebarMenuItem key={index + 1}>
            <SidebarMenuButton asChild>
              <a href={`/chat/${item.uuid}`}>

                <span>{item.title.length > 30 ? item.title.slice(0, 25) + "..." : item.title}</span>
              </a>
            </SidebarMenuButton>

          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            {/* <MoreHorizontal className="text-sidebar-foreground/70" /> */}
            {chatHistory.length > 2 && <span className="text-[0.7rem]" onClick={() => setShowAll(!showAll)}>{showAll ? "COLLAPSE" : "SEE MORE"}</span>}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
