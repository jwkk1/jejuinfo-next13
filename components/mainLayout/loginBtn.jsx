'use client'

import {signIn, signOut} from 'next-auth/react'

export default function LoginBtn(){
    return(
        <div>
            <button className="inline-flex items-center bg-green-400 border-0 py-1 px-3 focus:outline-none hover:bg-green-200 rounded text-base mt-4 md:mt-0" onClick={()=>{signIn()}}>Sign In
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
    )
}