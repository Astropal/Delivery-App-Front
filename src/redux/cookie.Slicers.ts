
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface CookieState {
  isOpen: boolean;
}

/**
 * Default state object with initial values.
 */
const initialState: CookieState = {
  isOpen: true
} as const;

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const cookieSlice = createSlice({
  name: 'cookie',
  initialState,
  reducers: {
    openSetter: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.isOpen>
    ) => {
      state.isOpen = action.payload;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getCookieState = (state: { cookie: CookieState }) => state.cookie;

// Exports all actions
export const {openSetter} = cookieSlice.actions;

export default cookieSlice.reducer;
