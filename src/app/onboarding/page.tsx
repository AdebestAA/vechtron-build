"use client"
import FirstPage from '@/components/onboarding-components/first-page'

import { useOnBoardingSlideState } from '../store/zustand-stores/useOnBoardingSlideState'

import { useEffect } from 'react'
import EnterDetailsMyself from '@/components/onboarding-components/enter-details-myself'
import AddVehicleWithAi from '@/components/onboarding-components/add-vehicle-with-ai'
import AiResponse from '@/components/onboarding-components/ai-response'
// import { useModalStore } from '../store/zustand-stores/useModelStore'

const Page = () => {

    const { value, } = useOnBoardingSlideState()

    useEffect(() => {
        console.log(value);

    }, [value])
    // const { openModal } = useModalStore()
    // useEffect(() => {
    //     openModal("you have created a vehicle successfully")
    // }, [])

    return (
        <div className='w-screen overflow-x-hidden'
        >
            <div className='w-full flex transition-all ease-in-out duration-500'
                style={{ transform: `translateX(-${value * 100}%)` }}
            >
                {/* <FourthPage /> */}
                <AiResponse />
                <AddVehicleWithAi />
                <FirstPage />
                <EnterDetailsMyself />
            </div>
        </div>
    )
}

export default Page