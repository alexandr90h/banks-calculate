import { createAction } from "@reduxjs/toolkit";

const fetchBankRequest = createAction("contacts/fetchBankRequest");
const fetchBankSuccess = createAction("contacts/fetchBankSuccess");
const fetchBankError = createAction("contacts/fetchBankError");

const addBankRequest = createAction("contacts/addBankRequest");
const addBankSuccess = createAction("contacts/addBankSuccess");
const addBankError = createAction("contacts/addBankError");

const contactsAction = {
  fetchBankError,
  fetchBankSuccess,
  fetchBankRequest,
  addBankRequest,
  addBankSuccess,
  addBankError,
};
export default contactsAction;
