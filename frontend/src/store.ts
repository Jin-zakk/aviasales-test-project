import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user-form/store/slice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type IState = ReturnType<typeof store.getState>;

export type GetState = () => IState;

export type Dispatch = typeof store.dispatch;
