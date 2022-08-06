import { FC, useRef, memo, useCallback, SyntheticEvent, useState } from "react";

import { selectedEventSelector } from "@redux/slices";
import { Event, EventComponentProps } from "types";
import { useTypedSelector } from "@redux";
import VideoOverlay from "./VideoOverlay";
import Video from "./Video";

type InitialActiveEventsValue = {
  [key: string | number]: Event;
};

const initialActiveEventsValue: InitialActiveEventsValue = {};

const VideoPlayer: FC<EventComponentProps> = ({ events }) => {
  const selectedEvent = useTypedSelector(selectedEventSelector);

  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  const progress = useRef<HTMLProgressElement>(null);

  const activeEvents = useRef(initialActiveEventsValue);

  const onLoadMetaData = useCallback(
    (e: SyntheticEvent<HTMLVideoElement>) => {
      const width = e?.currentTarget?.videoWidth;
      const height = e?.currentTarget?.videoHeight;

      canvas!.width = width || 0;
      canvas!.height = height || 0;
    },
    [canvas]
  );

  const onTimeUpdate = useCallback(() => {
    if (video && canvas) {
      const currentTime = video.currentTime * 1000;
      const active = activeEvents.current;

      const ctx = canvas.getContext("2d");

      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx!.strokeStyle = "green";
      ctx!.lineWidth = 4;

      for (let i = 0, len = events.length; i < len; i++) {
        const event = events[i];
        const timeStart = event.timestamp;

        const isTooEarly = timeStart > currentTime;

        const timeEnd = timeStart + event.duration;

        if (timeEnd > currentTime && !isTooEarly) {
          active[i] = event;
        } else {
          if (active.hasOwnProperty(i)) delete active[i];
        }
      }

      for (let id in active) {
        const event = active[id];
        const zone = event.zone;
        ctx?.beginPath();
        ctx?.rect(zone.left, zone.top, zone.width, zone.height);
        ctx?.stroke();
      }
    }
  }, [events, video, canvas, progress]);

  const onVideoInit = useCallback((vid: HTMLVideoElement) => {
    setVideo(vid);
  }, []);

  const onCanvasInit = useCallback((canv: HTMLCanvasElement) => {
    setCanvas(canv);
  }, []);

  return (
    <>
      <div>
        <div className="video-player-container">
          <Video
            onLoadedMetadata={onLoadMetaData}
            onTimeUpdate={onTimeUpdate}
            onInit={onVideoInit}
            selectedTime={selectedEvent ? selectedEvent.timestamp / 1000 : 0}
          />
          <div className="video-controls">
            <progress className="progress" value={0} max={100} ref={progress} />
          </div>
          <VideoOverlay onInit={onCanvasInit} />
        </div>
      </div>
    </>
  );
};

export default memo(VideoPlayer);
