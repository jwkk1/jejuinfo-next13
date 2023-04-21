export default function LoginComponent() {
    return(
        <div>
            <form className="bg-white p-6 rounded-lg shadow-md w-80">
                <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" for="username">
                    로그인
                </label>
                <input
                    className="border rounded w-full py-2 px-3"
                    id="username" type="text" placeholder="아이디" />
                </div>
                <div className="mb-6">
                <input
                    className="border rounded w-full py-2 px-3"
                    id="password" type="password" placeholder="비밀번호" />
                </div>
                <div className="flex items-center justify-around">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="button">
                    Sign In
                </button>
                <button
                    className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                    type="button">
                    Sign Up
                </button>
                </div>
                
            </form>
        </div>
    )
}