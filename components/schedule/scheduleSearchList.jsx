'use client'

import { useSelector } from "react-redux";

export default function ScheduleSearchList() {

    const items = useSelector((state) => state.searchList.value);


    return(
        <div className="max-h-full overflow-auto">

        {
            items &&
            items.map((item, i)=>{
                return(
                    <div className="p-2 w-full" key={i}>
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={item.repPhoto.photoid.thumbnailpath} />
                        <div className="flex-grow">
                            <h2 className="text-gray-900 title-font font-medium">{item.title}</h2>
                            <p className="text-gray-500">{item.contentscd.label}</p>
                        </div>
                        </div>
                    </div>
                );
            })
        }
        </div>
    );
}