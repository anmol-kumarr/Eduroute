const BASE_URL=process.env.REACT_APP_BASE_URL

export const categoriesApi={
    getAllCategories:BASE_URL+'course/get/AllCategories'
}

export const passwordApi={
    resetPasswordApi:BASE_URL+'profile/password/reset'
}

export const mailApi={
    emailVerification:BASE_URL+'auth/sendotp'
}

export const authApi={
    signup:BASE_URL+'auth/signup',
    login:BASE_URL+'auth/login'
}

export const updateProfileApi={
    updateImage:BASE_URL+'profile/Picture/update',
    updateUserDetails:BASE_URL+'profile/update/details',
}


export const createCourseApi={
    createIntro:BASE_URL+'course/create',
    createSection:BASE_URL+'course/create/section'
}

export const editCourse={
    deleteCourse:BASE_URL+'course/delete/course',
    publishCourse:BASE_URL+'course/update',
    editSection:BASE_URL+'course/update/section',
    deleteSection:BASE_URL+'course/delete',
    addSubSection:BASE_URL+'course/create/subSection'
}

export const instructorApi={

    getInstructorCourse:BASE_URL+'course/instructor/my-course',
}

export const courseDetailsApi={
    getCourseDetails:BASE_URL+'course/details'
}