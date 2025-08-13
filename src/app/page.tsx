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
      <main className="relative isolate min-h-screen bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(600px_300px_at_50%_-20%,color-mix(in_oklab,var(--color-primary)_28%,transparent),transparent_60%)]"
        />

        <section className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md ring-1 ring-border">
            <span className="text-xl font-semibold">V</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Turn Every Drive Into
            <br />
            a Smarter Journey.
          </h1>
          <p className="mt-4 max-w-prose text-balance text-base text-muted-foreground md:text-lg">
            Unlock the ultimate driving experience with our Ai-powered assistant. Effortless, efficient, and smart
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/sign-up"
              className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
            >
              Create account
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex w-full items-center justify-center rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
            >
              Continue
            </Link>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </section>
      </main>
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
