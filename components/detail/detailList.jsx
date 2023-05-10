'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { asyncGetDetail, reset } from "@/app/globalRedux/features/detail/detail";
import { useDispatch, useSelector } from "react-redux";
import KakaoShare from "./kakaoShare";
import Link from "next/link";

export default function DetailList() {
    const dispatch = useDispatch();
    const detailItem = useSelector((state)=> state.detail.value);
    const email = useSelector((state) => state.auth.email);
    const searchParams = useSearchParams();
    const cid = searchParams.get('cid');
    const [userList, setUserList] = useState('');
    const [isOn, setIsOn] = useState(false);


    useEffect(()=>{
        const params = {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            locale: 'kr',
            cid: cid,
        }
        dispatch(asyncGetDetail(params))
        return () => dispatch(reset());
    },[]);

    useEffect(()=>{
        if(email){
            getUserList();
        }
    },[email])

    useEffect(()=>{
        setIsOn(userList.includes(detailItem.contentsid));
    },[userList])

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

    const addStar = async () => {
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
              item : detailItem,
            })
          });

        const data = await result.json();
        const userdata = data.data.map((item)=>{
            return item.contentsid
        })
        setUserList(userdata);
    }

    if(detailItem)
    return(
        <div className="container px-5 py-12 mx-auto flex flex-wrap justify-center">
            <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
                <img alt="feature" className="object-cover object-center h-full w-full" src={detailItem.repPhoto.photoid.thumbnailpath} />
            </div>
            <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
                <div className="flex flex-col items-center h-10"  onClick={(e)=>{addStar(e)}}>
                    <svg fill={isOn ? 'yellow' : 'none'}  stroke="yellow" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path>
                    </svg>
                </div>
                <div className="flex flex-col mb-10 lg:items-start items-center">
                    <div >
                        <h2 className="text-gray-900 text-lg title-font font-medium mb-3">{detailItem.title}</h2>
                        <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">#{detailItem.tag.replace(/,/g,'#')}</h3>
                        <p>{detailItem.introduction}</p>
                        <h2 className="text-gray-900 text-lg title-font font-medium mb-3">카테고리</h2>
                        <p className="leading-relaxed text-base">{detailItem.contentscd.label}</p>
                        <Link href={'/search?category=c1'}>
                            <p className="mt-3 text-indigo-500 inline-flex items-center">다른 카테고리 찾아보기
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24" >
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </p>
                        </Link>
                        <p className="leading-relaxed text-base">Context</p>
                        <p className="leading-relaxed text-base">{detailItem.roadaddress}</p>
                        <a className="mt-3 text-indigo-500 inline-flex items-center">카카오지도 앱으로 보기
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </a>
                        <div className="flex flex-col items-center justify-center mt-5 mb-5">
                            <KakaoShare />
                            <p>공유하기</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}