import Link from "next/link";

export default function SignupComponent() {
    return(
        <div>
            <form className="bg-white p-6 rounded-lg shadow-md w-80" method="POST" action="/api/auth/signup">
                <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                    로그인
                </label>
                <input
                    className="border rounded w-full py-2 px-3"
                    id="username" type="text" placeholder="이름" name="name" />
                </div>
                <div className="mb-4">
                <input
                    className="border rounded w-full py-2 px-3"
                    id="username" type="text" placeholder="이메일" name="email"/>
                </div>
                <div className="mb-4">
                <input
                    className="border rounded w-full py-2 px-3"
                    id="password" type="password" placeholder="비밀번호" name="password"/>
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