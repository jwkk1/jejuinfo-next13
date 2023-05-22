'use client'

import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function ScheduleSearchList({getDetailList}) {

    const items = useSelector((state) => state.searchList.value);
    const searchParams = useSearchParams();

    const addItem = async (item) => {

        const result = await fetch('/api/schedule/detail/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: searchParams.get('_id'),
                email: searchParams.get('email'),
                item: item,
              })

          });

        const data = await result.json();
        if(data.data.matchedCount === 1){
            console.log('성공');
            getDetailList();
        }

    }

    return(
        <div className="max-h-full overflow-auto">

        {
            items &&
            items.map((item, i)=>{
                return(
                    <div className="mb-2 mt-2 w-full" key={i}>
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={item.repPhoto.photoid.thumbnailpath} />
                        <div className="flex-grow">
                            <h2 className="text-gray-900 title-font font-medium">{item.title}</h2>
                            <p className="text-gray-500">{item.contentscd.label}</p>
                        </div>
                        <button className="ml-4" onClick={()=>{addItem(item)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>
                        </div>
                    </div>
                );
            })
        }
        </div>
    );
}