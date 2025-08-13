import { AppSidebar } from "@/components/app-sidebar"
import Main from "@/components/DashBoardComponents/Main"
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider >
      <AppSidebar />
      <SidebarInset>
        <Main />
      </SidebarInset>
    </SidebarProvider>
  )
}
