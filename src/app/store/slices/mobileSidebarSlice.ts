import { createSlice } from "@reduxjs/toolkit";


const mobileSidebarSlice = createSlice({
    name:"mobileSidebarSlice",
    initialState:false,
    reducers:{
        openMobileSidebar:()=>{
return true
        },
        closeMobileSidebar:()=>{
            return false
        }
    }
})

export const {openMobileSidebar,closeMobileSidebar} = mobileSidebarSlice.actions
const mobileSidebarReducer = mobileSidebarSlice.reducer
export default mobileSidebarReducer