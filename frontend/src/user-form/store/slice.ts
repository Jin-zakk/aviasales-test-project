import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  id: number;
  shared: boolean;
  email: string | null;
}

export const initialState: IUserState = {
  id: -1,
  shared: false,
  email: null,
};

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<IUserState>) => {
      const { id, shared, email } = action.payload;
      state.id = id;
      state.shared = shared;
      state.email = email;
    },
    changeId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    changeShared: (state, action: PayloadAction<boolean>) => {
      state.shared = action.payload;
    },
    changeEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const actions = slice.actions;
export default slice;
