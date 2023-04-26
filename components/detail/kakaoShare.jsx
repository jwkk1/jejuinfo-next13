'use client'

import { useEffect, useState } from "react";
import ShareButton from "./sharebutton";

export default function KakaoShare() {
    const [shareButton, setShareButton] = useState(false);
    const pathname = location.href;


    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.async = true;
      document.body.appendChild(script);
    
      // 스크립트가 로드 된 후 쉐어버튼 렌더링
      script.onload = () => {
        setShareButton(true);
      };
  
    }, []);

    return(
        <>
            {shareButton && (
                <ShareButton
                url={pathname}
                />
            )}
        </>
    )
}