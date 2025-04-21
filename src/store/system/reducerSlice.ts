import { createSlice } from '@reduxjs/toolkit';
import { THEME_MODES } from '../../utils/commons';
import { SystemState } from '../../types/systemState';

const initialState: SystemState = {
  palette: {
    mode: THEME_MODES.LIGHT_MODE,
  },
};

const systemReducer = createSlice({
  name: 'system',
  initialState,
  reducers: {
    updateTheme: (state) => {
      state.palette.mode =
        state.palette.mode === THEME_MODES.LIGHT_MODE
          ? THEME_MODES.DARK_MODE
          : THEME_MODES.LIGHT_MODE;
      localStorage.setItem('APP_THEME', state.palette.mode);
    },
    setTheme: (state, action) => {
      state.palette.mode = action.payload.theme;
    },
  },
});

export const { setTheme, updateTheme } = systemReducer.actions;

export default systemReducer.reducer;
