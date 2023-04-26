import DetailList from "@/components/detail/detailList";
import KakaoMap from "@/components/detail/kakaomap";

export default function Detail() {
    return(
        <div>
            <section className="text-gray-600 body-font">
               <DetailList />
            </section>
            <section className="body-font">
                <div className="flex flex-col">
                    <KakaoMap />

                </div>
            </section>
        </div>
    )
}