import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import recipesReducer from "./slices/recipesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
