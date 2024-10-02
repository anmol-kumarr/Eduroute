import { createSlice } from "@reduxjs/toolkit";


const initialState={
    step:1,

}
const courseSlice=createSlice({
    name:'courseSlice',
    initialState,
    reducers:{
        changeState:(state,action)=>{
            state.step=action.payload
        }
    }
})
export const {changeState}=courseSlice.actions
export default courseSlice.reducer