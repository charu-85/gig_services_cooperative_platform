import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './userslice'
export const store = configureStore({
    reducer: {
        cart: cartSlice
    }
})