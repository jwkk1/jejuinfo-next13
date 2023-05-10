'use client'

import Link from "next/link";
import {signIn} from 'next-auth/react'
import { useState } from "react";

export default function LoginComponent() {

    let [emailCheck, setEmailCheck] = useState(false);
    let [passwordCheck, setPasswordCheck] = useState(false);
    
    const login = async (e) => {
        // 원래 실행되는 이벤트 취소
        e.preventDefault();
        // Form 안에서 이메일, 패스워드 가져오기
        const email = e.target.email.value;
        const password = e.target.password.value;
        if(!email){
            setEmailCheck(true)
            return
        }
        if(!password){
            setPasswordCheck(true);
            return
        }
        const response = await signIn("email-password-credential", {
            email,
            password,
            redirect: false
        });
        if(response.error == 'CredentialsSignin') {
            alert('계정정보를 확인해주세요.')
        }
        if(response.status === 200) {
            location.href = '/'
        }
    }
    return(
        <div className="">
            <form className="bg-white p-6 rounded-lg shadow-md w-80" onSubmit={login}>
                <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                    로그인
                </label>
                <input
                    className={`${emailCheck ? "border-red-500" : ''} border rounded w-full py-2 px-3`}
                    id="email" type="email" placeholder="아이디" />
                    {emailCheck ? <label className="text-red-500">이메일을 입력해주세요</label> : ''}
                </div>
                <div className="mb-6">
                <input
                    className={`${passwordCheck ? "border-red-500" : ''} border rounded w-full py-2 px-3`}
                    id="password" type="password" placeholder="비밀번호" />
                    {passwordCheck ? <label className="text-red-500">비밀번호를 입력해주세요</label> : ''}
                </div>
                <div className="flex items-center justify-around">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    type="submit" >
                    Sign In
                </button>
                <Link href={'/signup'}>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="button">
                        Sign Up
                    </button>
                </Link>
                </div>
                <div className="flex item-center justify-center">
                    {/* <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-full"
                        type="button">
                        네이버로그인
                    </button> */}
                </div>
            </form>
        </div>
    )
}