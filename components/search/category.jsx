'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function Category() {
    const [onCategory,setonCategory] = useState('c1');
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('category')

    const test = (cd) => {
        setonCategory(cd)
        router.push(`/search?category=${cd}`)
    }
    
    return(
        <div className="flex mx-auto flex-wrap mb-20">
            <a className={ (query === 'c1' ? 'border-indigo-500 text-indigo-500 ' : '') + "sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none tracking-wider rounded-t"} onClick={()=>{test('c1')}}>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>관광지
            </a>
            <a className={ (query === 'c2' ? 'border-indigo-500 text-indigo-500 ' : '') + "sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none tracking-wider rounded-t"} onClick={()=>{test('c2')}}>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>쇼핑
            </a>
            <a className={ (query === 'c3' ? 'border-indigo-500 text-indigo-500 ' : '') + "sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none tracking-wider rounded-t"} onClick={()=>{test('c3')}}>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="3"></circle>
                <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                </svg>숙박
            </a>
            <a className={ (query === 'c4' ? 'border-indigo-500 text-indigo-500 ' : '') + "sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none tracking-wider rounded-t"} onClick={()=>{test('c4')}}>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
                </svg>음식점
            </a>
        </div>
    )
}