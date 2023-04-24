'use client'

import {useSelector, useDispatch} from 'react-redux';
import { increment } from '../globalRedux/features/counter/counterSlice';


export default function TestRedux() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return(
        <div>
            <button  onClick={()=>dispatch(increment())}>{count}</button>
        </div>
    )
}