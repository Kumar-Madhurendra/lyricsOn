import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './features/playerSlice';
import { shazamCoreApi } from './services/shazamCore'; // adjust path if needed

export const store = configureStore({
  reducer: {
    player: playerReducer,
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer, // ✅ Add this line
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamCoreApi.middleware), // ✅ Add this line
});
