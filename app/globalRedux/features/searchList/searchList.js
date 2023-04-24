'use client'

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const asyncSearchList = createAsyncThunk(
    '/search',
    async (params) => {
        const response = await axios.get(process.env.NEXT_PUBLIC_URL, {params});
        return response.data
    }
)

const initialState = {
    value: '',
    totalCnt: 0,
}

export const saerchListSlice = createSlice({
    name: 'searchList',
    initialState,
    reducers : {
        reset(state) {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(asyncSearchList.fulfilled, (state, action)=>{
            state.value = action.payload.items;
            state.totalCnt = action.payload.totalCount
        })
    }
});

export const {reset} = saerchListSlice.actions;
export {asyncSearchList};
export default saerchListSlice.reducer;
