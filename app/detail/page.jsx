import DetailList from "@/components/detail/detailList";

export default function Detail() {
    return(
        <div>
            <section className="text-gray-600 body-font">
               <DetailList />
            </section>

            <section className="body-font">
                <div className="flex flex-col">
                    <iframe width="100%" height="100%" className="absolute inset-0" frameBorder="0" title="map" marginHeight="0" marginWidth="0" scrolling="no" src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=%C4%B0zmir+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed" ></iframe>
                </div>
            </section>
        </div>
    )
}