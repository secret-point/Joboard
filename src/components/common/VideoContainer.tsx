import React, { createRef, useState } from "react";

interface VideoContainerProps {
    src: string;
    poster?: string;
    type?: string;
    controls?: boolean;
    onClick?: Function;
    id: string;
}

const VideoContainer = ( props: VideoContainerProps ) => {
    const { id, controls, poster, src, type } = props;

    const [showControls, setShowControls] = useState<boolean>(false);
    const videoEl = createRef<HTMLVideoElement>();

    const onShowControl = ( e: React.MouseEvent<HTMLButtonElement> ) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        //@ts-ignore
        videoEl.current.play();
        setShowControls(true);
    };

    return (
        <div className="video-container" data-testid="video">
            {!showControls && (
                <div className="videoPlayButton">
                    <button data-testid="play-button" onClick={onShowControl}>
                        <img
                            src="https://m.media-amazon.com/images/G/01/HVH-CandidateApplication/video_play_button.svg"></img>
                    </button>
                </div>
            )}
            <video
                data-testid={`video-${id}`}
                controls={controls || showControls}
                poster={poster}
                ref={videoEl}
                playsInline={true}
                preload="metadata"
            >
                <source src={`${src}#t=0.1`} type={type || "video/mp4"}/>
            </video>
        </div>
    );
};

export default VideoContainer;
