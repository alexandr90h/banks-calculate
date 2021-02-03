import { configureStore } from "@reduxjs/toolkit";
import bankReduser from "./reduser";

const store = configureStore({
  reducer: bankReduser,
});
export default store;
