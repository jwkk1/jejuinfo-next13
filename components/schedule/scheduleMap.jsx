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

        const lat = Object.keys(item).reduce((result, key) => {
          const dayArray = item[key];
          const extractedItems = dayArray.map(item => ({ lat: item.latitude, lng: item.longitude }));
          return result.concat(extractedItems);
        }, []);
        
        
        kakao.maps.load(() => {
            let container = document.getElementById('map');
            let options = {
                      center: new kakao.maps.LatLng(33.4,
                        126.5),
                      level: 10
                  };

            
            let map = new kakao.maps.Map(container, options);

            var markerImage = new kakao.maps.MarkerImage(
              '/marker.png',
              new kakao.maps.Size(35, 35),
              { offset: new kakao.maps.Point(10, 10) }
            );


            let markerPositions = [
                ...lat
                ];
            
                for (let i = 0; i < markerPositions.length; i++) {
                let marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(markerPositions[i].lat, markerPositions[i].lng),
                    image: markerImage
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