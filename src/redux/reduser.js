import { createReducer } from "@reduxjs/toolkit";
import bankAction from "./action";
import { combineReducers } from "redux";

const banks = createReducer([], {
  [bankAction.fetchBankSuccess]: (_, action) => action.payload,
  [bankAction.addBankSuccess]: (state, action) => [...state, action.payload],
});

export default combineReducers({
  banks,
});
