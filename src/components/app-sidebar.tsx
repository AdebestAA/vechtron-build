"use client"

import * as React from "react"
import {
  AudioWaveform,
  Calendar,
  Command,
  Contact,

  GalleryVerticalEnd,
  Headset,
  Navigation2Icon,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { useSelector } from "react-redux"
import { RootStoreType } from "@/app/store"


const data = {
  user: {
    name: "osagie",
    email: "edosaosagieev",
    avatar: "/white.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  needHelp: [
    {
      title: "Support",
      url: "#",
      icon: Contact,
      items: [],
    },
    {
      title: "Feedback",
      url: "#",
      icon: Headset,
      items: [],
    },
  ],
  navMain: [
    {
      title: "Vehicle",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Lexus",
          url: "#",
        },
        {
          title: "Benz",
          url: "#",
        },
        {
          title: "Camry",
          url: "#",
        },
      ],
    },
    {
      title: "Navigation",
      url: "#",
      icon: Navigation2Icon,
      items: [],
    },
    {
      title: "Calender",
      url: "#",
      icon: Calendar,
      items: [],
    },

  ],
  projects: [
    {
      name: "Vechtron 001 Bonnet of.....",
      url: "#",
      // icon: Frame,
    },
    {
      name: "Vechtron 001 Bonnet of.....",
      url: "#",
      // icon: PieChart,
    },
    {
      name: "Vechtron 001 Bonnet of.....",
      url: "#",
      // icon: Map,
    },
    {
      name: "Vechtron 001 Bonnet of.....",
      url: "#",
      // icon: Map,
    },
    {
      name: "Vechtron 001 Bonnet of.....",
      url: "#",
      // icon: Map,
    },
    {
      name: "Vechtron 001 Bonnet of.....",
      url: "#",
      // icon: Map,
    },
    {
      name: "Vechtron 001 Bonnet of.....",
      url: "#",
      // icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const mobileSidebarState = useSelector((store: RootStoreType) => {

    return store.mobileSidebarSlice
  })
  return (
    <Sidebar collapsible="icon"   {...props}>
      {/* header */}

      <SidebarHeader className={`flex flex-row justify-between items-center ${mobileSidebarState ? "lg:justify-center justify-end" : ""}`}>
        {!mobileSidebarState && <Image
          width={40}
          height={20}
          alt="logo"
          src="/logo-two.svg"
          className="object-contain lg:inline hidden"
        />}
        <SidebarTrigger className="-ml-1" />
      </SidebarHeader>



      {/* <SidebarMenuButton className="">
        <Button className="w-full text-white"></Button>
    
      </SidebarMenuButton> */}
      {/* content */}
      <SidebarContent className="">

        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
        <NavMain items={data.needHelp} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
