const BASE_URL=process.env.REACT_APP_BASE_URL

export const categoriesApi={
    getAllCategories:BASE_URL+'course/get/AllCategories'
}

export const passwordApi={
    resetPasswordApi:BASE_URL+'profile/password/reset'
}

export const mailApi={
    emailVerification:BASE_URL+'user/sendotp'
}