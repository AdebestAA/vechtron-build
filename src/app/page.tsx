"use client"
import Link from "next/link";

// import { useSelector } from "react-redux";
// import { RootStoreType } from "./store";


export default function Home() {
  // const dispatch = useDispatch<dispatchType>()
  // const modalState = useSelector((store:RootStoreType)=>{

  //   return store.modalReducer
  // })
  // const isOpen = useSelector((state: RootStoreType) => state.modalReducer)

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
              href="/dashboard"
              className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
            >
              Dashboard
            </Link>
            <Link
              href="/onboarding"
              className="inline-flex w-full items-center justify-center rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
            >
              Continue
            </Link>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Dont have an account?{" "}
            <Link href="/sign-up" className="underline underline-offset-4">
              Sign up
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}