import { createSlice } from "@reduxjs/toolkit";


const initialState={
    step:1,
    loading:false,
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
        setLoading:(state,action)=>{
            state.loading=action.payload
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
export const {changeState,setCourse,setCourseCategories,setEditCourse,setLoading}=courseSlice.actions
export default courseSlice.reducer