import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        Add: (state, action) => {
            state.push(action.payload)

        }, Clear: () => {
            return []; // Resets stored cards/items to an empty array
        }

    }
})
export const { Add, removeItem, Clear } = cartSlice.actions
// Example in userSlice.js or store actions
export const logout = () => {
    return {
        type: 'CLEAR_DATA', // Or use your slice action like resetUserData()
    };
};
export default cartSlice.reducer