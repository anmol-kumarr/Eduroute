import { configureStore} from '@reduxjs/toolkit'
import authSlice from './slice/authSlice'
import {thunk} from 'redux-thunk';
import profileSlice from './slice/profileSlice';


const Store=configureStore({
    reducer:{
        auth:authSlice,
        user:profileSlice
    
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})
export default Store






