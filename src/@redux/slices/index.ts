import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Event } from "types";
import { RootState } from "@redux";

interface SelectedEventState {
  value: Event | null;
}

const name = "eventSlice";

const initialState = { value: null } as SelectedEventState;

const selectedEventSlice = createSlice({
  name,
  initialState,
  reducers: {
    selectEvent: (state, { payload }: PayloadAction<Event>) => {
      state.value = payload;
    },
  },
});

export const selectedEventSelector = (state: RootState) => state.selectedEvent.value;

export const { selectEvent } = selectedEventSlice.actions;
export default selectedEventSlice.reducer;
