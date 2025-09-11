"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,

    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"



const formSchema = z.object({
    firstName: z.string().min(2, { message: "firstName must be atleast 2 characters" }),
    username: z.string().min(2, { message: "username must be atleast 2 characters" }),
    lastName: z.string().min(2, { message: "lastName must be atleast 2 characters" }),
    email: z.email({ message: "Enter a valid email" }),
    password: z.string().min(8, "password must be atleast 8 characters"),
    confirmPassword: z.string().min(8, "password must be atleast 8 characters")
})






export default function ProfileForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            username: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log("lolg");

        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <div className="flex justify-between">

                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem
                                className="w-[40%]"
                            >
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input className="border-b-1 bg-[var(--primary)] border-x-0 border-t-0  rounded-none outline-none focus-visible:ring-0" placeholder="enter your first name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField

                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="w-[40%]">
                                <FormLabel>lastName</FormLabel>
                                <FormControl>
                                    <Input className="border-b-1 border-x-0 border-t-0  rounded-none outline-none focus-visible:ring-0" placeholder="shadcn" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {/* username */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem
                            className=""
                        >
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input className="border-b-1  border-x-0 border-t-0  rounded-none outline-none focus-visible:ring-0" placeholder="enter your username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem
                            className=""
                        >
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input className="border-b-1  border-x-0 border-t-0  rounded-none outline-none focus-visible:ring-0" placeholder="enter your username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem
                            className=""
                        >
                            <FormLabel>password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    className="border-b-1  border-x-0 border-t-0  rounded-none outline-none focus-visible:ring-0" placeholder="enter your username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* confirm password */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem
                            className=""
                        >
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    className="border-b-1  border-x-0 border-t-0  rounded-none outline-none focus-visible:ring-0" placeholder="enter your username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}