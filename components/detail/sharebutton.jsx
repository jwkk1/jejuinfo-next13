'use client'

import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ShareButton({url}){

    const detailItem = useSelector((state)=> state.detail.value);

    useEffect(() => {
        const createKakaoButton = () => {
          if (window.Kakao && detailItem) {

            const kakao = window.Kakao;
            if (!kakao.isInitialized()) {
              kakao.init(process.env.NEXT_PUBLIC_KAKAOMAP_KEY);
            }
            kakao.Link.createDefaultButton({
              container: "#kakao-link-btn",
              objectType: "feed",
              content: {
                title: detailItem.title,
                description: detailItem.introduction || 'jeju Info',
                imageUrl: detailItem.repPhoto.photoid.thumbnailpath,

                link: {
                  mobileWebUrl: url,
                  webUrl: url,
                },
              },
              buttons: [
                {
                  title: "웹으로 보기",
                  link: {
                    mobileWebUrl: url,
                    webUrl: url,
                  },
                },
              ],
            });
          }
        };
        createKakaoButton();
      }, [url, detailItem]);
      // 카카오 공유하기 버튼. id kakao-link-btn 부분에 kakao 공유하기가 설정됨
      
      return(
        <div className="w-50 h-20">
            <img
            className="w-20 h-20"
            id="kakao-link-btn"
            src="/kakao.png"
            alt="카카오로 공유하기"
            />

        </div>
      )
    
}