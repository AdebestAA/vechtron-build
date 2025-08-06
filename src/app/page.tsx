import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
<Link href={"/sign-up"}>Sign up</Link>
<br />
<Link href={"/sign-in"}>Login</Link>
<br />
<Link href={"/dashboard"}>Dashboard</Link>
    </div>
  );
}
