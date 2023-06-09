'use client'

import {signIn, signOut} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LogoutBtn(){
    const router = useRouter()
    const onClicksignOut = () => {
        signOut({callbackUrl: process.env.NEXT_PUBLIC_NEXTAUTH_URL, redirect: '/' });
        router.push('/');
    }
    return(
        <div>
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={()=>{onClicksignOut()}}>Sign Out
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
    )
}