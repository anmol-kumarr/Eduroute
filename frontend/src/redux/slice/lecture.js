import { createSlice } from "@reduxjs/toolkit";

const lectureSlice = createSlice({
    name: 'Lecture',
    initialState: {
        completedLecture: []
    },

    reducers: {
        setCompletedLecture: (state, action) => {

            if (state.completedLecture.length === 0) {
                state.completedLecture = action.payload
            }
            else {
                if (!state.completedLecture.completedVideo.includes(action.payload.subSectionId)) {
                    state.completedLecture.completedVideo.push(action.payload.subSectionId)
                }

            }

        }

    }
})

export const { setCompletedLecture } = lectureSlice.actions
export default lectureSlice.reducer