import { createAction } from "@reduxjs/toolkit";

const fetchBankRequest = createAction("bank/fetchBankRequest");
const fetchBankSuccess = createAction("bank/fetchBankSuccess");
const fetchBankError = createAction("bank/fetchBankError");

const addBankRequest = createAction("bank/addBankRequest");
const addBankSuccess = createAction("bank/addBankSuccess");
const addBankError = createAction("bank/addBankError");

const setMonthlyPayment = createAction("bank/setMonthlyPayment");

const bankAction = {
  setMonthlyPayment,
  fetchBankError,
  fetchBankSuccess,
  fetchBankRequest,
  addBankRequest,
  addBankSuccess,
  addBankError,
};
export default bankAction;
