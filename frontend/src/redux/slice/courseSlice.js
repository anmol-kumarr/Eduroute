import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    step: 1,
    loading: false,
    MyCourse: null,
    courseCategories: null,
    editCourse: null

}
const courseSlice = createSlice({
    name: 'courseSlice',
    initialState,


    reducers: {
        changeState: (state, action) => {
            state.step = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setCourse: (state, action) => {
            state.MyCourse = action.payload
        },
        setCourseCategories: (state, action) => {
            // console.log(action)
            state.courseCategories = action.payload
        },
        setEditCourse: (state, action) => {
            state.editCourse = action.payload
        },
        setEditSubSection: (state, action) => {
            // console.log(action.payload)
            const { sectionId, subSectionId, data } = action.payload;
            // console.log(action.payload)

            state.MyCourse.courseContent = state.MyCourse.courseContent.map((section) => {
                if (section._id === sectionId) {
                    return {
                        ...section,
                        subSection: section.subSection.map((subItem) =>
                            subItem._id === subSectionId ? { ...subItem, ...data } : subItem
                        ),
                    };
                }
                return section;
            });
        }
    }
})
export const { changeState, setEditSubSection, setCourse, setCourseCategories, setEditCourse, setLoading } = courseSlice.actions
export default courseSlice.reducer