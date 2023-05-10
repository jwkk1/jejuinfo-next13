'use client'

import EmptySearchList from "@/components/schedule/emptySearchList";
import ScheduleMap from "@/components/schedule/scheduleMap";
import { asyncSearchList, reset } from "@/app/globalRedux/features/searchList/searchList";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScheduleSearchList from "@/components/schedule/scheduleSearchList";

export default function ScheduleDetail(){
    const [detailList, setDetailList] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const items = useSelector((state) => state.searchList.value);
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

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

    const handleSearch = async () => {
        if(!searchKeyword) return;
        const params = {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            locale: 'kr',
            title: searchKeyword,
        }

        dispatch(asyncSearchList(params));
    }

    if(detailList)
    return(
        <section className="text-gray-600 body-font relative w-full lg:mx-5 md:mx-2" style={{height : '40rem'}}>
            <div className="absolute inset-0 bg-gray-300">
                <ScheduleMap />
            </div>
            <div className="py-12 flex mx-3 h-full">
                <div className="lg:w-80 md:w-64 bg-white rounded-lg p-8 flex flex-col mt-10 md:mt-0 relative z-10 shadow-md">
                    <div>
                        <h1 className="text-xl font-bold text-center mb-5">{detailList.title}</h1>
                        <h2 className="text-md text-gray-500 text-center">{detailList.description}</h2>
                    </div>
                </div>

                <div className="lg:w-80 md:w-64 bg-white rounded-lg p-6 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                    <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">여행지 검색</h2>
                    <p className="leading-relaxed mb-5 text-gray-600">여행지를 검색하여 일정에 추가해보세요.</p>
                    <div className="flex bg-white rounded-lg shadow-md mb-8">
                        <input type="text" value={searchKeyword} className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="검색어를 입력하세요." onChange={(e)=>{setSearchKeyword(e.target.value)}} />
                        <button className="mr-3 bg-white rounded-lg hover:bg-blue-50 focus:outline-none focus:bg-blue-50" onClick={()=>{handleSearch()}}>
                            <span className="sr-only">검색</span>
                            <svg className="w-5 h-5 text-sky-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.5 20.5L17.7167 15.7167M20 11.5C20 15.6421 16.6421 19 12.5 19C8.35786 19 5 15.6421 5 11.5C5 7.35786 8.35786 4 12.5 4C16.6421 4 20 7.35786 20 11.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>

                    {
                        items.length > 0
                        ? <ScheduleSearchList />
                        : <EmptySearchList />
                    }
                    

                </div>
            </div>
        </section>
    )
}