import { createReducer } from "@reduxjs/toolkit";
import bankAction from "./action";
import { combineReducers } from "redux";

const banks = createReducer([], {
  [bankAction.fetchBankSuccess]: (_, action) => action.payload,
  [bankAction.addBankSuccess]: (state, action) => [...state, action.payload],
});
const monthlyPayment = createReducer("", {
  [bankAction.setMonthlyPayment]: (_, action) => action.payload,
});
const tablemonthlyPayment = createReducer([], {
  [bankAction.tablemonthlyPayment]: (_, action) => action.payload,
});
export default combineReducers({
  banks,
  monthlyPayment,
  tablemonthlyPayment,
});
