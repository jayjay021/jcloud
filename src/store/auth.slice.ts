import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { [key: string]: string } = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{ audience: string; token: string }>
    ) => {
      state[action.payload.audience] = action.payload.token;
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
