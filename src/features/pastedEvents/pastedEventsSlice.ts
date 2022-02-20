import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getEventsPagination } from 'api/api';
import { RootState } from 'app/store';
import { Event, Events } from 'types/event';

type pastedEvents = Events;

const initialState: pastedEvents = [];

//TODO: status 값에 따른 처리 해야함.
export const fetchPastedEvents = createAsyncThunk(
  'get/fetchPastedEvents',
  async (page: number, thunkApi) => {
    try {
      const response = await getEventsPagination('past', page);
      if (response.status !== 200)
        return thunkApi.rejectWithValue(response.status);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const pastedEventsSlice = createSlice({
  name: 'pastedEvents',
  initialState,
  reducers: {
    getPastedEvents: (state) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchPastedEvents.fulfilled,
      (state: Event[], action: PayloadAction<Event[] | []>) => {
        // Add user to the state array
        const events: Event[] = action.payload;
        state.push(...events);
      },
    );
  },
});

export const { getPastedEvents } = pastedEventsSlice.actions;

export const selectPastedEvents = (state: RootState) => state.pastedEvents;

export default pastedEventsSlice.reducer;
