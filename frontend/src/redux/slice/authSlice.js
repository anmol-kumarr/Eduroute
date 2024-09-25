import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token:localStorage.getItem('authToken')?JSON.parse(localStorage.getItem('authToken')):null,
        loading:false,
        signUpData:{}
    },
    reducers:{
        setToken(state,action){
            state.token=action.payload
        },
        setLoading(state,action){
            state.loading=action.payload
        },
        setSignUp:(state,action)=>{
            state.signUpData=action.payload
        }
    },
   

})

export const {setToken,setLoading,setSignUp}=authSlice.actions
export default authSlice.reducer