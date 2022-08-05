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
