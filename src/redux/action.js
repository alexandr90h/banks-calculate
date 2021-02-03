import { createAction } from "@reduxjs/toolkit";

const addBankRequuest = createAction("contacts/addBankRequuest");
const addBankSuccess = createAction("contacts/addBankSuccess");
const addBankError = createAction("contacts/addBankError");

const contactsAction = {
  addBankRequuest,
  addBankSuccess,
  addBankError,
};
export default contactsAction;
