import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    publishPost: (state, { payload }) => payload,
  },
});

export const { publishPost } = postSlice.actions;
