import { HTMLProps } from "react";

export type Event = {
  id: number;
  timestamp: number;
  duration: number;
  zone: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
};

export type Events = Array<Event>;

export interface EventComponentProps {
  events: Events | [];
}

export interface VideoPlayerProps extends HTMLProps<HTMLVideoElement> {
  selectedTime?: number;
  onInit: Function;
}

export interface VideoOverlayProps extends HTMLProps<HTMLCanvasElement> {
  onInit: Function;
}
