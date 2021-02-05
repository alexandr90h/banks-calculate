import axios from "axios";

axios.defaults.baseURL =
  "https://my-json-server.typicode.com/alexandr90h/calc-mortgage";
export async function fetchBanks() {
  return await axios.get("/banks/");
}
export async function AddBanks(item) {
  return await axios.post("/banks/", item);
}
