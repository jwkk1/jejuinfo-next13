'use client'

import { useEffect, useState } from "react";

export default function ScheduleDetail(){
    const [detailList, setDetailList] = useState('');

    useEffect(()=>{
        getDetailList();
    },[]);

    const getDetailList = async () => {
        const result = await fetch('/api/schedule/detail/get', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: '6452149395ce421b1778a45a',
              email: 'test@test.com',
            })
          });

        const data = await result.json();
        setDetailList(data.data);

    }
    
    if(detailList)
    return(
        <div>
            {detailList.title}
        </div>
    )
}