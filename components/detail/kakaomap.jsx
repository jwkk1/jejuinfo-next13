'use client'

import detail from "@/app/globalRedux/features/detail/detail";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import {kakao} from window;

export default function KakaoMap() {
    const [mapLoaded, setMapLoaded] = useState(false);
    const detailItem = useSelector((state)=> state.detail.value);
    console.log(detailItem)

    useEffect(() => {
        const $script = document.createElement("script");
        $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`;
        $script.addEventListener("load", () => setMapLoaded(true));
        document.head.appendChild($script);
    }, []);

    useEffect(() => {
        if (!mapLoaded) return;
        if (!detailItem) return;

        
        kakao.maps.load(() => {
            let container = document.getElementById('map');
            let options = {
                      center: new kakao.maps.LatLng(detailItem.latitude,
                        detailItem.longitude),
                      level: 7
                  };
            let markerPosition = new kakao.maps.LatLng(
                detailItem.latitude,
                detailItem.longitude,
                );

             let marker = new kakao.maps.Marker({
                position: markerPosition,
                });
            
            let map = new kakao.maps.Map(container, options);
                marker.setMap(map);

        })
        
      }, [mapLoaded, detailItem]);

    return(
        <div id="map" className="rounded-lg" style={{
            width: "100%",
            height: "400px"
        }}></div>
    )
}