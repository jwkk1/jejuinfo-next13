'use client'

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ScheduleMap() {
    const [mapLoaded, setMapLoaded] = useState(false);


    useEffect(() => {
        const $script = document.createElement("script");
        $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`;
        $script.addEventListener("load", () => setMapLoaded(true));
        document.head.appendChild($script);
    }, []);

    useEffect(() => {
        if (!mapLoaded) return;
        
        kakao.maps.load(() => {
            let container = document.getElementById('map');
            let options = {
                      center: new kakao.maps.LatLng(33.5,
                        126.5),
                      level: 10
                  };
            let markerPosition = new kakao.maps.LatLng(
                33.5,
                126.5,
                );

             let marker = new kakao.maps.Marker({
                position: markerPosition,
                });
            
            let map = new kakao.maps.Map(container, options);
                marker.setMap(map);

        })
        
      }, [mapLoaded ]);

    return(
        <div id="map" className="rounded-lg h-full" style={{
            width: "100%",

        }}></div>
    )
}