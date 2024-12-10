import { createSlice } from "@reduxjs/toolkit";


const getTokenFromLocalStorage = () => {
    const authData = localStorage.getItem('authToken');
    if (authData) {
        const parsedData = JSON.parse(authData);
        if (parsedData.expiresIn > Date.now()) {
            return parsedData.token;
        } else {
            localStorage.removeItem('authToken'); 
        }
    }
    return null;
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: getTokenFromLocalStorage(),
        loading: false,
        signUpData: {},
        // token:true
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setSignUp: (state, action) => {
            state.signUpData = action.payload
        }
    },


})

export const { setToken, setLoading, setSignUp } = authSlice.actions
export default authSlice.reducer