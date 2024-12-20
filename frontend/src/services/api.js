const BASE_URL = process.env.REACT_APP_BASE_URL
// const BASE_URL = 'https://eduroute.herokuapp.com/api/v1/'
// const BASE_URL = 'http://localhost:4000/api/v1/'

export const categoriesApi = {
    getAllCategories: BASE_URL + 'course/get/AllCategories'
}

export const passwordApi = {
    resetPasswordApi: BASE_URL + 'profile/password/reset'
}

export const mailApi = {
    emailVerification: BASE_URL + 'auth/sendotp'
}

export const authApi = {
    signup: BASE_URL + 'auth/signup',
    login: BASE_URL + 'auth/login'
}

export const updateProfileApi = {
    updateImage: BASE_URL + 'profile/Picture/update',
    updateUserDetails: BASE_URL + 'profile/update/details',
}


export const createCourseApi = {
    createIntro: BASE_URL + 'course/create',
    createSection: BASE_URL + 'course/create/section'
}

export const editCourse = {
    updateCourseDetails: BASE_URL + 'course/update/course-details',
    deleteCourse: BASE_URL + 'course/delete/course',
    publishCourse: BASE_URL + 'course/update',
    editSection: BASE_URL + 'course/update/section',
    deleteSection: BASE_URL + 'course/delete',
    addSubSection: BASE_URL + 'course/create/subSection',
    updateSubSection: BASE_URL + 'course/update/subSection',
}

export const instructorApi = {
    getDashboardData: BASE_URL + 'profile/get-dashboard-info',
    getInstructorCourse: BASE_URL + 'course/instructor/my-course',
}

export const courseDetailsApi = {
    getCourseDetails: BASE_URL + 'course/details',
    getCategoriesCourse: BASE_URL + 'course/category'

}


export const paymentApi = {
    paymentCapture: BASE_URL + 'payment/capture',
    paymentVerify: BASE_URL + 'payment/verify',
    mailSendApi: BASE_URL + 'payment/mail'
}

export const cartApi = {
    addToCart: BASE_URL + 'cart/add-to-cart',
    removeFromCart: BASE_URL + 'cart/remove-from-cart',
    getCartData: BASE_URL + 'cart/cart-data'
}


export const studentEnrolledCourseApi = {
    getEnrolledCourse: BASE_URL + 'course/getEnrolledCourse'
}

export const enrolledCourse = {
    getEnrolledCourse: BASE_URL + 'course',
    completedLecture: BASE_URL + 'course/completed-lecture',
    getCourseProgress: BASE_URL + 'course/get-course-progress',
    rateCourse: BASE_URL + 'course/rating-course',
}

export const homePageApi = {
    getAllRatings: BASE_URL + 'get-all-ratings'
}