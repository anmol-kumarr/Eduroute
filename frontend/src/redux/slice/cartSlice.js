import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'CartSlice',
    initialState: {
        cart:null
    },

    reducers: {
        addToCart: (state, action) => {
            state.cart=action.payload
        }

    }
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer