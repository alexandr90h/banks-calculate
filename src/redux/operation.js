import bankAction from "./action";
import * as API from "../api/Api";

export const fetchBankList = () => async (dispatch) => {
  dispatch(bankAction.fetchBankRequest());
  try {
    const { data } = await API.fetchBanks();
    dispatch(bankAction.fetchBankSuccess(data));
  } catch (error) {
    dispatch(bankAction.fetchBankError(error.message));
  }
};
export const addBank = (item) => async (dispatch) => {
  dispatch(bankAction.addBankRequest());
  API.AddBanks(item)
    .then(({ data }) => dispatch(bankAction.addBankSuccess(data)))
    .catch((error) => dispatch(bankAction.addBankError(error)));
};
