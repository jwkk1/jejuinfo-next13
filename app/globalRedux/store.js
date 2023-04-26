'use client';

import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import searchListReducer from './features/searchList/searchList'
import authReducer from './features/auth/auth';
import detailReducer from './features/detail/detail';

export const store = configureStore({
    reducer : {
        counter : counterReducer,
        searchList : searchListReducer,
        auth : authReducer,
        detail : detailReducer,
    }
})

// export const useDispatch = () => useDispatch();
