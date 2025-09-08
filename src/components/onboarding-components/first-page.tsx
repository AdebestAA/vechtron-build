import Image from 'next/image'
import { Button } from '../ui/button'
import { useOnBoardingSlideState } from '@/app/store/zustand-stores/useOnBoardingSlideState'
import { useRouter } from 'next/navigation'
import { onBoardingForm, useOnBoardingFormStore } from '@/app/store/zustand-stores/useOnboardingForm'

const FirstPage = () => {
    const { increment, decrement } = useOnBoardingSlideState()
    const router = useRouter()
    const { updateAll } = useOnBoardingFormStore()

    return (
        <div className='lg:px-8 px-5 md:block flex flex-col md:justify-between md:py-8 justify-center h-screen  gap-y-30 min-w-full'>
            <article className=' overflow-x-hidden flex md:justify-between justify-center'>
                <div className='relative w-[180px] min-h-[50px]'>
                    <Image src={"/logo.svg"} alt='logo' fill
                        className='absolute object-contain'
                    />
                </div>
                <Button onClick={() => router.push("/chat")} variant={"ghost"} className='font-normal cursor-pointer md:inline hidden'>Skip for now</Button>
            </article>

            <main className='md:min-h-[80vh] flex flex-col items-center justify-center '>
                <h1 className='text-3xl font-semibold text-center'>Ready to add your vehicle? </h1>
                <Button
                    onClick={decrement}
                    className='text-white w-full md:w-[50%] lg:w-[25%] mt-8 text-lg'>Add Vehicle Using AI</Button>
                <Button
                    onClick={() => {
                        updateAll(onBoardingForm)
                        increment()

                    }
                    }
                    variant={"ghost"} className='mt-4 text-lg w-full md:w-[50%] lg:w-[25%]'>Enter Details Myself</Button>
            </main>

            <div className='md:hidden block flex items-center justify-center'>
                <Button variant={"ghost"} className='font-normal cursor-pointer ' onClick={() => router.push("/chat")}>Skip for now</Button>
            </div>
        </div>
    )
}

export default FirstPage