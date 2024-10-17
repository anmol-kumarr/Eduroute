import { createSlice } from "@reduxjs/toolkit";
import reducer from "./courseSlice";

const instructorSlice=createSlice({
    name:'InstructorSlice',
    initialState:{
        myCourse:[]
    },

    reducers:{
        setMyCourse:(state,action)=>{
            state.myCourse=action.payload
        }
    }
})

export const {setMyCourse}=instructorSlice.actions
export default instructorSlice.reducer