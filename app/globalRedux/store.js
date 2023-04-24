'use client';

import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import searchListReducer from './features/searchList/searchList'

export const store = configureStore({
    reducer : {
        counter : counterReducer,
        searchList : searchListReducer
    }
})

// export const useDispatch = () => useDispatch();
