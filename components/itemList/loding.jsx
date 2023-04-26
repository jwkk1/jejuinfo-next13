'use client'

import { Audio } from "react-loader-spinner"

export default function Loading() {
    return(
        <div className="loadingContainer">
            <Audio
                height="60"
                width="60"
                color="#FFF"
                ariaLabel="audio-loading"
                wrapperClass="wrapper-class"
                visible={true}
            />
        </div>
    )
}