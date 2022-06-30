
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  token: string;
  refreshToken: string;
  isConnected: boolean;
}

/**
 * Default state object with initial values.
 */
const initialState: UserState = {
  token: '',
  refreshToken: '',
  isConnected: false
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
      state.isConnected = true;
    },
    setRefreshToken: (
        state: Draft<typeof initialState>,
        action: PayloadAction<typeof initialState.refreshToken>
      ) => {
        state.refreshToken = action.payload;
      },
    disconnect: (
        state: Draft<typeof initialState>,
        action: PayloadAction<typeof initialState.token>
      ) => {
        state.refreshToken = "";
        state.token = "";
        state.isConnected= false;
      },
  },
});

// A small helper of user state for `useSelector` function.
export const getUserState = (state: { user: UserState }) => state.user;

// Exports all actions
export const {setToken,setRefreshToken,disconnect } = userSlice.actions;

export default userSlice.reducer;
