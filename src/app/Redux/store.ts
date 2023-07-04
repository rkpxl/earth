import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Reducer/counterSclice";
import { userApi } from './Services/userApi';

export const store = configureStore({
  reducer: {
    counterReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, more, more),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
