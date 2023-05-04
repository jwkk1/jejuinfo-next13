'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ScheduleDetail(){
    const [detailList, setDetailList] = useState('');
    const searchParams = useSearchParams();

    useEffect(()=>{
        console.log(searchParams)
        getDetailList();
    },[]);

    const getDetailList = async () => {
        const result = await fetch('/api/schedule/detail/get', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: searchParams.get('_id'),
              email: searchParams.get('email'),
            })
          });

        const data = await result.json();
        console.log(data)
        setDetailList(data.data);

    }

    if(detailList)
    return(
        <div>
            {detailList.title}
        </div>
    )
}