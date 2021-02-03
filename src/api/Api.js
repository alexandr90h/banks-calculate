import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

export async function AddBanks(item) {
  return await axios.post("/bank/", item);
}
