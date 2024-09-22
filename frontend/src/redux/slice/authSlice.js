import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token:localStorage.getItem('authToken')?JSON.parse(localStorage.getItem('authToken')):null,
        loading:false,
        signUpData:null
    },
    reducers:{
        setToken(state,action){
            state.token=action.payload
        },
        setLoading(state,action){
            state.loading=action.payload
        },
        setSignUpData(state,action){
            state.signUpData=action.payload
        }
    }

})

export const {setToken,setLoading,setSignUpData}=authSlice.actions
export default authSlice.reducer