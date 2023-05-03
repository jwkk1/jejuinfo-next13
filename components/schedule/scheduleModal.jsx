'use client'

import { useSelector } from "react-redux";

export default function ScheduleMoadal({setShowModal}){
    const user = useSelector((state) => state.auth.email);


    const handleSubmit = async (e) => {

        e.preventDefault();
        if(!e.target.title.value) return
        if(!e.target.description.value) return

        const result = await fetch('/api/schedule/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: e.target.title.value,
              description : e.target.description.value,
              thumbnail : e.target.thumbnail || '',
              email : user.email,
            })
          });

        const data = await result.json();
        if(data.message === 'duplicateSchedule') alert('중복된 플래너 제목입니다.');

        setShowModal(false)
    }

    return(
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            내 플래너 추가하기
                        </h3>
                        <button onClick={() => setShowModal(false)}>닫기</button>
                    </div>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex-wrap">
                        <form onSubmit={(e)=>{handleSubmit(e)}}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-700  mb-2">
                                    플래너 제목
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="title"
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="5월 제주여행"
                                />
                                </div>
                                <div className="mb-4">
                                <label htmlFor="content" className="block text-gray-700  mb-2">
                                    설명
                                    <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="내용을 입력하세요"
                                    rows="5"
                                ></textarea>
                                </div>
                                <div className="mb-4">
                                <label htmlFor="photo" className="block text-gray-700 ">
                                    썸네일 
                                </label>
                                <p className="mb-2 text-gray-400">미선택 시 기본사진으로 대체됩니다.</p>
                                <input
                                    name="photo"
                                    type="file"
                                    className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                </div>
                                <div className="flex items-center justify-center">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    등록
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}