import { create } from "zustand"


type onBoardingSlideStae = {
    value: number,
    increment: () => void,
    decrement: () => void
}

export const useOnBoardingSlideState = create<onBoardingSlideStae>((set) => ({
    value: 2,
    increment: () => set((state) => ({ value: state.value + 1 })),
    decrement: () => set((state) => ({ value: state.value - 1 })),
}))