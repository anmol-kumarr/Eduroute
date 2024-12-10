import { configureStore} from '@reduxjs/toolkit'
import authSlice from './slice/authSlice'
import {thunk} from 'redux-thunk';
import profileSlice from './slice/profileSlice';
import courseSlice from './slice/courseSlice';
import instructorSlice from './slice/instructorSlice'
import cartSlice from './slice/cartSlice'
import LectureSlice from './slice/lecture'
import responsiveSlice from './slice/responsive'

const Store=configureStore({
    reducer:{
        auth:authSlice,
        user:profileSlice,
        course:courseSlice,
        instructor:instructorSlice,
        cart:cartSlice,
        lecture:LectureSlice,
        responsive:responsiveSlice
        
    
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})
export default Store






