import { useState } from "react";

export default function SignupComponent() {
    let [emailCheck, setEmailCheck] = useState(false);
    let [passwordCheck, setPasswordCheck] = useState(false);
    let [nameCheck, setNameCheck] = useState(false);

    const signUp = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;

        if(!name){
            setNameCheck(true)
            return
        }

        if(!email){
            setEmailCheck(true)
            return
        }
        if(!password || password.length < 8){
            setPasswordCheck(true);
            return
        }

        const result = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password
            })
          });
        const data = await result.json();

        if(data.message == 'success' && result.status === 200){
            alert('회원가입에 성공하였습니다.');
            location.href = '/login';
        } 
        if (result.status === 403){
            setEmailCheck(true);
        }
        
    }

    return(
        <div>
            <form className="bg-white p-6 rounded-lg shadow-md w-80" onSubmit={signUp}>
                <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                    로그인
                </label>
                <input
                    className={`${nameCheck ? "border-red-500" : ''} border rounded w-full py-2 px-3`}
                    id="username" type="text" placeholder="이름" name="name" />
                    {nameCheck ? <label className="text-red-500">이름을 입력해주세요</label> : ''}
                </div>
                <div className="mb-4">
                <input
                    className={`${emailCheck ? "border-red-500" : ''} border rounded w-full py-2 px-3`}
                    id="username" type="email" placeholder="이메일" name="email"/>
                    {emailCheck ? <label className="text-red-500">이메일을 확인해주세요</label> : ''}
                </div>
                <div className="mb-4">
                <input
                    className={`${passwordCheck ? "border-red-500" : ''} border rounded w-full py-2 px-3`}
                    id="password" type="password" placeholder="비밀번호" name="8자리 이상" maxLength='12'/>
                    {passwordCheck ? <label className="text-red-500">비밀번호를 확인해주세요</label> : ''}
                </div>
                <div className="flex items-center justify-around">
                </div>
                <div className="flex item-center justify-center">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-full"
                        type="submit">
                        Sing up
                    </button>
                </div>
            </form>
        </div>
    )
}