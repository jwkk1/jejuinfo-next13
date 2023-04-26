'use client'

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    email : '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.email = action.payload;
        }
    }
})

export const { login } = authSlice.actions;

export default authSlice.reducer;
