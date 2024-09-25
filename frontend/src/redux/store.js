import { configureStore} from '@reduxjs/toolkit'
import authSlice from './slice/authSlice'
import {thunk} from 'redux-thunk';

const Store=configureStore({
    reducer:{
        auth:authSlice,
    
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})
export default Store






