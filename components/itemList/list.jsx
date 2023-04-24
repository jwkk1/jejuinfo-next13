'use client'

import { asyncSearchList } from "@/app/globalRedux/features/searchList/searchList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

export default function List() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.searchList)
    console.log(items)
    useEffect(()=>{
        const params = {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            locale: 'kr',
            category: 'c3',
            page: 1
        }
        dispatch(asyncSearchList(params))
    },[])
    return(
        <div>
            List
        </div>
    )
}