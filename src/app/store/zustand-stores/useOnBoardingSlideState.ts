import { create } from "zustand"


type onBoardingSlideStae = {
    value: number,
    increment: () => void,
    incrementByTwo: () => void,
    decrement: () => void
}

export const useOnBoardingSlideState = create<onBoardingSlideStae>((set) => ({
    value: 2,
    increment: () => set((state) => ({ value: state.value + 1 })),
    incrementByTwo: () => set((state) => ({ value: state.value + 2 })),
    decrement: () => set((state) => ({ value: state.value - 1 })),
}))