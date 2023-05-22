'use client'

export default function TourCard({item}) {
    return(
        <div className="w-full mb-2 mt-2">
            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={item.repPhoto.photoid.thumbnailpath} />
                <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">{item.title}</h2>
                    <p className="text-gray-500">{item.contentscd.label}</p>
                </div>
                {/* <button className="ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button> */}
            </div>
        </div>
    )
}