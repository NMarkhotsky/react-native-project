import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    publishPost: (state, { payload }) => ({
      ...state,
      payload,
    }),
  },
});

export const { publishPost } = postSlice.actions;
