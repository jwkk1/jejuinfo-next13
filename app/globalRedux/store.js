'use client';

import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import searchListReducer from './features/searchList/searchList'
import authReducer from './features/auth/auth';

export const store = configureStore({
    reducer : {
        counter : counterReducer,
        searchList : searchListReducer,
        auth : authReducer,
        
    }
})

// export const useDispatch = () => useDispatch();
