import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex">
<Link href={"sign-up"}>Sign up</Link>
<Link href={"sign-in"}>Login</Link>
    </div>
  );
}
