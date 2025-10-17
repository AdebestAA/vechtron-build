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

const chatHistory: chatHistoryObjectType[] = [
    {
        id: 1,
        title: "Comparing Tesla Model 3 vs BMW i4",
        created_at: "2025-10-10T09:15:00Z",
        last_message_at: "2025-10-10T09:45:00Z",
        user_id: 1,
        uuid: "a1b2c3d4-e5f6-7890-ab12-cdef34567890",
    },
    {
        id: 2,
        title: "How hybrid cars work under the hood",
        created_at: "2025-10-11T14:00:00Z",
        last_message_at: "2025-10-11T14:25:00Z",
        user_id: 1,
        uuid: "b2c3d4e5-f678-9012-ab34-cdef56789012",
    },
    {
        id: 3,
        title: "Best sports cars under $50,000 in 2025",
        created_at: "2025-10-12T16:20:00Z",
        last_message_at: "2025-10-12T16:55:00Z",
        user_id: 1,
        uuid: "c3d4e5f6-7890-1234-ab56-cdef78901234",
    },
    {
        id: 4,
        title: "Understanding turbochargers and superchargers",
        created_at: "2025-10-13T18:10:00Z",
        last_message_at: "2025-10-13T18:45:00Z",
        user_id: 1,
        uuid: "d4e5f678-9012-3456-ab78-cdef90123456",
    },
    {
        id: 5,
        title: "Tips for maintaining your car engine",
        created_at: "2025-10-14T08:40:00Z",
        last_message_at: "2025-10-14T09:10:00Z",
        user_id: 1,
        uuid: "e5f67890-1234-5678-ab90-cdef12345678",
    },
    {
        id: 6,
        title: "Electric cars vs gas cars — long term costs",
        created_at: "2025-10-15T10:05:00Z",
        last_message_at: "2025-10-15T10:30:00Z",
        user_id: 1,
        uuid: "f6789012-3456-7890-ab12-cdef34567890",
    },
    {
        id: 7,
        title: "What makes Formula 1 cars so fast?",
        created_at: "2025-10-15T19:25:00Z",
        last_message_at: "2025-10-15T19:55:00Z",
        user_id: 1,
        uuid: "a9b8c7d6-e5f4-3210-ab98-cdef65432109",
    },
    {
        id: 8,
        title: "Guide to buying your first used car",
        created_at: "2025-10-16T07:50:00Z",
        last_message_at: "2025-10-16T08:25:00Z",
        user_id: 1,
        uuid: "b8c7d6e5-f432-1098-ab76-cdef09876543",
    },
    {
        id: 9,
        title: "How regenerative braking works in EVs",
        created_at: "2025-10-16T12:35:00Z",
        last_message_at: "2025-10-16T13:05:00Z",
        user_id: 1,
        uuid: "c7d6e5f4-3210-9876-ab54-cdef21098765",
    },
    {
        id: 10,
        title: "Should you lease or buy a car in 2025?",
        created_at: "2025-10-17T09:10:00Z",
        last_message_at: "2025-10-17T09:45:00Z",
        user_id: 1,
        uuid: "d6e5f4a3-2109-8765-ab32-cdef43210987",
    },
];

export const useChatHistory = create<chatHistoryType>((set) => {

    return {
        chatHistory: chatHistory,
        addHistory: (history: chatHistoryObjectType[]) => {
            set(() => ({
                chatHistory: history
            }))
        }

    }
})