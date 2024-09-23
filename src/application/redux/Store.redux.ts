import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slice/Auth.slice';
import threadReducer from './slice/Thread.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    thread: threadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
