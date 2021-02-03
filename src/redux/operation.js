import contactsAction from "./action";
import * as API from "../api/Api";

export const addBank = (item) => async (dispatch) => {
  dispatch(contactsAction.addContactsRequuest());
  API.AddBanks(item)
    .then(({ data }) => dispatch(contactsAction.addContactsSuccess(data)))
    .catch((error) => dispatch(contactsAction.addContactsError(error)));
};
