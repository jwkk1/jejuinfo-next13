'use client'

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ScheduleMap({item}) {
    const [mapLoaded, setMapLoaded] = useState(false);




    useEffect(() => {
        const $script = document.createElement("script");
        $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`;
        $script.addEventListener("load", () => setMapLoaded(true));
        document.head.appendChild($script);
    }, []);

    useEffect(() => {
        if (!mapLoaded) return;
        const lat = item.map(function(obj) {
            return {
              lat: obj.latitude ,
              lng: obj.longitude
            };
          });
        
        kakao.maps.load(() => {
            let container = document.getElementById('map');
            let options = {
                      center: new kakao.maps.LatLng(33.5,
                        126.5),
                      level: 10
                  };

            
            let map = new kakao.maps.Map(container, options);


            let markerPositions = [
                ...lat
                // 추가 위치 정보
                ];
            
                for (let i = 0; i < markerPositions.length; i++) {
                let marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(markerPositions[i].lat, markerPositions[i].lng)
                });
                marker.setMap(map);
                }

        })
        
      }, [mapLoaded, item]);

    return(
        <div id="map" className="rounded-lg h-full" style={{
            width: "100%",

        }}></div>
    )
}