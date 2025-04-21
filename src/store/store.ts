import { configureStore } from '@reduxjs/toolkit';
import systemReducer from './system/reducerSlice';
import searchReducer from './search/reducerSlice';

const store = configureStore({
  reducer: {
    system: systemReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
