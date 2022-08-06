import { FC, useRef, memo, useEffect, useCallback, MouseEvent, TouchEvent } from "react";

import { VideoPlayerProps } from "types";

const VideoPlayer: FC<VideoPlayerProps> = ({ onInit, selectedTime, ...rest }) => {
  const video = useRef<HTMLVideoElement>(null);

  const onClick = useCallback(
    (e: MouseEvent<HTMLVideoElement> | TouchEvent<HTMLVideoElement>) => {
      e.preventDefault();
      video.current?.paused ? video.current?.play() : video.current?.pause();
    },
    [video]
  );

  useEffect(() => {
    selectedTime && video.current && (video.current.currentTime = selectedTime);
  }, [selectedTime]);

  useEffect(() => {
    video.current && onInit && onInit(video.current);
  }, [video]);

  return (
    <video className="video" onClick={onClick} ref={video} {...rest}>
      <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
    </video>
  );
};

export default memo(VideoPlayer);
