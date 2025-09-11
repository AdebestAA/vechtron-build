import { create } from "zustand";


interface typeModalStore {
    modalState: {
        openModal: boolean,
        content: React.ReactNode
    },
    openModal: (content: React.ReactNode) => void,
    closeModal: () => void
}

export const useModalStore = create<typeModalStore>((set) => ({
    modalState: {
        openModal: false,
        content: ""
    },
    openModal: (content: React.ReactNode) => {

        set(() => ({

            modalState: {
                openModal: true,
                content: content
            }
        }))
    },
    closeModal: () => {
        set(() => ({
            modalState: {
                openModal: false,
                content: ""
            }
        }))
    }

}))