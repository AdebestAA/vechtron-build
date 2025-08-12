import { configureStore } from "@reduxjs/toolkit";
import mobileSidebarReducer from "./slices/mobileSidebarSlice";


const store = configureStore({
    reducer:{
        mobileSidebarSlice:mobileSidebarReducer
    }
})

export default store
export type RootStoreType = ReturnType<typeof store.getState>
export type dispatchType = typeof store.dispatch