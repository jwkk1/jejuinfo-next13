'use client'

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const asyncGetDetail = createAsyncThunk(
    '/search',
    async (params) => {
        const response = await axios.get(process.env.NEXT_PUBLIC_URL, {params});
        return response.data
    }
)

const initialState = {
    value: '',
    
}

export const detailSlice = createSlice({
    name: 'detail',
    initialState,
    reducers: {
        detailRefresh: (state, action) => {
            state.value = action.payload;
        },
        reset(state) {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(asyncGetDetail.fulfilled, (state, action)=>{
            state.value = action.payload.items[0];
        })
    }
})

export const { detailRefresh, reset } = detailSlice.actions;
export {asyncGetDetail};
export default detailSlice.reducer;
