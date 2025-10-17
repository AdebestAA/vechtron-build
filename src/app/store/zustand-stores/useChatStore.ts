import { create } from "zustand";




// chat state
type chatObjectType = {
    content: string,
    role: "assistant" | "user",
    conversation_id?: number,
    created_at?: string,
    id?: number,
    sequence?: number,
    uuid?: string
}
type chatStoreType = {
    chatObject: chatObjectType[],
    updateChatObj: (allMessages: chatObjectType[]) => void,
    addMessage: (messageObject: chatObjectType) => void,
    streamLastMessage: (messageText: string) => void

}



export const useChatStore = create<chatStoreType>((set) => ({
    chatObject: [],
    updateChatObj: (allMessages: chatObjectType[]) => {
        set(() => ({
            chatObject: allMessages
        }))
    },
    addMessage: (messageObject: chatObjectType) => {
        set((state: chatStoreType) => ({
            chatObject: [...state.chatObject, messageObject]
        }))
    },
    streamLastMessage: (messageText: string) => {

        set((state) => {
            console.log(messageText);
            const streamLastMessage = state.chatObject.map((item, index) => {
                if (index == state.chatObject.length - 1) {
                    // console.log(item.content + " " + messageText);

                    return {
                        ...item,
                        content: messageText
                    }
                }
                else {
                    return item
                }
            })

            return {
                chatObject: streamLastMessage
            }
        })

    }

}))



// Chat history State

type chatHistoryObjectType = {
    created_at: string,
    id: number,
    last_message_at: string,
    title: string,
    user_id: number,
    uuid: string
}

type chatHistoryType = {
    chatHistory: chatHistoryObjectType[],
    addHistory: (history: chatHistoryObjectType[]) => void
}
export const useChatHistory = create<chatHistoryType>((set) => {

    return {
        chatHistory: [],
        addHistory: (history: chatHistoryObjectType[]) => {
            set(() => ({
                chatHistory: history
            }))
        }

    }
})