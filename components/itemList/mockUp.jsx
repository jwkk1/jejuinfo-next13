'use client'

import Loading from "./loding";

export default function Mockup(){
    const array = new Array(4).fill('0')
    return(
        <div className="flex flex-wrap -m-4">
            {
                array.map((a, i)=>{
                    return(
                        <div className="xl:w-1/4 md:w-1/2 p-4" key={i}>
                            <div className="bg-gray-100 p-6 rounded-lg" style={{minHeight : '25rem'}}>
                                <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://www.polytec.com.au/img/products/960-960/mercurio-grey.jpg" alt="content" />
                                <div className="flex items-center">
                                    <div>
                                        <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">■■■■■■■■■■■■</h3>
                                    </div>
                                    <div className="w-7 h-auto ml-auto">
                                        <svg fill='yellow' stroke="yellow" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">■■■■■■■■■■■■■■■</h2>
                                <p className="leading-relaxed text-base">■■■■■■■■■■■■■■■■■</p>
                            </div>
                        </div>
                    )
                })
            }
            <Loading />
        </div>
    );
}