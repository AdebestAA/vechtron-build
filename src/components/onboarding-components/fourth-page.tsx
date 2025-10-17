"use client"
import Image from 'next/image'
import { Button } from '../ui/button'
import { Asterisk } from 'lucide-react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { OnBoardingFormType, useOnBoardingFormStore } from '@/app/store/zustand-stores/useOnboardingForm'

import { useMutation } from '@tanstack/react-query'
import Spinner from '@/utils/Spinner'

import z from 'zod'
import { useModalStore } from '@/app/store/zustand-stores/useModelStore'
import { useRouter } from 'next/navigation'
import { useOnBoardingSlideState } from '@/app/store/zustand-stores/useOnBoardingSlideState'

const url = process.env.NEXT_PUBLIC_API_URL as string

// fetch makes 

// type vehicleModelType = {
//     Make_ID: number;
//     Make_Name: string;
//     Model_ID: number;
//     Model_Name: string;
// };


const formDataSchema = z.object({
    license_plate: z.string().optional(),
    model: z.string(),
    make: z.string().optional(),
    name: z.string(),
    type: z.string(),
    vin: z.string().optional(),
    odometer: z.number(),
    odometer_unit: z.string(),
    year: z.number().min(1886, "value cant be less than 1886").max(new Date().getFullYear(), "value cant exceed current year"),
    makeId: z.number().optional()
})







