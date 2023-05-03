'use client'

import { useState } from "react";
import ScheduleMoadal from "./scheduleModal";

export default function ScheduleList() {
    const [showModal, setShowModal] = useState(false);

    return(
        <>
            <div className="xl:w-1/4 md:w-1/2 p-4" onClick={() => setShowModal(true)}>
                <div className="bg-gray-100 p-6 rounded-lg flex h-full items-center justify-center" style={{minHeight : '25rem'}}>
                    <img className="rounded object-cover object-center w-20 h-20 mx-auto" src="plus.png" alt="content" />
                </div>
            </div>
            {/* <div className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-gray-100 p-6 rounded-lg" style={{minHeight : '25rem'}}>
                    <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://www.polytec.com.au/img/products/960-960/mercurio-grey.jpg" alt="content" />
                    <div className="flex items-center">
                        <div>
                            <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">태그</h3>
                        </div>
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">이름</h2>
                    <p className="leading-relaxed text-base">주소</p>
                </div>
            </div> */}

            
            {showModal && ( <ScheduleMoadal setShowModal={setShowModal}/>)}

        </>
    )
}