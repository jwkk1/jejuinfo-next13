'use client'

import { useEffect, useState } from "react";
import ScheduleMoadal from "./scheduleModal";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function ScheduleList() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [scheduleList, setSceduleList] = useState('');
    const user = useSelector((state) => state.auth.email);

    useEffect(()=>{
        if(user){
            getUserList();
        }

    },[user]);

    const getUserList = async () => {
        const result = await fetch('/api/schedule/get', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: user.email,
            })
          });

        const data = await result.json();
        setSceduleList(data.data);
    }

    const onClickdetail = (e, id) => {
        router.push(`/scheduleDetail?email=${user.email}&_id=${id}`)
    }


    return(
        <>
            <div className="xl:w-1/4 md:w-1/2 p-4" onClick={() => setShowModal(true)}>
                <div className="bg-gray-100 p-6 rounded-lg flex h-full items-center justify-center" style={{minHeight : '25rem'}}>
                    <img className="rounded object-cover object-center w-20 h-20 mx-auto" src="plus.png" alt="content" />
                </div>
            </div>
     
            {
                scheduleList && 
                scheduleList.map((item, i)=>{
                    return(
                        <div className="xl:w-1/4 md:w-1/2 p-4" key={i} onClick={(e)=>{onClickdetail(e,item._id)}}>
                            <div className="bg-gray-100 p-6 rounded-lg" style={{minHeight : '25rem'}}>
                                <img className="h-40 rounded w-full object-cover object-center mb-6" src={item.thumbnail || "jeju.png"} alt="content" />
                                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{item.title}</h2>
                                <p className="leading-relaxed text-base">{item.description}</p>
                            </div>
                        </div>
                    )
                })
            }

            {showModal && ( <ScheduleMoadal setShowModal={setShowModal} getUserList={getUserList} />)}

        </>
    )
}