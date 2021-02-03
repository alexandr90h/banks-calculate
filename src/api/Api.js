import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";
export async function fetchBanks() {
  return await axios.get("/banks/");
}
export async function AddBanks(item) {
  return await axios.post("/banks/", item);
}
