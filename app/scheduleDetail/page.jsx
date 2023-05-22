'use client'

import EmptySearchList from "@/components/schedule/emptySearchList";
import ScheduleMap from "@/components/schedule/scheduleMap";
import { asyncSearchList, reset } from "@/app/globalRedux/features/searchList/searchList";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScheduleSearchList from "@/components/schedule/scheduleSearchList";
import TourCard from "@/components/schedule/TourCard";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function ScheduleDetail(){
    const [detailList, setDetailList] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [plan, setPlan] = useState(null);
    const items = useSelector((state) => state.searchList.value);
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        getDetailList();
    },[]);

    const getDetailList = async () => {
        const result = await fetch('/api/schedule/detail/get', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: searchParams.get('_id'),
              email: searchParams.get('email'),
            })
          });

        const data = await result.json();
        setDetailList(data.data);
        setPlan(data.data.plan);
        console.log(plan);
    }   

    const handleSearch = async (e) => {
        if(!searchKeyword) return;
        if(e.type === 'keydown' && e.key !== 'Enter') return;

        const params = {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            locale: 'kr',
            title: searchKeyword,
        }

        dispatch(asyncSearchList(params));
    }

    const handleDragEnd = (result) => {
        if (!result.destination) return;
    
        const sourceGroupId = result.source.droppableId;
        const destinationGroupId = result.destination.droppableId;
    
        if (sourceGroupId === destinationGroupId) {
          const updatedItems = {
            ...plan,
            [sourceGroupId]: Array.from(plan[sourceGroupId]),
          };
    
          const [removed] = updatedItems[sourceGroupId].splice(result.source.index, 1);
          updatedItems[sourceGroupId].splice(result.destination.index, 0, removed);
    
          setPlan(updatedItems);
        } else {
          const sourceItems = Array.from(plan[sourceGroupId]);
          const destinationItems = Array.from(plan[destinationGroupId]);
    
          const [removed] = sourceItems.splice(result.source.index, 1);
          destinationItems.splice(result.destination.index, 0, removed);
    
          const updatedItems = {
            ...plan,
            [sourceGroupId]: sourceItems,
            [destinationGroupId]: destinationItems,
          };
    
          setPlan(updatedItems);
        }
      };
    

    if(detailList)
    return(
        <DragDropContext onDragEnd={handleDragEnd}>
            <section className="text-gray-600 body-font relative w-full lg:mx-5 md:mx-2" style={{height : '40rem'}}>
                <div className="absolute inset-0 bg-gray-300">
                    <ScheduleMap item={detailList.plan.addList}/>
                </div>
                <div className="py-12 flex mx-3 h-full">
                    <div className="lg:w-80 md:w-64 bg-white rounded-lg p-4 flex flex-col mt-10 md:mt-0 relative z-10 shadow-md overflow-auto">
                        <div>
                            <div className="pl-2 pr-2 mt-2">
                                <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">{detailList.title}</h2>
                                <p className="leading-relaxed mb-1 text-gray-600">{detailList.startDate +' ~ '+ detailList.endDate.substring(5)}</p>   
                                <p className="leading-relaxed mb-2 text-gray-600">{detailList.description}</p>   
                            </div>
                            <div className="flex flex-col ">
                                <div className="p-2 rounded-lg">
                                    {/* <div className="border-b border-gray-300">플랜</div> */}

                                    <div>
                                        {Object.keys(plan).map((groupId, i) => (
                                        <Droppable key={groupId} droppableId={groupId}>
                                            {(provided) => (
                                                
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            > 
                                                <div className="border-b border-gray-300">
                                                    {i === 0 ? '플랜' : `day ${i}`}
                                                </div>
                                                {   
                                                
                                                    plan[groupId].map((item, index) => (
                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                        {(provided,snapshot) => (
                                                        <div
                                                            className={`w-full`}
                                                            ref={provided.innerRef}
                                                            isDragging={snapshot.isDragging}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            
                                                            <TourCard item={item} key={index}/>
                                                        </div>
                                                        )}
                                                    </Draggable>
                                                    ))
                                                }
                                               {provided.placeholder}
                                            </div>
                                            )}
                                        </Droppable>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-80 md:w-64 bg-white rounded-lg p-6 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">여행지 검색</h2>
                        <p className="leading-relaxed mb-5 text-gray-600">여행지를 검색하여 일정에 추가해보세요.</p>
                        <div className="flex bg-white rounded-lg shadow-md mb-8">
                            <input type="text" value={searchKeyword} className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="검색어를 입력하세요." onChange={(e)=>{setSearchKeyword(e.target.value)}} onKeyDown={handleSearch}/>
                            <button className="mr-3 bg-white rounded-lg hover:bg-blue-50 focus:outline-none focus:bg-blue-50" onClick={()=>{handleSearch()}}>
                                <span className="sr-only">검색</span>
                                <svg className="w-5 h-5 text-sky-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.5 20.5L17.7167 15.7167M20 11.5C20 15.6421 16.6421 19 12.5 19C8.35786 19 5 15.6421 5 11.5C5 7.35786 8.35786 4 12.5 4C16.6421 4 20 7.35786 20 11.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>

                        {
                            items.length > 0
                            ? <ScheduleSearchList getDetailList={getDetailList} />
                            : <EmptySearchList />
                        }
                    
                    </div>
                </div>
            </section>
        </DragDropContext>
    )
}