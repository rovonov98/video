import { FC, useCallback } from "react";

import { Event, EventComponentProps } from "types";
import { selectEvent } from "@redux/slices";
import { useTypedDispatch } from "@redux";
import { formatDate } from "lib/utils";

const Events: FC<EventComponentProps> = ({ events }) => {
  const dispatch = useTypedDispatch();

  const clickHandler = useCallback(
    (event: Event) => {
      dispatch(selectEvent(event));
    },
    [dispatch]
  );

  return (
    <div className="event-list">
      {events?.map(event => (
        <div key={event.id} className="event-list-item" onClick={() => clickHandler({ ...event })}>
          {formatDate(event.timestamp)}
        </div>
      ))}
    </div>
  );
};

export default Events;
