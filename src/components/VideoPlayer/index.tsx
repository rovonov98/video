import { FC, useRef, memo, useEffect, useCallback } from "react";

import { selectedEventSelector } from "@redux/slices";
import { EventComponentProps, Event } from "types";
import { useTypedSelector } from "@redux";

type InitialActiveEventsValue = {
  [key: string | number]: Event;
};

const initialActiveEventsValue: InitialActiveEventsValue = {};

const VideoPlayer: FC<EventComponentProps> = ({ events }) => {
  const selectedEvent = useTypedSelector(selectedEventSelector);

  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const activeEvents = useRef(initialActiveEventsValue);

  const onLoadMetaData = useCallback(() => {
    const width = video.current?.videoWidth;
    const height = video.current?.videoHeight;

    const pixelRatio = window.devicePixelRatio;

    const ctx = canvas.current?.getContext("2d");

    canvas.current!.width = width || 0;
    canvas.current!.height = height || 0;

    ctx?.scale(pixelRatio, pixelRatio);
  }, []);

  const onTimeUpdate = useCallback(() => {
    if (video.current && canvas.current) {
      const currentTime = video.current.currentTime * 1000;
      const active = activeEvents.current;

      const ctx = canvas.current.getContext("2d");

      ctx?.clearRect(0, 0, canvas.current.width, canvas.current.height);
      ctx!.strokeStyle = "green";
      ctx!.lineWidth = 4;

      for (let i = 0, len = events.length; i < len; i++) {
        const event = events[i];
        const timeStart = event.timestamp;

        if (timeStart > currentTime) break;

        const timeEnd = timeStart + event.duration;

        if (timeEnd > currentTime) {
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
  }, [events, video, canvas]);

  useEffect(() => {
    selectedEvent && video.current && (video.current.currentTime = selectedEvent.timestamp / 1000);
  }, [selectedEvent]);

  return (
    <>
      <div>
        <div className="video-player-container">
          <video className="video" onTimeUpdate={onTimeUpdate} onLoadedMetadata={onLoadMetaData} ref={video} controls>
            <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
          </video>
          <canvas className="canvas" ref={canvas} />
        </div>
      </div>
    </>
  );
};

export default memo(VideoPlayer);
