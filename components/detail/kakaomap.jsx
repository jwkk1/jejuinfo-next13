'use client'

import { useEffect, useState } from "react";
// import {kakao} from window;

export default function KakaoMap() {
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        const $script = document.createElement("script");
        $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`;
        $script.addEventListener("load", () => setMapLoaded(true));
        document.head.appendChild($script);
    }, []);

    useEffect(() => {
        if (!mapLoaded) return;
        console.log(kakao.maps.load)
        
        kakao.maps.load(() => {
            var container = document.getElementById('map');
            var options = {
                      center: new kakao.maps.LatLng(33.450701, 126.570667),
                      level: 3
                  };
          
            var map = new kakao.maps.Map(container, options);

        })
        
      }, [mapLoaded]);
    return(
        <div id="map" style={{
            width: "100%",
            height: "400px"
        }}></div>
    )
}