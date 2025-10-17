import { create } from "zustand";

type sideChatStoreType = {
    sideChatState: boolean,
    openSideChat: () => void,
    closeSideChat: () => void,
}

export const useSideChatStore = create<sideChatStoreType>((set) => ((
    {
        sideChatState: false,
        openSideChat: () => {

            set(() => {
                return {
                    sideChatState: true
                }
            })
        },
        closeSideChat: () => {

            set(() => {
                return {
                    sideChatState: false
                }
            })
        }
    }
)))