export default function EmptySearchList() {
    return(
        <div className="flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 110-16 8 8 0 010 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-8a1 1 0 011 1v4a1 1 0 11-2 0V9a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <div>
                <h1 className="text-2xl font-bold text-center ">검색어를 입력하세요.</h1>
                <h2 className="text-md text-gray-500 text-center">장소를 검색하여 여행지를 추가해보세요.</h2>
            </div>
        </div>
    );
}