import { createSlice } from "@reduxjs/toolkit";


const initialState={
    step:1,
    MyCourse:null,
    courseCategories:null,
    editCourse:null

}
const courseSlice=createSlice({
    name:'courseSlice',
    initialState,


    reducers:{
        changeState:(state,action)=>{
            state.step=action.payload
        },
        setCourse:(state,action)=>{
            state.MyCourse=action.payload
        },
        setCourseCategories:(state,action)=>{
            // console.log(action)
            state.courseCategories=action.payload
        },
        setEditCourse:(state,action)=>{
            state.editCourse=action.payload
        }
    }
})
export const {changeState,setCourse,setCourseCategories,setEditCourse}=courseSlice.actions
export default courseSlice.reducer