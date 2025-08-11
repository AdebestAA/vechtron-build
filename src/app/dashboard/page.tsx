import { AppSidebar } from "@/components/app-sidebar"
import Main from "@/components/DashBoardComponents/Main"
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

export default function Page() {
  return (
    <SidebarProvider >
      <AppSidebar />
      <SidebarInset>
<Main/>
      </SidebarInset>
    </SidebarProvider>
  )
}
