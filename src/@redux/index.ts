import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { eventsApi } from "./queries";
import selectedEventSlice from "./slices";

const store = configureStore({
  reducer: {
    [eventsApi.reducerPath]: eventsApi.reducer,
    selectedEvent: selectedEventSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch = typeof store.dispatch;

export const useTypedDispatch: () => TypedDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
