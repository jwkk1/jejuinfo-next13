'use client'

import { useEffect } from "react";
import { useDispatch } from "react-redux"
import {login} from '@/app/globalRedux/features/auth/auth';

export default function LoginCheck({user}) {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(login(user))
    },[user])
    return(
        <div>

        </div>
    )
}