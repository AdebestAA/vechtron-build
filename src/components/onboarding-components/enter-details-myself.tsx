"use client"
import Image from 'next/image'

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Asterisk } from 'lucide-react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { OnBoardingFormType, useOnBoardingFormStore } from '@/app/store/zustand-stores/useOnboardingForm'
import { SelectComponent } from '../select-component'
import { vehicleTypes, } from '@/utils/vehicle-infos'
import { useMutation, useQuery } from '@tanstack/react-query'
import Spinner from '@/utils/Spinner'
import SearchableDropDown from '../searchable-dropdown'
import z from 'zod'
import { useModalStore } from '@/app/store/zustand-stores/useModelStore'
import { useRouter } from 'next/navigation'

const url = process.env.NEXT_PUBLIC_API_URL as string

// fetch makes 

type vehicleModelType = {
    Make_ID: number;
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;
};


const formDataSchema = z.object({
    license_plate: z.string(),
    model: z.string(),
    make: z.string(),
    name: z.string(),
    type: z.string(),
    vin: z.string(),
    odometer: z.number(),
    odometer_unit: z.string(),
    year: z.number().min(1886, "value cant be less than 1886").max(new Date().getFullYear(), "value cant exceed current year")
})





const fetchVehicleMakes = async () => {
    try {
        const response = await fetch(
            "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
        );
        const data = await response.json();
        console.log(data.Results);
        return data.Results

    } catch (error) {
        console.log("error form makes", error);
        alert("Failed to load makes");
        return []
    }
};


