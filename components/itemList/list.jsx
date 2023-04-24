'use client'

import { asyncSearchList } from "@/app/globalRedux/features/searchList/searchList";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

export default function List(props) {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.searchList);
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('category')

    useEffect(()=>{
        const params = {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            locale: 'kr',
            category: query,
            page: 1
        }
        dispatch(asyncSearchList(params))
    },[query])
    if(items.value)
    return(
        <>
        {
            items.value.map((item, i)=>{
                let tag = item.alltag !== null ? item.alltag.split(',') : '';

                if(tag || tag.length > 4){
                    tag = tag.slice(0, 3);
                    tag.forEach((item,i)=> tag[i]=`#${item}`)
                }

                return(
                    <div className="xl:w-1/4 md:w-1/2 p-4" key={i} onClick={()=>{router.push('/detail')}}>
                        <div className="bg-gray-100 p-6 rounded-lg" style={{minHeight : '25rem'}}>
                            <img className="h-40 rounded w-full object-cover object-center mb-6" src={item.repPhoto.photoid.thumbnailpath} alt="content" />
                            <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{tag}</h3>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{item.title}</h2>
                            <p className="leading-relaxed text-base">{item.roadaddress}</p>
                        </div>
                    </div>
                )
            })
        }

        </>

    )
}