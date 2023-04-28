'use client'

import { asyncSearchList, reset } from "@/app/globalRedux/features/searchList/searchList";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import Mockup from "./mockUp";

export default function List() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.searchList);
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('category');
    const email = useSelector((state) => state.auth.email);
    const [userList, setUserList] = useState('');


    useEffect(()=>{
        const params = {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            locale: 'kr',
            category: query,
            page: 1
        }
        dispatch(asyncSearchList(params))
        return () => dispatch(reset());
    },[query]);

    useEffect(()=>{
        if(email){
            getUserList();
        }
    },[email])

    const getUserList = async () => {
        const result = await fetch('/api/searchlist/getuserlist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
            })
          });

        const data = await result.json();
        const userdata = data.data.map((item)=>{
            return item.contentsid
        })
        setUserList(userdata);
    }

    const addStar = async (e, item) => {

        e.stopPropagation();

        if(!email){
            alert('로그인이 필요합니다.')
            return;
        }

         const result = await fetch('/api/searchlist/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              item : item,
            })
          });

        const data = await result.json();
        const userdata = data.data.map((item)=>{
            return item.contentsid
        })
        setUserList(userdata)
    }

    const enterDetail = (item) => {
        router.push(`/detail?cid=${item.contentsid}`)
    }

    if(items.status === 'success' && items.value.length > 0)
    return(
        <>
        {
            items.value.map((item, i)=>{
                let tag = item.alltag !== null ? item.alltag.split(',') : '';

                if(tag || tag.length > 4){
                    tag = tag.slice(0, 3);
                    tag.forEach((item,i)=> tag[i]=`#${item}`)
                }
                
                let isOn = userList.includes(item.contentsid);
                

                return(
                    <div className="xl:w-1/4 md:w-1/2 p-4" key={item.contentsid} onClick={()=>{enterDetail(item)}}>
                        <div className="bg-gray-100 p-6 rounded-lg" style={{minHeight : '25rem'}}>
                            <img className="h-40 rounded w-full object-cover object-center mb-6" src={item.repPhoto == null ? '' : item.repPhoto.photoid.thumbnailpath} alt="content" />
                            <div className="items-center">
                                <div>
                                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{tag}</h3>
                                </div>
                                <div className="w-7 h-auto ml-auto" onClick={(e)=>{addStar(e,item)}}>
                                    <svg fill={isOn ? 'yellow' : 'none'} stroke="yellow" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path>
                                    </svg>
                                </div>
                            </div>
                                <div className="w-full">
                                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{item.title} </h2>
                                <p className="leading-relaxed text-base">{item.roadaddress}</p>
                                </div>
                         </div>
                    </div>
                )
            })
        }
        </>
    );
    if(items.status === 'loading' || items.status === 'ready')

    return (
        <>
            <Mockup />
        </>

    );
}