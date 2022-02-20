import { configureStore } from '@reduxjs/toolkit';
import pageReducer from 'features/page/pageSlice';
import pastedEventsReducer from 'features/pastedEvents/pastedEventsSlice';
export const store = configureStore({
  reducer: {
    page: pageReducer,
    pastedEvents: pastedEventsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
