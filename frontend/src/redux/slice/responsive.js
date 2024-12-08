import { createSlice } from "@reduxjs/toolkit";

const responsiveSlice=createSlice({
    name:'ResponsiveSlice',
    initialState:{
        sidebar:false,
        showPage:false,
    
    },
    reducers:{
        setSideBar:(state,action)=>{
            state.sidebar=!state.sidebar
        },
        setShowPage:(state,action)=>{
            state.showPage=action.payload
        }
    }
})


export const {setSideBar,setShowPage}=responsiveSlice.actions

export default responsiveSlice.reducer