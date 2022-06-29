
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  token: string;
  refreshToken: string;
}

/**
 * Default state object with initial values.
 */
const initialState: UserState = {
  token: '',
  refreshToken: ''
} as const;

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.token>
    ) => {
      state.token = action.payload;
    },
    setRefreshToken: (
        state: Draft<typeof initialState>,
        action: PayloadAction<typeof initialState.refreshToken>
      ) => {
        state.refreshToken = action.payload;
      },
  },
});

// A small helper of user state for `useSelector` function.
export const getUserState = (state: { user: UserState }) => state.user;

// Exports all actions
export const {setToken,setRefreshToken } = userSlice.actions;

export default userSlice.reducer;
