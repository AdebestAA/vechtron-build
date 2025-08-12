import { configureStore } from "@reduxjs/toolkit";
import mobileSidebarReducer from "./slices/mobileSidebarSlice";
import modalReducer from "./slices/modalSlice";


const store = configureStore({
    reducer:{
        mobileSidebarSlice:mobileSidebarReducer,
        modalReducer:modalReducer
    }
})

export default store
export type RootStoreType = ReturnType<typeof store.getState>
export type dispatchType = typeof store.dispatch