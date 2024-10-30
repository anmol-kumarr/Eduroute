import { createSlice } from "@reduxjs/toolkit";

const lectureSlice = createSlice({
    name: 'Lecture',
    initialState: {
        completedLecture: []
    },

    reducers: {
        setCompletedLecture: (state, action) => {
            
            if (state.completedLecture.length > 0 && state.completedLecture.includes({courseID:action.payload.courseId}) ) {


                state.completedLecture.forEach((course) => (
                    course.courseID === action.payload.courseId && course.completedVideo.push(action.payload.subSectionId)
                ))
            }
            else{
                state?.completedLecture?.push({
                    courseID:action.payload.courseId,
                    completedVideo:[action.payload.subSectionId]
                })
            }
        }
    }
})

export const { setCompletedLecture } = lectureSlice.actions
export default lectureSlice.reducer