// create vehicle function
const postData = async (formState: OnBoardingFormType) => {

    console.log(url);

    const accessToken = JSON.parse(localStorage.getItem("tokens") as string).accessToken
    const refreshToken = JSON.parse(localStorage.getItem("tokens") as string).refreshToken
    console.log(refreshToken);


    if (!url) {
        alert("end point not available")
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


const EnterDetailsMyself = () => {

    const { updateForm, form } = useOnBoardingFormStore()
    const { openModal } = useModalStore()
    const router = useRouter()
    // vehicle make
    const { data: vehicleMakesData, isLoading: vehicleMakesIsLoading, isError: vehicleMakesIsError, error: vehicleMakesError } = useQuery({
        queryKey: ["vehicleMakes"],
        queryFn: fetchVehicleMakes
    })
    const [models, setModels] = useState<[]>([])
    const [modelLoadingState, setModelLoadingState] = useState<boolean>()
    console.log(vehicleMakesError, vehicleMakesIsError);


    // const { data: vehicleModelData, isLoading: vehicleModelIsLoading, isError: vehicleModelIsError, error: vehicleModelError } = useQuery({
    //     queryKey: ["vehicleModel"],
    //     queryFn: fetchVehicleModel()
    // })
    // const mutation = useMutation({
    //     mutationFn: postData,
    //     onSuccess: (data) => {
    //         console.log(data);

    //     },
    //     onError: (err) => {
    //         console.log(err);

    //     }
    // })

    useEffect(() => {
        const fetchVehicleModel = async (makeId: number | string, year: number) => {
            setModelLoadingState(true)
            try {
                const response = await fetch(
                    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
                );
                const data = await response.json();
                console.log(data);

                console.log(data);

                if (data.Results.length > 0) {
                    setModels(data.Results)
                    setModelLoadingState(false)

                    console.log("yea completed");

                }
                else {

                    setModelLoadingState(false)
                    setModels([])
                }

            } catch (error) {
                setModelLoadingState(false)
                console.log(error);

                console.log("Failed to load models")
                openModal("an error occured while loading model,please try enter new value for vehicle make and year")
                // alert("an error occured while loading models")

                return []

            }
        }
        if (form.year && form.year > 1985 && form.makeId) {


            fetchVehicleModel(form.makeId, form.year)

        }
        else {
            setModelLoadingState(false)
        }

    }, [form.year, form.makeId, openModal])

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


    // useEffect(() => {
    //     console.log(vehicleMakesData);
    //     console.log(vehicleMakesError);
    //     console.log(vehicleMakesIsError);

    // }, [vehicleMakesIsLoading])

    // useEffect(() => {


    //     fetchMakes();
    // }, []);


    useEffect(() => {
        console.log(form);

    }, [form])


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(form);
        const result = formDataSchema.safeParse({
            ...form
        })
        console.log(result);

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
                    onClick={() => router.push("/push")}
                    className='font-normal cursor-pointer md:inline hidden'>skip for now</Button>
            </article>

            <form className=' flex flex-col  justify-evenly  ' onSubmit={handleSubmit}>
                <header className='text-center'>
                    <h1 className='lg:text-4xl md:text-3xl text-2xl font-semibold'>Customize your vehicle profile</h1>
                    <p>Enter your vehicle details to get personalized maintenance reminders</p>
                </header>
                <div className='flex flex-wrap md:justify-between lg:px-32 md:px-8'>

                    {/* Vehicle make */}
                    <aside className='lg:w-[45%] w-full '>
                        <Label className='my-2'>Vehicle Make <span><Asterisk className='text-[red]' size={15} /></span></Label>
                        <SearchableDropDown

                            value='' options={vehicleMakesIsLoading ? [] : vehicleMakesData}
                            placeholder={vehicleMakesIsLoading ? "loading..." : "Select an option..."}
                            onChange={(value) => {
                                // console.log("value from onchange", value);
                                updateForm("make", value)
                                // return value
                            }}
                        />
                        {/* <SelectComponent
                            valueKey="make"
                            options={vehicleNames} placeholder="vehicle name" /> */}
                    </aside>
                    {/* Year */}
                    <aside className='lg:w-[45%] w-full '>
                        <Label className='my-2'>Year <span><Asterisk className='text-[red]' size={15} /></span></Label>
                        <Input
                            disabled={modelLoadingState ? true : false}
                            type='number'
                            placeholder='enter year'
                            className='w-full py-6'
                            value={form.year}
                            onChange={(e) => {
                                updateForm("year", e.target.value)
                            }} />
                        <p className='text-sm text-[red]'>{form.year && form.year < 1986 ? "year must be more than 1986" : ""}</p>
                        {/* <SelectComponent valueKey='year' options={vehicleYears} placeholder="select a year" /> */}
                    </aside>
                    {/* Vehicle model */}
                    <aside className='lg:w-[45%] w-full '>
                        <Label className='my-2'>Vehicle model <span><Asterisk className='text-[red]' size={15} /></span></Label>
                        <SelectComponent
                            valueKey="model"
                            options={models.length > 0 ? models.map((item: vehicleModelType, index) => {
                                console.log(index);

                                return {
                                    label: item.Model_Name,
                                    value: item.Model_Name
                                }
                            }) : []} placeholder={modelLoadingState ? "loading" : "vehicle model"} />
                    </aside>
                    {/* Vehicle type */}
                    <aside className='lg:w-[45%] w-full '>
                        <Label className='my-2'>Vehicle type <span><Asterisk className='text-[red]' size={15} /></span></Label>
                        <SelectComponent
                            valueKey="type"
                            options={vehicleTypes} placeholder="vehicle type" />
                    </aside>
                    {/* VIN */}
                    <aside className='lg:w-[45%] w-full '>
                        <Label className='my-2'>VIN (Optional)</Label>
                        <Input
                            placeholder='enter VIN'
                            className='w-full py-6'
                            value={form.vin}
                            onChange={(e) => {

                                updateForm("vin", e.target.value)
                            }}
                        />
                    </aside >
                    {/* License Plate */}
                    <aside className='lg:w-[45%] w-full '>
                        <Label className='my-2'>Licence Plate (Optional)</Label>
                        <Input
                            placeholder='enter license plate'
                            className='w-full py-6'
                            value={form.license_plate}
                            onChange={(e) => {

                                updateForm("license_plate", e.target.value)
                            }}
                        />
                    </aside>

                    {/* Odometer Unit */}
                    <aside className='lg:w-[45%] w-full '>
                        <Label className='my-2'>Odometer Unit<span><Asterisk className='text-[red]' size={15} /></span></Label>
                        <SelectComponent
                            valueKey="odometer_unit"
                            options={[{ value: "mi", label: "Miles" }, { value: "km", label: "Kilometers" }]} placeholder="select odometer unit" />
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
                            type='number'
                            placeholder='enter odometer reading'
                            className='w-full py-6'
                            value={form.odometer}
                            onChange={(e) => {

                                updateForm("odometer", e.target.value)
                            }}
                        />
                    </aside>



                </div>

                <div className='flex justify-center mt-8'>
                    <Button
                        // onClick={submit}
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

export default EnterDetailsMyself




