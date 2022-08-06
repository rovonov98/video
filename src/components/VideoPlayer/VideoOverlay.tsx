import { FC, useRef, memo, useEffect } from "react";

import { VideoOverlayProps } from "types";

const VideoOverlay: FC<VideoOverlayProps> = ({ onInit }) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    canvas.current && onInit && onInit(canvas.current);
  }, [canvas]);

  return <canvas className="canvas" ref={canvas} />;
};

export default memo(VideoOverlay);
