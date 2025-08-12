"use client"
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux";
import { dispatchType, RootStoreType } from "./store";
import { closeModal, openModal } from "./store/slices/modalSlice";

export default function Home() {
  const dispatch = useDispatch<dispatchType>()
  // const modalState = useSelector((store:RootStoreType)=>{

  //   return store.modalReducer
  // })
  const isOpen = useSelector((state: RootStoreType) => state.modalReducer)

  return (
    <div className="">
{/* <Link href={"/sign-up"}>Sign up</Link>
<br />
<Link href={"/sign-in"}>Login</Link>
<br />
<Link href={"/dashboard"}>Dashboard</Link> */}
  <Dialog open={isOpen} onOpenChange={() => dispatch(closeModal())}>
      <form>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
    </div>
  );
}


// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// export function DialogDemo() {
//   return (
//     <Dialog>
//       <form>
//         <DialogTrigger asChild>
//           <Button variant="outline">Open Dialog</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Edit profile</DialogTitle>
//             <DialogDescription>
//               Make changes to your profile here. Click save when you&apos;re
//               done.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4">
//             <div className="grid gap-3">
//               <Label htmlFor="name-1">Name</Label>
//               <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="username-1">Username</Label>
//               <Input id="username-1" name="username" defaultValue="@peduarte" />
//             </div>
//           </div>
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DialogClose>
//             <Button type="submit">Save changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </form>
//     </Dialog>
//   )
// }
