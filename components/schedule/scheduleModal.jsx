'use client'

import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';


export default function ScheduleMoadal({setShowModal, getUserList}){
    const user = useSelector((state) => state.auth.email);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [file, setFile] = useState(null); 

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let thumbnail = '';

        if(!e.target.title.value) return;
        if(!e.target.description.value) return;
        if(!startDate) return;
        if(!endDate) return;
        if(file){
            const uploded = await upload(file);
            thumbnail = uploded.url;
        }
        const startDt = dayjs(startDate).format('YYYY-MM-DD'); 
        const endDt = dayjs(endDate).format('YYYY-MM-DD'); 
        const endDayjs = dayjs(endDt);
        const StartDayjs = dayjs(startDt);
        const length = endDayjs.diff(StartDayjs, 'day') + 1;

        const plan = {
            addList : [],
        };

        for (let i = 1; i <= length; i++) {
            const day = 'day' + i;
            plan[day] = [];
        }

        const result = await fetch('/api/schedule/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: e.target.title.value,
              description : e.target.description.value,
              thumbnail : thumbnail,
              startDate : startDt,
              endDate : endDt,
              plan : plan,
              email : user.email,
            })
          });

        const data = await result.json();
        if(data.message === 'duplicateSchedule') alert('중복된 플래너 제목입니다.');

        setShowModal(false);
        getUserList();
    }

    const upload = async (file) => {
        const url = process.env.NEXT_PUBLIC_CLOUDNARY_URL;
        
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "docs_upload_example_us_preset");
    
        const result = await fetch(url, {
            method: "POST",
            body: formData,
        });
        return result.json();
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
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                    placeholder="내용을 입력하세요"
                                    rows="5"
                                ></textarea>
                            </div>
                            <div className="flex gap-4 mb-5 justify-between">
                                <div className="w-52">
                                    <label htmlFor="start-date-picker" className="block text-sm font-medium text-gray-700">
                                    시작 날짜
                                    <span className="text-red-500">*</span>
                                    </label>
                                    <DatePicker
                                        id="start-date-picker"
                                        selected={startDate}
                                        onChange={handleStartDateChange}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="yyyy.MM.dd"
                                        placeholderText="시작 날짜 선택"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                    />
                                </div>
                                <div className="w-52">
                                    <label htmlFor="end-date-picker" className="block text-sm font-medium text-gray-700">
                                    종료 날짜
                                    <span className="text-red-500">*</span>
                                    </label>
                                    <DatePicker
                                        id="end-date-picker"
                                        selected={endDate}
                                        onChange={handleEndDateChange}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="yyyy.MM.dd"
                                        placeholderText="종료 날짜 선택"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="thumbnail" className="block text-gray-700 ">
                                    썸네일 
                                    <img className="w-16" src="upload.png" alt="파일 업로드 아이콘" />
                                </label>
                                <p className="mb-2 text-gray-400">미선택 시 기본사진으로 대체됩니다.</p>
                                <input
                                    name="thumbnail"
                                    id="thumbnail"
                                    type="file"
                                    style={{ display: "none" }}
                                    className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={handleFileChange}
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
    );
}