// create vehicle function
const postData = async (formState: OnBoardingFormType) => {

    // console.log(url);

    const accessToken = JSON.parse(localStorage.getItem("tokens") as string).accessToken
    const refreshToken = JSON.parse(localStorage.getItem("tokens") as string).refreshToken
    // console.log(refreshToken);


    if (!url) {
        // alert("end point not available")
        console.log("endpoint not available");

        return
    }

    const res = await fetch(`${url}/vehicle/api/v1/vehicles/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },

        body: JSON.stringify({
            license_plate: formState.license_plate,
            model: formState.model,
            make: formState.make,
            name: `${formState.make} ${formState.model} ${formState.year}`,
            type: formState.type,
            vin: formState.vin,
            odometer: formState.odometer,
            odometer_unit: formState.odometer_unit,
            year: Number(formState.year)
        })
    })
    // if (res.status == 401) {
    //     const res = await fetch(`${url}/api/v1/auth/refresh`, {
    //         method: 'POST',
    //         headers: {
    //             // "Content-Type": "application/json",
    //             "Authorization": `Bearer ${refreshToken}`
    //         },
    //         body: null
    //     })

    //     console.log(res.text());
    //     return

    // }
    if (!res.ok) {
        console.log(res);

        console.log("error");

    }
    const response = await res.json()
    return response
}

export const isVehicleOwner = async () => {
    const accessToken = JSON.parse(localStorage.getItem("tokens") as string).accessToken
    const res = await fetch(`${url}/auth/api/v1/auth/account/vehicle-owner-status`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ "is_vehicle_owner": true })
    })
    if (!res.ok) {
        console.log("an error occured");

    }

    const response = await res.json()

    console.log(response);

}


const FourthPage = () => {

    const { form } = useOnBoardingFormStore()
    const { increment } = useOnBoardingSlideState()
    const { openModal } = useModalStore()
    const router = useRouter()





    const mutation = useMutation({
        mutationFn: postData,
        onSuccess: (data) => {
            console.log(data);
            if (data.status == "success") {
                // trigger verify vehicle endpoint
                isVehicleOwner()

                openModal(data.message)
                setTimeout(() => {
                    router.push("/dashboard")
                }, 2000)
                return

            }
            openModal(data.message)

        },
        onError: (error) => {
            console.log(error);
            openModal(error.message)


        },
    })






    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(form);
        const result = formDataSchema.safeParse({
            ...form
        })
        if (!result.success) {
            openModal("empty fieid field, please go back to re-enter you description")

            return

        }

        mutation.mutate(form)

    }

    return (
        <div className='lg:px-8 px-5 md:block flex flex-col md:justify-between md:py-8 justify-center  gap-y-8 py-4 min-w-full max-w-screen'>
            <article className=' flex md:justify-between justify-center'>
                <div className='relative w-[180px] min-h-[50px]'>
                    <Image src={"/logo.svg"} alt='logo' fill
                        className='absolute object-contain'
                    />
                </div>

                <Button

                    variant={"ghost"}
                    onClick={increment}
                    className='font-normal cursor-pointer md:inline hidden'>Back</Button>
            </article>

            <form className=' flex flex-col  justify-evenly  ' onSubmit={handleSubmit}>
                <header className='text-center'>
                    <h1 className='lg:text-4xl md:text-3xl text-2xl font-semibold'>AI RESPONSE</h1>
                    <p>AI generated response from your description</p>
                </header>
                <div className='flex flex-wrap md:justify-between lg:px-32 md:px-8'>

                    {/* Vehicle make */}
                    <aside className='lg:w-[45%] w-full '>
                        <Label className='my-2'>Vehicle Make <span><Asterisk className='text-[red]' size={15} /></span></Label>
                        <Input

                            // type='number'
                            // placeholder='enter year'
                            disabled={true}
                            className={`w-full py-6 ${form.make ? "" : "border-[red] border-2"}`}
                            defaultValue={form.make ? form.make : ""}

                        />
                        {/* <SelectComponent
                            valueKey="make"
                            options={vehicleNames} placeholder="vehicle name" /> */}
                    </aside>
                    {/* Year */}
                    <aside className='lg:w-[45%] w-full '>
                        <Label className='my-2'>Year <span><Asterisk className='text-[red]' size={15} /></span></Label>
                        <Input

                            type='number'
                            // placeholder='enter year'
                            disabled={true}
                            className={`w-full py-6 ${form.year ? "" : "border-[red] border-2"}`}
                            defaultValue={form.year ? form.year : ""}

                        />
                        <p className='text-sm text-[red]'>{form.year && form.year < 1986 ? "year must be more than 1986" : ""}</p>
                        {/* <SelectComponent valueKey='year' options={vehicleYears} placeholder="select a year" /> */}
                    </aside>
                    {/* Vehicle model */}
                    <aside className='lg:w-[45%] w-full '>
                        <Label className='my-2'>Vehicle model <span><Asterisk className='text-[red]' size={15} /></span></Label>
                        <Input

                            //    type='number'
                            // placeholder='enter year'
                            disabled={true}
                            className={`w-full py-6 ${form.model ? "" : "border-[red] border-2"}`}
                            defaultValue={form.model ? form.model : ""}

                        />
                    </aside>
                    {/* VIN */}
                    <aside className='lg:w-[45%] w-full '>
                        <Label className='my-2'>VIN (Optional)</Label>
                        <Input
                            // placeholder='enter VIN'
                            disabled={true}
                            className={`w-full py-6 border-2 `}
                            defaultValue={form.vin ? form.vin : ""}

                        />
                    </aside >
                    {/* Vehicle type */}
                    <aside className='lg:w-[45%] w-full '>
                        <Label className='my-2'>Vehicle type <span><Asterisk className='text-[red]' size={15} /></span></Label>
                        <Input

                            // type='number'
                            // placeholder='enter year'
                            disabled={true}
                            className={`w-full py-6 ${form.type ? "" : "border-[red] border-2"}`}
                            defaultValue={form.type ? form.type : ""}

                        />
                    </aside>
                    {/* License Plate */}
                    <aside className='lg:w-[45%] w-full '>
                        <Label className='my-2'>Licence Plate (Optional)</Label>
                        <Input
                            // placeholder='enter license plate'
                            disabled={true}
                            className={`w-full py-6 border-2`}
                            value={form.license_plate ? form.license_plate : ""}

                        />
                    </aside>

                    {/* Odometer Unit */}
                    <aside className='lg:w-[45%] w-full '>
                        <Label className='my-2'>Odometer Unit<span><Asterisk className='text-[red]' size={15} /></span></Label>
                        <Input

                            disabled={true}
                            // placeholder='enter year'
                            className={`w-full py-6 ${form.odometer_unit ? "" : "border-[red] border-2"}`}

                            defaultValue={form.odometer_unit ? form.odometer_unit : ""}

                        />
                    </aside>

                    {/* Vehicel Name */}
                    {/* <aside className='lg:w-[45%] w-full '>
                        <Label className='my-2'>Vehicle name <span><Asterisk className='text-[red]' size={15} /></span></Label>
                        <Input
                            placeholder='enter vehicle name'
                            className='w-full py-6'
                            value={form.name}
                            onChange={(e) => {

                                updateForm("name", e.target.value)
                            }}
                        />
                    </aside> */}
                    {/* Odometer */}
                    <aside className='lg:w-[45%] w-full '>
                        <Label className='my-2'>Odometer <span><Asterisk className='text-[red]' size={15} /></span></Label>
                        <Input
                            // type='number'
                            disabled={true}
                            // placeholder='enter odometer reading'
                            className={`w-full py-6 ${form.odometer ? "" : "border-[red] border-2"}`}
                            defaultValue={form.odometer ? form.odometer : ""}

                        />
                    </aside>



                </div>

                <div className='flex justify-center mt-8'>
                    <Button

                        type='submit'
                        className='md:w-[25%] w-full text-white py-6'> {mutation.isPending ? <Spinner /> : "Add Vehicle"}</Button>
                </div>
            </form>

            <div className='md:hidden block flex items-center justify-center'>
                <Button variant={"ghost"}
                    onClick={() => router.push("/push")}
                    className='font-normal cursor-pointer '>Skip for now</Button>
            </div>
        </div>
    )
}

export default FourthPage




