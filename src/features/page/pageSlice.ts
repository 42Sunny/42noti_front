import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

type PageType = number;

const initialState: PageType = 0;

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    addPage: (state) => {
      return state + 1;
    },
  },
});

export const { addPage } = pageSlice.actions;

export const selectPage = (state: RootState) => state.page;

export default pageSlice.reducer;
