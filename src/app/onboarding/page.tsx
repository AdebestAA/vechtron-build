"use client"
import FirstPage from '@/components/onboarding-components/first-page'
import SecondPage from '@/components/onboarding-components/second-page'
import ThirdPage from '@/components/onboarding-components/third-page'
import { useOnBoardingSlideState } from '../store/zustand-stores/useOnBoardingSlideState'
import FourthPage from '@/components/onboarding-components/fourth-page'
// import { useModalStore } from '../store/zustand-stores/useModelStore'

const Page = () => {

    const { value, } = useOnBoardingSlideState()
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
                <FourthPage />
                <SecondPage />
                <FirstPage />
                <ThirdPage />
            </div>
        </div>
    )
}

export default Page