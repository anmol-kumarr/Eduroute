import { configureStore} from '@reduxjs/toolkit'
import authSlice from './slice/authSlice'
import {thunk} from 'redux-thunk';
import profileSlice from './slice/profileSlice';
import courseSlice from './slice/courseSlice';
import instructorSlice from './slice/instructorSlice'
import cartSlice from './slice/cartSlice'

const Store=configureStore({
    reducer:{
        auth:authSlice,
        user:profileSlice,
        course:courseSlice,
        instructor:instructorSlice,
        cart:cartSlice
    
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})
export default Store






