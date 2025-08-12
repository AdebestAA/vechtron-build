import { createSlice } from "@reduxjs/toolkit";


const modalSlice = createSlice({
    name:"modalSlice",
    initialState:false,
    reducers:{
        openModal:()=>{
            return true
        },
        closeModal:()=>{
            return true
        },
    }
})

export const {openModal,closeModal} = modalSlice.actions
const modalReducer = modalSlice.reducer
export default modalReducer